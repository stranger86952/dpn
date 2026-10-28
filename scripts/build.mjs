// File: scripts/build.mjs

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";
import sharp from "sharp";

import { TIME_ZONE } from "../app/scripts/common.js";
import { loadContent } from "./content.mjs";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const DIST = path.join(ROOT, "dist");
const INPUT_PIXEL_LIMIT = 40_000_000;

async function writeJSON(filename, value) {
  await fs.writeFile(
    filename,
    `${JSON.stringify(value, null, 2)}\n`,
    "utf8",
  );
}

async function createThumbnail(article, variant, stage) {
  const isCard = variant === "card";
  const relativePath = `assets/thumbnails/${variant}/${article.id}.webp`;
  const destination = path.join(stage, relativePath);

  const result = await sharp(article.thumbnailSource, {
    animated: false,
    limitInputPixels: INPUT_PIXEL_LIMIT,
    failOn: "warning",
  })
    .rotate()
    .resize({
      width: isCard ? 640 : 1600,
      height: isCard ? 360 : 1200,
      fit: isCard ? "cover" : "inside",
      position: "centre",
      withoutEnlargement: true,
    })
    .webp({
      quality: isCard ? 80 : 86,
      effort: 4,
    })
    .toFile(destination);

  return {
    src: `./${relativePath}`,
    width: result.width,
    height: result.height,
  };
}

async function copyLicenses(stage) {
  const destination = path.join(stage, "assets/licenses");
  await fs.mkdir(destination, { recursive: true });

  for (const name of [
    "marked",
    "marked-katex-extension",
    "dompurify",
    "katex",
  ]) {
    const packageDirectory = path.join(ROOT, "node_modules", name);
    const files = await fs.readdir(packageDirectory);
    const licenses = files.filter((filename) =>
      /^license(?:\.[a-z]+)?$/i.test(filename),
    );

    if (licenses.length === 0) {
      throw new Error(`${name}のライセンスファイルが見つかりません。`);
    }

    for (const filename of licenses) {
      await fs.copyFile(
        path.join(packageDirectory, filename),
        path.join(destination, `${name}-${filename}`),
      );
    }
  }
}

async function main() {
  const { tags, articles } = await loadContent(ROOT);
  const stage = await fs.mkdtemp(path.join(ROOT, ".build-"));

  try {
    for (const directory of [
      "data/articles",
      "assets/thumbnails/card",
      "assets/thumbnails/article",
      "assets/vendor/katex",
    ]) {
      await fs.mkdir(path.join(stage, directory), { recursive: true });
    }

    for (const filename of ["index.html", "article.html"]) {
      await fs.copyFile(
        path.join(ROOT, filename),
        path.join(stage, filename),
      );
    }

    await fs.cp(
      path.join(ROOT, "app/styles"),
      path.join(stage, "app/styles"),
      { recursive: true },
    );

    await build({
      absWorkingDir: ROOT,
      entryPoints: [
        "app/scripts/index.js",
        "app/scripts/article.js",
        "app/scripts/markdown.js",
      ],
      outdir: path.join(stage, "app/scripts"),
      entryNames: "[name]",
      chunkNames: "chunks/[name]-[hash]",
      bundle: true,
      splitting: true,
      format: "esm",
      platform: "browser",
      target: "es2022",
      minify: false,
      sourcemap: false,
      legalComments: "eof",
      logLevel: "info",
    });

    const katexDirectory = path.join(ROOT, "node_modules/katex/dist");

    await fs.copyFile(
      path.join(katexDirectory, "katex.css"),
      path.join(stage, "assets/vendor/katex/katex.css"),
    );

    await fs.cp(
      path.join(katexDirectory, "fonts"),
      path.join(stage, "assets/vendor/katex/fonts"),
      { recursive: true },
    );

    await copyLicenses(stage);

    const index = [];

    for (const article of articles) {
      let thumbnail = null;

      if (article.thumbnailSource) {
        thumbnail = {
          alt: article.thumbnailAlt,
          card: await createThumbnail(article, "card", stage),
          article: await createThumbnail(article, "article", stage),
        };
      }

      await fs.writeFile(
        path.join(stage, "data/articles", `${article.id}.md`),
        article.body,
        "utf8",
      );

      index.push({
        id: article.id,
        title: article.title,
        datetime: article.datetime,
        dateJst: article.dateJst,
        tags: article.tags,
        thumbnail,
      });
    }

    await writeJSON(path.join(stage, "data/tags.json"), tags);

    await writeJSON(path.join(stage, "data/index.json"), {
      schemaVersion: 1,
      timeZone: TIME_ZONE,
      articles: index,
    });

    await fs.writeFile(path.join(stage, ".nojekyll"), "");

    await fs.rm(DIST, { recursive: true, force: true });
    await fs.rename(stage, DIST);

    console.log(`ビルド完了: ${index.length}記事 → dist`);
  } finally {
    await fs.rm(stage, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(`ビルド失敗: ${error.message}`);
  process.exitCode = 1;
});
