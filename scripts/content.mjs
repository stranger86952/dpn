// File: scripts/content.mjs

import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { parseDocument } from "yaml";

import {
  ID_PATTERN,
  dateKey,
  filterAndSort,
  isDateKey,
} from "../app/scripts/common.js";

const ARTICLE_LIMIT = 1024 * 1024;
const IMAGE_LIMIT = 20 * 1024 * 1024;

const IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".avif",
  ".gif",
  ".tif",
  ".tiff",
]);

async function readJSON(filename) {
  return JSON.parse(await fs.readFile(filename, "utf8"));
}

async function listFiles(directory, { optional = false } = {}) {
  let entries;

  try {
    entries = await fs.readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (optional && error.code === "ENOENT") {
      return [];
    }

    throw error;
  }

  const files = [];

  for (const entry of entries) {
    if ([".gitkeep", ".DS_Store"].includes(entry.name)) {
      continue;
    }

    if (!entry.isFile()) {
      throw new Error(
        `${directory}/${entry.name}: サブディレクトリやシンボリックリンクは使えません。`,
      );
    }

    files.push(entry.name);
  }

  return files.sort();
}

function validateTags(input) {
  if (!Array.isArray(input)) {
    throw new Error("data/tags.jsonは配列で指定してください。");
  }

  const ids = new Set();

  const tags = input.map((tag) => {
    if (
      !tag ||
      typeof tag !== "object" ||
      Array.isArray(tag) ||
      Object.keys(tag).some((key) => !["id", "label"].includes(key)) ||
      typeof tag.id !== "string" ||
      !/^[a-z][a-z0-9-]*$/.test(tag.id) ||
      tag.id.length > 40 ||
      typeof tag.label !== "string" ||
      !tag.label.trim() ||
      tag.label.trim().length > 80
    ) {
      throw new Error("data/tags.jsonに不正なタグ定義があります。");
    }

    if (ids.has(tag.id)) {
      throw new Error(`タグIDが重複しています: ${tag.id}`);
    }

    ids.add(tag.id);

    return {
      id: tag.id,
      label: tag.label.trim(),
    };
  });

  if (!ids.has("others")) {
    throw new Error("data/tags.jsonにはothersが必要です。");
  }

  return tags;
}

function parseArticle(source, filename, validate, ajv) {
  const normalized = source
    .replace(/^\uFEFF/, "")
    .replace(/\r\n?/g, "\n");

  const match = normalized.match(
    /^---[ \t]*\n([\s\S]*?)\n---[ \t]*(?:\n|$)([\s\S]*)$/,
  );

  if (!match) {
    throw new Error(`${filename}: YAML Front Matterが必要です。`);
  }

  const document = parseDocument(match[1], {
    version: "1.2",
    schema: "core",
    strict: true,
    uniqueKeys: true,
  });

  if (document.errors.length || document.warnings.length) {
    const messages = [...document.errors, ...document.warnings]
      .map((error) => error.message)
      .join("; ");

    throw new Error(`${filename}: YAMLエラー: ${messages}`);
  }

  let metadata;

  try {
    metadata = document.toJS({ maxAliasCount: 0 });
  } catch (error) {
    throw new Error(`${filename}: YAMLエイリアスは使えません。`, {
      cause: error,
    });
  }

  if (!validate(metadata)) {
    throw new Error(
      `${filename}: Front Matterエラー: ${ajv.errorsText(validate.errors)}`,
    );
  }

  const body = match[2].trim();

  if (!body) {
    throw new Error(`${filename}: 本文が空です。`);
  }

  if (!Number.isFinite(Date.parse(metadata.datetime))) {
    throw new Error(`${filename}: datetimeを解釈できません。`);
  }

  return {
    metadata,
    body: `${body}\n`,
  };
}

