// File: tests/site.test.mjs

import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { JSDOM } from "jsdom";

import {
  dateKey,
  filterAndSort,
  isDateKey,
} from "../app/scripts/common.js";

import { renderMarkdown } from "../app/scripts/markdown.js";
import { loadContent } from "../scripts/content.mjs";

const ROOT = fileURLToPath(new URL("../", import.meta.url));

const TEST_TAGS = [
  { id: "math", label: "数学" },
  { id: "tech", label: "情報" },
  { id: "news", label: "ニュース" },
  { id: "others", label: "その他" },
];

async function fixture(context) {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "quiet-notes-"));

  context.after(async () => {
    await fs.rm(root, { recursive: true, force: true });
  });

  for (const directory of [
    "data/articles",
    "data/thumbnails",
    "schemas",
  ]) {
    await fs.mkdir(path.join(root, directory), { recursive: true });
  }

  await fs.writeFile(
    path.join(root, "data/tags.json"),
    JSON.stringify(TEST_TAGS),
  );

  await fs.copyFile(
    path.join(ROOT, "schemas/article.schema.json"),
    path.join(root, "schemas/article.schema.json"),
  );

  return root;
}

async function writeArticle(
  root,
  id,
  {
    title = "テスト記事",
    datetime,
    tags = null,
    alt = null,
    body = `本文: ${id}`,
  } = {},
) {
  const date = `${id.slice(0, 4)}-${id.slice(4, 6)}-${id.slice(6, 8)}`;
  const timestamp = datetime ?? `${date}T12:00:00+09:00`;

  const source = [
    "---",
    `title: ${JSON.stringify(title)}`,
    `datetime: ${JSON.stringify(timestamp)}`,
    `tags: ${JSON.stringify(tags)}`,
    `thumbnailAlt: ${JSON.stringify(alt)}`,
    "---",
    body,
    "",
  ].join("\n");

  await fs.writeFile(
    path.join(root, "data/articles", `${id}.md`),
    source,
  );
}

test("空のタグとAltを正規化する", async (context) => {
  const root = await fixture(context);

  await writeArticle(root, "20261028-example", {
    title: "画像の説明になるタイトル",
    tags: [],
    alt: "   ",
  });

  await fs.writeFile(
    path.join(root, "data/thumbnails/20261028-example.png"),
    "metadata-validation-fixture",
  );

  const { articles } = await loadContent(root);

  assert.deepEqual(articles[0].tags, ["others"]);
  assert.equal(articles[0].thumbnailAlt, "画像の説明になるタイトル");
  assert.ok(articles[0].thumbnailSource.endsWith(".png"));
});

test("未定義タグを拒否する", async (context) => {
  const root = await fixture(context);

  await writeArticle(root, "20261028-example", {
    tags: ["technology"],
  });

  await assert.rejects(loadContent(root), /未定義のタグ/);
});

test("タグレジストリの編集だけでタグを追加できる", async (context) => {
  const root = await fixture(context);

  await fs.writeFile(
    path.join(root, "data/tags.json"),
    JSON.stringify([
      ...TEST_TAGS,
      { id: "science", label: "科学" },
    ]),
  );

  await writeArticle(root, "20261028-example", {
    tags: ["science"],
  });

  const { articles } = await loadContent(root);
  assert.deepEqual(articles[0].tags, ["science"]);
});

test("異なる日付でも同じslugを拒否する", async (context) => {
  const root = await fixture(context);

  await writeArticle(root, "20261027-example");
  await writeArticle(root, "20261028-example");

  await assert.rejects(loadContent(root), /slugが重複/);
});

test("異なるIDでも同じ本文を拒否する", async (context) => {
  const root = await fixture(context);

  await writeArticle(root, "20261028-first", { body: "同じ本文" });
  await writeArticle(root, "20261028-second", { body: "同じ本文" });

  await assert.rejects(loadContent(root), /本文が重複/);
});

test("複数拡張子のサムネイルを拒否する", async (context) => {
  const root = await fixture(context);

  await writeArticle(root, "20261028-example");

  for (const extension of ["png", "jpg"]) {
    await fs.writeFile(
      path.join(root, `data/thumbnails/20261028-example.${extension}`),
      "fixture",
    );
  }

  await assert.rejects(loadContent(root), /サムネイルが重複/);
});

test("対応する記事のない画像を拒否する", async (context) => {
  const root = await fixture(context);

  await fs.writeFile(
    path.join(root, "data/thumbnails/20261028-orphan.png"),
    "fixture",
  );

  await assert.rejects(loadContent(root), /対応する記事のない/);
});

test("ファイル名と日本時間の日付が一致することを確認する", async (context) => {
  const root = await fixture(context);

  await writeArticle(root, "20261028-example", {
    datetime: "2026-10-28T23:00:00Z",
  });

  await assert.rejects(loadContent(root), /日付が一致しません/);
});

