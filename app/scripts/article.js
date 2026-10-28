// File: app/scripts/article.js

import {
  ID_PATTERN,
  SITE_TITLE,
  createMedia,
  createTagList,
  fetchText,
  formatDatetime,
  loadCatalog,
} from "./common.js";
import { renderMarkdown } from "./markdown.js";

const articleElement = document.querySelector("#article");
const status = document.querySelector("#article-status");
const errorPanel = document.querySelector("#article-error");
const retryButton = document.querySelector("#retry");

function showError(title, message, { retry = false } = {}) {
  status.hidden = true;
  articleElement.hidden = true;
  errorPanel.hidden = false;
  retryButton.hidden = !retry;

  document.querySelector("#error-title").textContent = title;
  document.querySelector("#error-message").textContent = message;
  document.title = `${title} | ${SITE_TITLE}`;
}

retryButton.addEventListener("click", () => {
  window.location.reload();
});

async function main() {
  const query = new URLSearchParams(window.location.search);
  const ids = query.getAll("id");
  const id = ids[0] ?? "";

  if (ids.length !== 1 || id.length > 120 || !ID_PATTERN.test(id)) {
    showError(
      "記事IDが不正です",
      "記事一覧から、読みたい記事を選択してください。",
    );
    return;
  }

  try {
    const { articles, labels } = await loadCatalog();
    const article = articles.find((item) => item.id === id);

    if (!article) {
      showError(
        "記事が見つかりません",
        "記事が削除されたか、URLが変更された可能性があります。",
      );
      return;
    }

    const markdown = await fetchText(
      `./data/articles/${encodeURIComponent(article.id)}.md`,
    );

    const rendered = renderMarkdown(markdown);
    const time = document.querySelector("#article-date");

    document.title = `${article.title} | ${SITE_TITLE}`;
    document.querySelector("#article-title").textContent = article.title;

    time.dateTime = article.datetime;
    time.textContent = formatDatetime(article.datetime);

    document.querySelector("#article-tags").replaceChildren(
      createTagList(article.tags, labels, { links: true }),
    );

    document.querySelector("#article-hero").replaceChildren(
      createMedia(article.thumbnail, "article"),
    );

    document.querySelector("#article-body").replaceChildren(rendered);

    status.hidden = true;
    articleElement.hidden = false;
  } catch (error) {
    console.error(error);

    showError(
      "記事を読み込めませんでした",
      "接続状況を確認してから、再読み込みしてください。",
      { retry: true },
    );
  }
}

await main();
