import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./components/home"
import NavBar from "./components/navbar"
import SellTicket from "./components/sell"
import TicketDetails from "./components/details"
import Listings from './components/listings'


function App() {
  return (
    <Router>
      <div>
      <NavBar />

        <div class="columns">
          <div class="column"></div>
          <div class="column is-three-quarters">
              <Route exact path = "/swop-ui" component = { Home } />
              <Route path = "/swop-ui/details/:id" component = { TicketDetails }/>
              <Route path = "/swop-ui/sell" component = { SellTicket } />
              <Route path = "/swop-ui/listings" component = { Listings } />
          </div>
          <div class="column"></div>
        </div>
              
      </div>
    </Router>
  );
}

export default App;