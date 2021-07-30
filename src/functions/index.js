export function getSearchHistory() {
  const searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
  return searchHistory;
}

export function removeSearchHistory() {
  localStorage.removeItem("searchHistory");
}

export function getQuery() {
  const query = localStorage.getItem("query");
  if (query) {
    return query;
  } else {
    return "";
  }
}

export function addQuery(queryString) {
  localStorage.setItem("query", queryString);
}

export function removeQuery() {
  localStorage.removeItem("query");
}
