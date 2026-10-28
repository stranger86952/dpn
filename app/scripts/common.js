// File: app/scripts/common.js

export const SITE_TITLE = "記事帖";
export const TIME_ZONE = "Asia/Tokyo";
export const ID_PATTERN = /^\d{8}-[a-z0-9]+(?:-[a-z0-9]+)*$/;

const datePartsFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE,
  calendar: "gregory",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const displayFormatter = new Intl.DateTimeFormat("ja-JP", {
  timeZone: TIME_ZONE,
  calendar: "gregory",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

export function isDateKey(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const [year, month, day] = value.split("-").map(Number);

  if (year < 1000 || year > 9999) {
    return false;
  }

  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

export function dateKey(datetime) {
  const parts = Object.fromEntries(
    datePartsFormatter
      .formatToParts(new Date(datetime))
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  );

  return `${parts.year}-${parts.month}-${parts.day}`;
}

export function formatDatetime(datetime) {
  return displayFormatter.format(new Date(datetime));
}

export function filterAndSort(
  articles,
  { tags = [], from = "", to = "", sort = "newest" } = {},
) {
  const selected = new Set(tags);

  return articles
    .filter((article) => {
      const tagMatches =
        selected.size === 0 ||
        article.tags.some((tag) => selected.has(tag));

      return (
        tagMatches &&
        (!from || article.dateJst >= from) &&
        (!to || article.dateJst <= to)
      );
    })
    .sort((a, b) => {
      const difference = Date.parse(a.datetime) - Date.parse(b.datetime);

      if (difference !== 0) {
        return sort === "oldest" ? difference : -difference;
      }

      return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
    });
}

async function fetchResponse(path) {
  const response = await fetch(path, {
    cache: "no-store",
    signal: AbortSignal.timeout(15000),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${path}`);
  }

  return response;
}

export async function fetchText(path) {
  return (await fetchResponse(path)).text();
}

export async function loadCatalog() {
  const [indexResponse, tagsResponse] = await Promise.all([
    fetchResponse("./data/index.json"),
    fetchResponse("./data/tags.json"),
  ]);

  const [index, tags] = await Promise.all([
    indexResponse.json(),
    tagsResponse.json(),
  ]);

  if (
    index.schemaVersion !== 1 ||
    index.timeZone !== TIME_ZONE ||
    !Array.isArray(index.articles) ||
    !Array.isArray(tags)
  ) {
    throw new Error("生成データの形式が不正です。");
  }

  return {
    articles: index.articles,
    tags,
    labels: new Map(tags.map((tag) => [tag.id, tag.label])),
  };
}

export function createTagList(ids, labels, { links = false } = {}) {
  const list = document.createElement("ul");
  list.className = "tag-list";

  for (const id of ids) {
    const item = document.createElement("li");
    const text = labels.get(id) ?? id;

    if (links) {
      const anchor = document.createElement("a");
      anchor.href = `./index.html?tag=${encodeURIComponent(id)}`;
      anchor.textContent = text;
      item.append(anchor);
    } else {
      item.textContent = text;
    }

    list.append(item);
  }

  return list;
}

export function createMedia(thumbnail, variant) {
  const container = document.createElement("div");
  container.className = "thumbnail";

  function showPlaceholder() {
    const placeholder = document.createElement("div");
    placeholder.className = "placeholder";
    placeholder.textContent = "画像なし";
    placeholder.setAttribute("aria-hidden", "true");
    container.replaceChildren(placeholder);
  }

  if (!thumbnail) {
    showPlaceholder();
    return container;
  }

  const source = thumbnail[variant];
  const image = document.createElement("img");
  image.alt = thumbnail.alt;
  image.width = source.width;
  image.height = source.height;
  image.loading = variant === "card" ? "lazy" : "eager";
  image.decoding = "async";

  if (variant === "article") {
    image.fetchPriority = "high";
  }

  image.addEventListener("error", showPlaceholder, { once: true });
  image.src = source.src;
  container.append(image);

  return container;
}
