import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SwopLogo from '../../images/swop-logo.svg'
import 'bulma'
class NavBar extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            showModal : false
        }

    }

    render() {
        return (
            <nav class="navbar is-black is-spaced" style={{marginBottom : 40}}>

                <div class="navbar-brand" style={{marginLeft : 110}}>
                    <a class="navbar-item" href="/">
                    <img src={ SwopLogo } style={{width: 50 , height: 200 }}></img>
                    
                    </a>

                    <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
                    <span></span>
                    <span></span>
                    <span></span>
                    </div>
                    <a class="navbar-item" href="/">
                        How it works
                    </a>
                    <a class="navbar-item" href="/">
                        About
                    </a>
                    <a class="navbar-item" href="/">
                        Partner with Us
                    </a>
                </div>

                <div id="navbarExampleTransparentExample" class="navbar-menu" style={{marginRight:110}}>
                    <div class="navbar-end">
                    <Link class="navbar-item" to="/sell">
                        Sell Ticket
                    </Link>
                    <a class="navbar-item" href="/listings">
                        Listings
                    </a>
                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link" href="/">
                        Account
                        </a>
                        <div class="navbar-dropdown is-boxed ">
                        <a class="navbar-item" href="/">
                            Overview
                        </a>
                        <a class="navbar-item" href="/">
                            Purchases
                        </a>
                        <hr class="navbar-divider"></hr>
                        <a class="navbar-item" href="/">
                            Elements
                        </a>
                        <a class="navbar-item is-active" href="/">
                            Components
                        </a>
                        </div>
                    </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default NavBar