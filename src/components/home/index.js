import React from 'react'
import 'bulma'
import SwopLogo from '../../images/swop-logo.svg'
import Recommendations from '../recommendations'
import TicketDetails from '../details'

class Home extends React.Component {

    constructor(props){
        super(props)
    }

    render() {
        return (
            <div>
                             {/* <section class="hero is-primary">
                 <div class="hero-body ">
                     <div class="container">
                    <h1 class="title">
                        Swop
                   </h1>
                    <h2 class="subtitle">
                         Peer-to-peer auction-based marketplace of non-refundable flight tickets.
                    </h2>

                    <a class="button">Post Booking</a>
                     <a class="button is-black">Swop Booking</a>
                     </div>
                </div>
             </section> */}
            <div class="columns">
            <div class="column"></div>
            <div class="column is-three-quarters">
                <TicketDetails/>
                {/* <Recommendations title="Swop before they expire"/>
                <Recommendations title="Active auctions"/> */}
            </div>
            <div class="column"></div>
            </div>
            </div>
            

        )
    }
}

export default Home