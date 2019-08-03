import React from 'react'
import 'bulma'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class TicketDetails extends React.Component {
    render() {
        return (
            <div style={{margin : 10}}>
                <div class="columns">
                    <div class="column is-two-thirds">
                    <p class="title is-5">Flight Details</p>
                        <p>Departing flight</p>
                            <article class="message is-small is-dark">
                            <div class="message-header">
                            <p>Monday, August 19th, 2019</p>
                            <span style={{float : 'right'}}> Toronto, CA(YYZ) - New York, USA(JFK)</span>
                            </div>
                            <div class="message-body">
                                <div class="level">
                                    <div class="level-item has-text-centered">
                                        <div>
                                        <p class="heading">Toronto (YYZ)</p>
                                        <p class="title">06:30</p>
                                        </div>
                                    </div>
                                    <div class="level-item has-text-centered">
                                        <div>
                                        <p class="heading">Non-stop (1h30m)</p>
                                        <p class="title">>>></p>
                                        </div>
                                    </div>
                                    <div class="level-item has-text-centered">
                                        <div>
                                        <p class="heading">New York (JFK)</p>
                                        <p class="title">10:30</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            </article>

                        <p>Return flight</p>
                            <article class="message is-small is-dark">
                            <div class="message-header">
                            <p>Monday, August 19th, 2019</p>
                            <span style={{float : 'right'}}> Toronto, CA(YYZ) - New York, USA(JFK)</span>
                            </div>
                            <div class="message-body">
                            <div class="level">
                                    <div class="level-item has-text-centered">
                                        <div>
                                        <p class="heading">Toronto (YYZ)</p>
                                        <p class="title">06:30</p>
                                        </div>
                                    </div>
                                    <div class="level-item has-text-centered">
                                        <div>
                                        <p class="heading">Non-stop (1h30m)</p>
                                        <p class="title">>>></p>
                                        </div>
                                    </div>
                                    <div class="level-item has-text-centered">
                                        <div>
                                        <p class="heading">New York (JFK)</p>
                                        <p class="title">10:30</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            </article>

                        <p class="title is-5">Bids</p>
                        <div class="box">
                          
                            <p class="subtitle">This column will take up the remaining space available.</p>
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
                                <a class="button is-fullwidth">Join Auction</a>
                            </div>
                            
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}

export default TicketDetails