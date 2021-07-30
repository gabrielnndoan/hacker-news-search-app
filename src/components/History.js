import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { addQuery, getSearchHistory, removeSearchHistory, removeQuery } from "../functions";
import "./History.css";

const History = () => {
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    setSearchHistory(getSearchHistory());
  }, []);

  return (
    <div className="historyPage">
      <h1>HISTORY OF PAST SEARCHES</h1>
      {!searchHistory ? (
        <h2>No recorded activity.</h2>
      ) : (
        <ul>
          {searchHistory
            .slice(0)
            .reverse()
            .map((result, index) => {
              return (
                <li className="historyList" key={index}>
                  <Link
                    to={`search?query=${result.searchHistory}`}
                    onClick={() => {
                      removeQuery();
                      addQuery(result.searchHistory);
                    }}
                  >
                    {result.searchHistory}
                  </Link>
                </li>
              );
            })}
          <button
            className="removeHistoryButton"
            onClick={() => {
              removeSearchHistory();
              setSearchHistory([]);
            }}
          >
            CLEAR HISTORY
          </button>
        </ul>
      )}
    </div>
  );
};

export default History;
