// File: app/scripts/index.js

import {
  createMedia,
  createTagList,
  filterAndSort,
  formatDatetime,
  isDateKey,
  loadCatalog,
} from "./common.js";

const BATCH_SIZE = 18;

const form = document.querySelector("#filters");
const fields = document.querySelector("#filter-fields");
const tagOptions = document.querySelector("#tag-options");
const fromInput = document.querySelector("#date-from");
const toInput = document.querySelector("#date-to");
const sortInput = document.querySelector("#sort-order");
const errorMessage = document.querySelector("#filter-error");
const count = document.querySelector("#result-count");
const list = document.querySelector("#article-list");
const moreButton = document.querySelector("#load-more");
const retryButton = document.querySelector("#retry");

let articles = [];
let labels = new Map();
let filtered = [];
let shown = 0;
let generation = 0;
let busy = false;

function selectedTags() {
  return Array.from(
    tagOptions.querySelectorAll("input:checked"),
    (input) => input.value,
  );
}

function writeURL() {
  const query = new URLSearchParams();

  for (const tag of selectedTags()) {
    query.append("tag", tag);
  }

  if (fromInput.value) {
    query.set("from", fromInput.value);
  }

  if (toInput.value) {
    query.set("to", toInput.value);
  }

  if (sortInput.value === "oldest") {
    query.set("sort", "oldest");
  }

  const url = new URL(window.location.href);
  url.search = query.toString();
  window.history.replaceState(null, "", url);
}

function readURL() {
  const query = new URLSearchParams(window.location.search);
  const requestedTags = new Set(query.getAll("tag"));

  for (const input of tagOptions.querySelectorAll("input")) {
    input.checked = requestedTags.has(input.value);
  }

  const from = query.get("from") ?? "";
  const to = query.get("to") ?? "";

  fromInput.value = isDateKey(from) ? from : "";
  toInput.value = isDateKey(to) ? to : "";
  sortInput.value = query.get("sort") === "oldest" ? "oldest" : "newest";
}

function createCard(article) {
  const item = document.createElement("li");
  const card = document.createElement("article");
  const anchor = document.createElement("a");
  const title = document.createElement("h2");
  const time = document.createElement("time");

  card.className = "card";
  anchor.className = "card-link";
  anchor.href = `./article.html?id=${encodeURIComponent(article.id)}`;

  title.id = `title-${article.id}`;
  title.textContent = article.title;
  anchor.setAttribute("aria-labelledby", title.id);
  anchor.append(createMedia(article.thumbnail, "card"), title);

  time.dateTime = article.datetime;
  time.textContent = formatDatetime(article.datetime);

  card.append(anchor, time, createTagList(article.tags, labels));
  item.append(card);

  return item;
}

function appendBatch({ focusNewItem = false } = {}) {
  if (busy || shown >= filtered.length) {
    return;
  }

  busy = true;
  moreButton.disabled = true;
  list.setAttribute("aria-busy", "true");

  const ticket = generation;

  requestAnimationFrame(() => {
    if (ticket !== generation) {
      return;
    }

    const fragment = document.createDocumentFragment();
    const end = Math.min(shown + BATCH_SIZE, filtered.length);
    let firstNewLink = null;

    for (let index = shown; index < end; index += 1) {
      const card = createCard(filtered[index]);

      if (!firstNewLink) {
        firstNewLink = card.querySelector("a");
      }

      fragment.append(card);
    }

    list.append(fragment);
    shown = end;
    busy = false;
    moreButton.disabled = false;
    moreButton.hidden = shown >= filtered.length;
    list.setAttribute("aria-busy", "false");

    count.textContent = `${filtered.length}件中 ${shown}件を表示`;

    if (focusNewItem && firstNewLink) {
      firstNewLink.focus({ preventScroll: true });
    }
  });
}

function applyFilters({ updateURL = true } = {}) {
  generation += 1;
  busy = false;
  shown = 0;
  filtered = [];
  list.replaceChildren();
  list.setAttribute("aria-busy", "false");
  moreButton.hidden = true;
  moreButton.disabled = false;

  const invalidDate = !fromInput.validity.valid || !toInput.validity.valid;
  const reversed =
    fromInput.value &&
    toInput.value &&
    fromInput.value > toInput.value;

  errorMessage.hidden = !invalidDate && !reversed;
  errorMessage.textContent = invalidDate
    ? "日付を正しく入力してください。"
    : reversed
      ? "開始日は終了日以前にしてください。"
      : "";

  fromInput.setAttribute("aria-invalid", String(Boolean(invalidDate || reversed)));
  toInput.setAttribute("aria-invalid", String(Boolean(invalidDate || reversed)));

  if (invalidDate || reversed) {
    count.textContent = "表示条件を確認してください。";
    return;
  }

  filtered = filterAndSort(articles, {
    tags: selectedTags(),
    from: fromInput.value,
    to: toInput.value,
    sort: sortInput.value,
  });

  if (updateURL) {
    writeURL();
  }

  if (filtered.length === 0) {
    count.textContent =
      articles.length === 0
        ? "まだ記事がありません。"
        : "条件に一致する記事はありません。";
    return;
  }

  count.textContent = `${filtered.length}件の記事`;
  appendBatch();
}

function createTagOptions(tags) {
  const fragment = document.createDocumentFragment();

  for (const tag of tags) {
    const label = document.createElement("label");
    const input = document.createElement("input");
    const text = document.createElement("span");

    label.className = "tag-option";
    input.type = "checkbox";
    input.name = "tag";
    input.value = tag.id;
    text.textContent = tag.label;

    label.append(input, text);
    fragment.append(label);
  }

  tagOptions.replaceChildren(fragment);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
});

form.addEventListener("change", () => {
  applyFilters();
});

form.addEventListener("reset", (event) => {
  event.preventDefault();

  for (const input of tagOptions.querySelectorAll("input")) {
    input.checked = false;
  }

  fromInput.value = "";
  toInput.value = "";
  sortInput.value = "newest";
  applyFilters();
});

moreButton.addEventListener("click", () => {
  appendBatch({ focusNewItem: true });
});

retryButton.addEventListener("click", () => {
  window.location.reload();
});

window.addEventListener("popstate", () => {
  if (!fields.disabled) {
    readURL();
    applyFilters({ updateURL: false });
  }
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        appendBatch();
      }
    },
    { rootMargin: "240px 0px" },
  );

  observer.observe(moreButton);
}

try {
  const catalog = await loadCatalog();
  articles = catalog.articles;
  labels = catalog.labels;

  createTagOptions(catalog.tags);
  readURL();
  fields.disabled = false;
  applyFilters();
} catch (error) {
  console.error(error);
  list.setAttribute("aria-busy", "false");
  count.textContent = "記事を読み込めませんでした。接続状況を確認してください。";
  retryButton.hidden = false;
}
