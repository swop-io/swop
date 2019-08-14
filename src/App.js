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
              <Route path = "/details/:id" component = { TicketDetails }/>
              <Route path = "/sell" component = { SellTicket } />
          </div>
          <div class="column"></div>
        </div>
              
      </div>
    </Router>
  );
}

export default App;