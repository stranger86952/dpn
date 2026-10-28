// File: scripts/serve.mjs

import fs from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../dist/", import.meta.url));
const PREFIX = "/preview/";
const PORT = 4173;

const CONTENT_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
};

try {
  await fs.access(path.join(ROOT, "index.html"));
} catch {
  console.error("先にnpm run buildを実行してください。");
  process.exit(1);
}

const server = http.createServer(async (request, response) => {
  if (!["GET", "HEAD"].includes(request.method)) {
    response.writeHead(405, { Allow: "GET, HEAD" });
    response.end();
    return;
  }

  try {
    const url = new URL(request.url, "http://localhost");

    if (url.pathname === "/" || url.pathname === "/preview") {
      response.writeHead(302, { Location: PREFIX });
      response.end();
      return;
    }

    if (!url.pathname.startsWith(PREFIX)) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    const relativePath =
      decodeURIComponent(url.pathname.slice(PREFIX.length)) || "index.html";

    const filename = path.resolve(ROOT, relativePath);
    const relative = path.relative(ROOT, filename);

    if (
      relative.startsWith(`..${path.sep}`) ||
      relative === ".." ||
      path.isAbsolute(relative)
    ) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }

    const body = await fs.readFile(filename);

    response.writeHead(200, {
      "Content-Type":
        CONTENT_TYPES[path.extname(filename)] ?? "application/octet-stream",
      "Content-Length": body.length,
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    });

    response.end(request.method === "HEAD" ? undefined : body);
  } catch {
    response.writeHead(404);
    response.end("Not found");
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`プレビュー: http://127.0.0.1:${PORT}${PREFIX}`);
});
