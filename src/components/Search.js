import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { addQuery, getQuery, removeQuery } from "../functions";
import "./Search.css";

const Search = ({ queryString, setQueryString }) => {
  const [search, setSearch] = useState([]);
  let history = useHistory();
  const redirect = () => {
    history.push(`/search?query=${getQuery()}`);
  };

  const fetchQuery = () => {
    if (getQuery()) {
      fetch(`http://hn.algolia.com/api/v1/search?query=${getQuery()}&hitsPerPage=50`)
        .then((response) => response.json())
        .then((results) => {
          setSearch(results.hits);
          redirect();
          removeQuery();
        })
        .catch(console.error);
    } else {
      fetch(`http://hn.algolia.com/api/v1/search?query=${queryString}&hitsPerPage=50`)
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

  function addSearchHistory(queryString) {
    let searchHistory = [];
    if (localStorage.getItem("searchHistory")) {
      searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
    }
    searchHistory.push({ searchHistory: queryString });
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }

  return (
    <div>
      <form>
        <div className="searchBox">
          <input
            className="searchBoxInput"
            type="text"
            placeholder="SEARCH"
            onChange={(event) => {
              setQueryString(event.target.value);
            }}
          />
          <button
            className="searchBoxButton"
            onClick={(event) => {
              event.preventDefault();
              addSearchHistory(queryString);
              addQuery(queryString);
              fetchQuery();
            }}
          >
            SEARCH
          </button>
        </div>
        <section>
          {search.map((result, index) => {
            return (
              <>
                {result.title && result.author && result.url ? (
                  <div className="results">
                    <p className="resultTitle" key={index}>
                      <em>{result.title}</em> (<a href={result.url}>{result.url}</a>)
                    </p>
                    <p className="resultPoints">
                      {result.points} points | author: {result.author} | created: {new Date(result.created_at).toLocaleDateString()}
                    </p>
                    <hr />
                  </div>
                ) : null}
              </>
            );
          })}
        </section>
      </form>
    </div>
  );
};

export default Search;
