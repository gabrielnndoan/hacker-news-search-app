import { useHistory } from "react-router-dom";
import { addQuery, getQuery } from "../functions";
import "./Home.css";

const Home = ({ queryString, setQueryString }) => {
  let history = useHistory();
  const redirect = () => {
    history.push(`/search?query=${getQuery()}`);
  };

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
      <h1 className="homeHeading">SEARCH HACKER NEWS</h1>
      <form>
        <section className="searchBoxHome">
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
              addSearchHistory(queryString);
              addQuery(queryString);
              redirect();
            }}
          >
            SEARCH
          </button>
        </section>
      </form>
    </div>
  );
};

export default Home;
