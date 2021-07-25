import { useState, useEffect } from "react";

const Search = () => {
  const [queryString, setQueryString] = useState("");
  const [search, setSearch] = useState([]);

  const fetchQuery = () => {
    fetch(`http://hn.algolia.com/api/v1/search?query=${queryString}`)
      .then((response) => response.json())
      .then((results) => {
        console.log(results);
        setSearch(results.hits);
        console.log(search);
        // setQueryString("");
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchQuery();
    setQueryString("")
  }, []);

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
                // console.log(queryString);
              }}
            />
            <button
              onClick={(event) => {
                event.preventDefault();

                fetchQuery();
                console.log(queryString);
              }}
            >
              Enter
            </button>
          </div>
        </center>
        {search
          // .filter((result) => {
          //   if (queryString === "") {
          //     return result;
          //   } else if (result.title.toLowerCase().includes(queryString.toLowerCase())) {
          //     return result;
          //   }
          //   return null;
          // })
          .map((result, index) => {
            return (
              <div>
                <p>{result.title}</p>
                <p>{result.author}</p>
                <p>{result.url}</p>
                <hr></hr>
              </div>
            );
          })}
      </form>
    </div>
  );
};

export default Search;
