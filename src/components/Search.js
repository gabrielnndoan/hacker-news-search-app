import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { addQuery, getQuery, removeQuery } from "../auth";

const Search = () => {
  const [queryString, setQueryString] = useState("");
  const [search, setSearch] = useState([]);
  let history = useHistory();
  const redirect = () => {
    history.push(`/search?query=${getQuery()}`);
  };

  const fetchQuery = () => {
    if (getQuery()) {
      fetch(`http://hn.algolia.com/api/v1/search?query=${getQuery()}`)
        .then((response) => response.json())
        .then((results) => {
          setSearch(results.hits);
          redirect();
          removeQuery();
        })
        .catch(console.error);
    } else {
      fetch(`http://hn.algolia.com/api/v1/search?query=${queryString}`)
        .then((response) => response.json())
        .then((results) => {
          setSearch(results.hits);
          redirect();
        })
        .catch(console.error);
    }
  };

  useEffect(() => {
    fetchQuery();
    setQueryString("");
  }, []);

  function addHistory(queryString) {
    let history = [];
    if (localStorage.getItem("history")) {
      history = JSON.parse(localStorage.getItem("history"));
    }
    history.push({ history: queryString });
    localStorage.setItem("history", JSON.stringify(history));
  }

  return (
    <div>
      <form>
        <center>
          <div className="searchBox">
            <input
              type="text"
              placeholder="Search"
              onChange={(event) => {
                setQueryString(event.target.value);
              }}
            />
            <button
              onClick={(event) => {
                event.preventDefault();
                addHistory(queryString);
                addQuery(queryString);
                fetchQuery()
              }}
            >
              Enter
            </button>
          </div>
        </center>
        {search.map((result) => {
          return (
            <div>
              <p>{result.title}</p>
              <p>{result.author}</p>
              <p>
                <a href={result.url}>{result.url}</a>
              </p>
              <hr></hr>
            </div>
          );
        })}
      </form>
    </div>
  );
};

export default Search;
