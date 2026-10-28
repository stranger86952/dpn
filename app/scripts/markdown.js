// File: app/scripts/markdown.js

import createDOMPurify from "dompurify";
import { Marked } from "marked";
import markedKatex from "marked-katex-extension";

const parser = new Marked();

parser.use({
  gfm: true,
  breaks: false,
  async: false,
  renderer: {
    html() {
      return "";
    },
  },
});

parser.use(
  markedKatex({
    nonStandard: true,
    throwOnError: false,
    trust: false,
    strict: "warn",
    maxExpand: 1000,
    maxSize: 20,
    output: "htmlAndMathml",
  }),
);

export function renderMarkdown(source, ownerDocument = document) {
  const purifier = createDOMPurify(ownerDocument.defaultView);
  const fragment = purifier.sanitize(parser.parse(source), {
    RETURN_DOM_FRAGMENT: true,
    USE_PROFILES: {
      html: true,
      svg: true,
      mathMl: true,
    },
    ALLOW_DATA_ATTR: false,
    FORBID_TAGS: [
      "script",
      "style",
      "iframe",
      "object",
      "embed",
      "form",
      "input",
      "button",
      "textarea",
      "select",
      "base",
      "link",
      "meta",
      "foreignObject",
    ],
    FORBID_ATTR: [
      "id",
      "name",
      "srcset",
    ],
  });

  const baseURL = new URL(ownerDocument.baseURI);

  for (const anchor of fragment.querySelectorAll("a[href]")) {
    try {
      const url = new URL(anchor.getAttribute("href"), baseURL);

      if (!["https:", "http:", "mailto:"].includes(url.protocol)) {
        anchor.removeAttribute("href");
        continue;
      }

      if (
        ["https:", "http:"].includes(url.protocol) &&
        url.origin !== baseURL.origin
      ) {
        anchor.target = "_blank";
        anchor.rel = "noopener noreferrer";
      } else {
        anchor.removeAttribute("target");
      }
    } catch {
      anchor.removeAttribute("href");
    }
  }

  for (const image of fragment.querySelectorAll("img")) {
    try {
      const sourceURL = image.getAttribute("src");

      if (!sourceURL) {
        image.remove();
        continue;
      }

      const url = new URL(sourceURL, baseURL);
      const sameOriginHTTP =
        url.origin === baseURL.origin &&
        ["http:", "https:"].includes(url.protocol);

      if (url.protocol !== "https:" && !sameOriginHTTP) {
        image.remove();
        continue;
      }

      image.loading = "lazy";
      image.decoding = "async";
      image.referrerPolicy = "no-referrer";
    } catch {
      image.remove();
    }
  }

  return fragment;
}
