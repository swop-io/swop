import React from 'react'
import 'bulma'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Footer from '../footer'
import FlightInfo from './flight'
import BidHistory from './history'
import AuctionSetup from './auction'
import Deposit from './deposit'

class TicketDetails extends React.Component {

    constructor(props){
        super(props)
        this.data = {
            flightDate : "Monday, August 19th, 2019",
            origin : "Toronto",
            originAirportCode: "YYZ",
            destination : "New York",
            destinatioAirportCode: "JFK",
            departureTime : "06:30",
            arrivalTime : "10:30"

        }

        this.state = {
            showAuction : false,
            hasAccountSetup : false
        }
        this.showHideAuction = this.showHideAuction.bind(this)
    }

    showHideAuction(){
        this.setState(state => ({
            showAuction : !state.showAuction
        }))
    }
    
    render() {
        return (
            <div style={{margin : 10}}>
                <div class="columns">
                    <div class="column is-two-thirds">
                    <p class="title is-5">Flight Details</p>

                        <FlightInfo title="Departing Flight" data={this.data}/>
                        <br></br>
                        <FlightInfo title="Return Flight" data={this.data}/>

                        <p class="title is-5">Bids</p>
                        <div class="box">
                        <div class="level">
                                    <div class="level-item has-text-centered">
                                        <div>
                                        <p class="heading">Lowest Ask</p>
                                        <p class="title">$300</p>
                                        <p>1.01 ETH</p>
                                        </div>
                                    </div>

                                    <div class="level-item has-text-centered">
                                        <div>
                                        <p class="heading">Highest Bid</p>
                                        <p class="title">$350</p>
                                        <p>1.01 ETH</p>
                                        </div>
                                    
                                    </div>
                                    <div class="level-item">
                                        <div>
                                        
                                       
                                        <div class="control">
                                        <input class="input is-small" style={{width : 100}} type="text" placeholder="Amount in USD"></input>
                                       
                                        </div>
                                        <button class="button is-black is-small is-pulled-right">Place Bid</button>
                                        </div>
                                    </div>
                                </div>

                        <BidHistory/>
                        
                        </div>
                    </div>
                    
                    <div class="column">
                    <p class="title is-5">Payment</p>
                        <div class="card">
                            <div class="card-content">
                                <p class="title">$500</p>
                                <p class="subtitle">2.00123 ETH</p>

                                <a class="button is-fullwidth is-black">Purchase</a>
                                <p>OR</p>
                                <a class="button is-fullwidth" onClick={this.showHideAuction}>
                                    {this.state.showAuction ? 'Cancel' : 'Join Auction'}
                                </a>

                                { this.state.showAuction ? 
                                    <div>
                                        <hr></hr>
                                        <AuctionSetup hasAccountSetup={this.state.hasAccountSetup}/> 
                                    </div>
                                    : "" 
                                    
                                    }
                                
                                { this.state.hasAccountSetup && this.state.showAuction ?
                                    <div>
                                        <hr></hr>
                                        <Deposit/> 
                                    </div>
                                    : "" }
                               
                            </div>
                            
                        </div>
                    </div>
                </div>


               
            </div>
        )
    }
}

export default TicketDetails