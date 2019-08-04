import React from 'react'
import 'bulma'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Footer from '../footer'

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


                        <p>Bid History</p>
                        <table class="table is-fullwidth">
                            <thead>
                                <tr>
                                <th>User</th>
                                <th>Datetime</th>
                                <th>Amount (USD)</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>

                                <td>0xE5CDaa796A8A...</td>
                                <td>08/03/2019 - 20:00:00</td>
                                <td>200</td>
                                </tr>
                                <tr>
                                
                                <td>0xE5CDaa796A8A...</td>
                                <td>08/03/2019 - 20:00:00</td>
                                <td>180</td>
                                </tr>
                                <tr>
                                
                                    <td>0xE5CDaa796A8A...</td>
                                <td>08/03/2019 - 20:00:00</td>
                                <td>150</td>
                                </tr>
                                <tr>
                                
                                <td>0xE5CDaa796A8A...</td>
                                <td>08/03/2019 - 20:00:00</td>
                                <td>100</td>
                                </tr>


                            </tbody>
                        </table>
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