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
                <div class="columns">
                <div class="column"></div>
                <div class="column is-three-quarters">
                    {/* <TicketDetails/> */}
                    <Recommendations title="Swop before they expire"/>
                    <Recommendations title="Active auctions"/>
                </div>
                <div class="column"></div>
                </div>
            </div>
            

        )
    }
}

export default Home