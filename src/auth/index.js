export function getHistory() {
  const history = JSON.parse(localStorage.getItem("history"));
  return history;
}

export function removeHistory() {
  localStorage.removeItem("history");
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
