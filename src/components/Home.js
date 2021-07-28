import { useHistory } from "react-router-dom";
import { addQuery, getQuery } from "../functions";
import "./Home.css";

const Home = ({ queryString, setQueryString }) => {
  let history = useHistory();
  const redirect = () => {
    history.push(`/search?query=${getQuery()}`);
  };

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
      <h1 className="homeHeading">SEARCH HACKER NEWS</h1>
      <form>
        <div className="searchBoxHome">
          <input
            className="searchBoxInputHome"
            type="text"
            placeholder="SEARCH"
            onChange={(event) => {
              setQueryString(event.target.value);
            }}
          />
          <button
            className="searchBoxButtonHome"
            onClick={(event) => {
              event.preventDefault();
              addHistory(queryString);
              addQuery(queryString);
              redirect();
            }}
          >
            SEARCH
          </button>
        </div>
      </form>
    </div>
  );
};

export default Home;
