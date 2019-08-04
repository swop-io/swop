import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./components/home"
import NavBar from "./components/navbar"
import SellTicket from "./components/sell"
import TicketDetails from "./components/details";

function App() {
  return (
    <Router>
      <div>
      <NavBar />

        <div class="columns">
          <div class="column"></div>
          <div class="column is-three-quarters">
              <Route exact path = "/" component = { Home } />
              <Route path = "/details" component = { TicketDetails }/>
              <Route path = "/sell" component = { SellTicket } />
              <Route path = "/topics" component = { Topics } />
          </div>
          <div class="column"></div>
        </div>
              
      </div>
    </Router>
  );
}

function Topic({ match }) {
  return <h3>Requested Param: {match.params.id}</h3>;
}

function Topics({ match }) {
  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      <Route path={`${match.path}/:id`} component={Topic} />
      <Route
        exact
        path={match.path}
        render={() => <h3>Please select a topic.</h3>}
      />
    </div>
  );
}


export default App;