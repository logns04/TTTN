const STORAGE_KEY = "metik-page";

export function savePage(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function loadPage() {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    return {
      content: [],
      root: {},
    };
  }

  return JSON.parse(data);
}

export function clearPage() {
  localStorage.removeItem(STORAGE_KEY);
}