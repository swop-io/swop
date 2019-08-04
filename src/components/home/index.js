import React from 'react'
import 'bulma'
import SwopLogo from '../../images/swop-logo.svg'
import Recommendations from '../recommendations'
import TicketDetails from '../details'
import ExpiringTickets from '../../mock/getRecommendations.json'
import BiddingTickets from '../../mock/getRecommendations.json'

class Home extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            expiring : ExpiringTickets,
            bidding : BiddingTickets
        }
    }

    render() {
        return (
            <div>
                <Recommendations title = "Swop before they expire" list = { this.state.expiring }/>
                <Recommendations title = "Active auctions" list = { this.state.bidding }/>
            </div>
        
        )
    }
}

export default Home