export async function loadContent(root) {
  const tags = validateTags(
    await readJSON(path.join(root, "data/tags.json")),
  );

  const allowedTags = new Set(tags.map((tag) => tag.id));
  const schema = await readJSON(
    path.join(root, "schemas/article.schema.json"),
  );

  const ajv = new Ajv({
    allErrors: true,
    strict: true,
  });

  addFormats(ajv, { mode: "full" });
  const validate = ajv.compile(schema);

  const articleDirectory = path.join(root, "data/articles");
  const thumbnailDirectory = path.join(root, "data/thumbnails");

  const thumbnailFiles = await listFiles(thumbnailDirectory, {
    optional: true,
  });

  const thumbnails = new Map();

  for (const filename of thumbnailFiles) {
    const extension = path.extname(filename);
    const id = filename.slice(0, -extension.length);

    if (
      !IMAGE_EXTENSIONS.has(extension.toLowerCase()) ||
      !ID_PATTERN.test(id) ||
      id.length > 120
    ) {
      throw new Error(`不正なサムネイルファイル名です: ${filename}`);
    }

    if (thumbnails.has(id)) {
      throw new Error(`サムネイルが重複しています: ${id}`);
    }

    const absolutePath = path.join(thumbnailDirectory, filename);
    const stat = await fs.stat(absolutePath);

    if (stat.size > IMAGE_LIMIT) {
      throw new Error(`${filename}: 画像が20 MiBを超えています。`);
    }

    thumbnails.set(id, absolutePath);
  }

  const seenIds = new Set();
  const seenSlugs = new Map();
  const seenBodies = new Map();
  const articles = [];

  for (const filename of await listFiles(articleDirectory)) {
    if (!filename.endsWith(".md")) {
      throw new Error(`記事には小文字の.md拡張子を使ってください: ${filename}`);
    }

    const id = filename.slice(0, -3);

    if (!ID_PATTERN.test(id) || id.length > 120) {
      throw new Error(`不正な記事ファイル名です: ${filename}`);
    }

    const fileDate = `${id.slice(0, 4)}-${id.slice(4, 6)}-${id.slice(6, 8)}`;

    if (!isDateKey(fileDate)) {
      throw new Error(`${filename}: ファイル名の日付が不正です。`);
    }

    if (seenIds.has(id.toLowerCase())) {
      throw new Error(`記事IDが重複しています: ${id}`);
    }

    seenIds.add(id.toLowerCase());

    const slug = id.slice(9);

    if (seenSlugs.has(slug)) {
      throw new Error(
        `slugが重複しています: ${id} / ${seenSlugs.get(slug)}`,
      );
    }

    seenSlugs.set(slug, id);

    const absolutePath = path.join(articleDirectory, filename);
    const stat = await fs.stat(absolutePath);

    if (stat.size > ARTICLE_LIMIT) {
      throw new Error(`${filename}: 記事が1 MiBを超えています。`);
    }

    const { metadata, body } = parseArticle(
      await fs.readFile(absolutePath, "utf8"),
      filename,
      validate,
      ajv,
    );

    const articleDate = dateKey(metadata.datetime);

    if (articleDate !== fileDate) {
      throw new Error(
        `${filename}: ファイル名の日付とdatetimeの日本時間の日付が一致しません。`,
      );
    }

    const articleTags =
      Array.isArray(metadata.tags) && metadata.tags.length > 0
        ? metadata.tags
        : ["others"];

    for (const tag of articleTags) {
      if (!allowedTags.has(tag)) {
        throw new Error(`${filename}: 未定義のタグです: ${tag}`);
      }
    }

    const bodyHash = createHash("sha256")
      .update(body.trim().normalize("NFC"))
      .digest("hex");

    if (seenBodies.has(bodyHash)) {
      throw new Error(
        `本文が重複しています: ${id} / ${seenBodies.get(bodyHash)}`,
      );
    }

    seenBodies.set(bodyHash, id);

    const title = metadata.title.trim();

    articles.push({
      id,
      title,
      datetime: metadata.datetime,
      dateJst: articleDate,
      tags: articleTags,
      thumbnailAlt: metadata.thumbnailAlt?.trim() || title,
      thumbnailSource: thumbnails.get(id) ?? null,
      body,
    });
  }

  for (const id of thumbnails.keys()) {
    if (!seenIds.has(id)) {
      throw new Error(`対応する記事のないサムネイルです: ${id}`);
    }
  }

  return {
    tags,
    articles: filterAndSort(articles),
  };
}
