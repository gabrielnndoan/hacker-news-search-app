import { useState } from "react";
import { BrowserRouter as Router, Route, Switch, NavLink } from "react-router-dom";
import { History, Home, Search } from "./components";
import "./App.css";

const App = () => {
  const [queryString, setQueryString] = useState("");

  return (
    <Router>
      <div className="navBar">
        <nav>
          <NavLink activeClassName="active" to="/history">
            HISTORY
          </NavLink>
          <NavLink activeClassName="active" to="/search">
            SEARCH
          </NavLink>
          <NavLink exact activeClassName="active" to="/">
            HOME
          </NavLink>
        </nav>
      </div>
      <main>
        <Switch>
          <Route path="/search">
            <Search queryString={queryString} setQueryString={setQueryString} />
          </Route>
          <Route path="/history">
            <History />
          </Route>
          <Route path="/">
            <Home queryString={queryString} setQueryString={setQueryString} />
          </Route>
        </Switch>
      </main>
    </Router>
  );
};

export default App;