test("実在しない日付を拒否する", async (context) => {
  const root = await fixture(context);

  await writeArticle(root, "20260230-example");
  await assert.rejects(loadContent(root), /日付が不正/);
});

test("YAMLの重複キーを拒否する", async (context) => {
  const root = await fixture(context);

  await fs.writeFile(
    path.join(root, "data/articles/20261028-example.md"),
    [
      "---",
      "title: A",
      "title: B",
      'datetime: "2026-10-28T12:00:00+09:00"',
      "---",
      "本文",
    ].join("\n"),
  );

  await assert.rejects(loadContent(root), /YAMLエラー/);
});

test("未定義のFront Matterプロパティを拒否する", async (context) => {
  const root = await fixture(context);

  await writeArticle(root, "20261028-example");

  const filename = path.join(
    root,
    "data/articles/20261028-example.md",
  );

  const source = await fs.readFile(filename, "utf8");

  await fs.writeFile(
    filename,
    source.replace("---\n", "---\ndraft: true\n"),
  );

  await assert.rejects(loadContent(root), /Front Matterエラー/);
});

test("日本時間の日付とカレンダーの妥当性を扱う", () => {
  assert.equal(dateKey("2026-10-28T15:00:00Z"), "2026-10-29");
  assert.equal(dateKey("2026-10-28T14:59:59Z"), "2026-10-28");
  assert.equal(isDateKey("2024-02-29"), true);
  assert.equal(isDateKey("2026-02-29"), false);
  assert.equal(isDateKey("2026-13-01"), false);
});

test("タグはOR、日付範囲は両端を含む", () => {
  const articles = [
    {
      id: "20261029-first",
      datetime: "2026-10-28T16:00:00Z",
      dateJst: "2026-10-29",
      tags: ["math"],
    },
    {
      id: "20261028-second",
      datetime: "2026-10-28T12:00:00+09:00",
      dateJst: "2026-10-28",
      tags: ["tech"],
    },
    {
      id: "20261028-third",
      datetime: "2026-10-28T08:00:00+09:00",
      dateJst: "2026-10-28",
      tags: ["news"],
    },
  ];

  assert.deepEqual(
    filterAndSort(articles, {
      tags: ["math", "tech"],
    }).map((article) => article.id),
    ["20261029-first", "20261028-second"],
  );

  assert.deepEqual(
    filterAndSort(articles, {
      tags: ["math", "tech"],
      from: "2026-10-28",
      to: "2026-10-28",
    }).map((article) => article.id),
    ["20261028-second"],
  );

  assert.equal(
    filterAndSort(articles, { sort: "oldest" })[0].id,
    "20261028-third",
  );
});

test("同一時刻の並び順をIDで固定する", () => {
  const base = {
    datetime: "2026-10-28T12:00:00+09:00",
    dateJst: "2026-10-28",
    tags: ["others"],
  };

  const articles = [
    { ...base, id: "20261028-b" },
    { ...base, id: "20261028-a" },
  ];

  for (const sort of ["newest", "oldest"]) {
    assert.equal(
      filterAndSort(articles, { sort })[0].id,
      "20261028-a",
    );
  }
});

test("Markdownをサニタイズし、数式とコードを区別する", () => {
  const dom = new JSDOM("<!doctype html><html><body></body></html>", {
    url: "https://example.test/repository/article.html",
  });

  try {
    const source = [
      "安全な**強調**。",
      "",
      "<script>window.pwned = true;</script>",
      "",
      '<img src="x" onerror="window.pwned = true">',
      "",
      "[危険なリンク](javascript:alert%281%29)",
      "",
      "![data画像](data:text/html,not-an-image)",
      "",
      "$x^2 + y^2$",
      "",
      "$$",
      String.raw`\sqrt{x}`,
      "$$",
      "",
      "    $code$",
      "",
      "[外部リンク](https://other.example/page)",
    ].join("\n");

    const fragment = renderMarkdown(source, dom.window.document);

    assert.equal(fragment.querySelectorAll("script").length, 0);
    assert.equal(fragment.querySelectorAll("[onerror]").length, 0);
    assert.equal(
      fragment.querySelectorAll('a[href^="javascript:"]').length,
      0,
    );
    assert.equal(
      fragment.querySelectorAll('img[src^="data:"]').length,
      0,
    );

    assert.equal(fragment.querySelector("strong").textContent, "強調");
    assert.equal(fragment.querySelectorAll(".katex").length, 2);
    assert.ok(fragment.querySelector(".katex math"));
    assert.ok(fragment.querySelector(".katex svg"));
    assert.equal(fragment.querySelector("pre code").textContent.trim(), "$code$");

    const external = fragment.querySelector(
      'a[href="https://other.example/page"]',
    );

    assert.equal(external.target, "_blank");
    assert.equal(external.rel, "noopener noreferrer");
  } finally {
    dom.window.close();
  }
});
