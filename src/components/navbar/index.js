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
                    <a class="navbar-item" href="/swop-ui">
                    <img src={ SwopLogo } style={{width: 50 , height: 200 }}></img>
                    
                    </a>

                    <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
                    <span></span>
                    <span></span>
                    <span></span>
                    </div>
                    <a class="navbar-item" href="/swop-ui">
                        How it works
                    </a>
                    <a class="navbar-item" href="/swop-ui">
                        About
                    </a>
                    <a class="navbar-item" href="/swop-ui">
                        Partner with Us
                    </a>
                </div>

                <div id="navbarExampleTransparentExample" class="navbar-menu" style={{marginRight:110}}>
                    <div class="navbar-end">
                    <Link class="navbar-item" to="/swop-ui/sell">
                        Sell Ticket
                    </Link>
                    <a class="navbar-item" href="/swop-ui/listings">
                        Listings
                    </a>
                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link" href="/swop-ui">
                        Account
                        </a>
                        <div class="navbar-dropdown is-boxed ">
                        <a class="navbar-item" href="/swop-ui">
                            Overview
                        </a>
                        <a class="navbar-item" href="/swop-ui">
                            Purchases
                        </a>
                        <hr class="navbar-divider"></hr>
                        <a class="navbar-item" href="/swop-ui">
                            Elements
                        </a>
                        <a class="navbar-item is-active" href="/swop-ui">
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