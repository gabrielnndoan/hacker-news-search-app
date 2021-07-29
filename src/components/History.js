import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { addQuery, getHistory, removeHistory, removeQuery } from "../functions";
import "./History.css";

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  return (
    <div className="historyPage">
      <h1>HISTORY OF PAST SEARCHES</h1>
      {!history ? (
        <h2>No recorded activity.</h2>
      ) : (
        <ul>
          {history
            .slice(0)
            .reverse()
            .map((result, index) => {
              return (
                <li className="historyList" key={index}>
                  <Link
                    to={`search?query=${result.history}`}
                    onClick={() => {
                      removeQuery();
                      addQuery(result.history);
                    }}
                  >
                    {result.history}
                  </Link>
                </li>
              );
            })}
          <button
            className="removeHistoryButton"
            onClick={() => {
              removeHistory();
              setHistory([]);
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
