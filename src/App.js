import "./App.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { History, Home, Search } from "./components";

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">HOME</Link>
        <Link to="/search">SEARCH</Link>
        <Link to="/history">HISTORY</Link>
      </nav>
      <main>
        <Switch>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/history">
            <History />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </main>
    </Router>
  );
};

export default App;
