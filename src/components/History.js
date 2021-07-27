import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { addQuery, getHistory, removeQuery } from "../auth";

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  return (
    <div>
      {!history
        ? null
        : history
            .slice(0)
            .reverse()
            .map((result, index) => {
              return (
                <ol index={index}>
                  <ul>
                    <Link
                      to={`search?query=${result.history}`}
                      onClick={() => {
                        removeQuery();
                        addQuery(result.history);
                      }}
                    >
                      {result.history}
                    </Link>
                  </ul>
                </ol>
              );
            })}
    </div>
  );
};

export default History;
