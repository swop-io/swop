import React from 'react'
import 'bulma'

class ListingItem extends React.Component {

    constructor(props){
        super(props)
    }

    render() {
        return (
            <div>
                <div class="box" style={{marginBottom : 10}}>
                <div class="columns">
                    <div class="column">
                    <article class="media">
                    <div class="media-left">
                    <figure class="image is-64x64">
                        <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image"></img>
                    </figure>
                    </div>
                    <div class="media-content">
                    <div class="content">
                        <p>
                        <strong>to New York</strong> 
                        <br></br>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla egestas. Nullam condimentum luctus turpis.
                        </p>
                    </div>

                    </div>
                </article>
                        
                    </div>
                    <div class="column">
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
                                        {/* <p class="title">${this.state.currentTopBid}</p> */}
                                        {/* <p>{this.state.currentTopBidEth.toFixed(4)} ETH</p> */}
                                         <p class="title">$300</p>
                                        <p>2.333 ETH</p>
                                        </div>
                                    
                                    </div>
   
                </div>

                    </div>
                    <div class="column is-one-quarter">
                    <button class="button is-black is-fullwidth" 
                            onClick={this.placeBid}>Close Auction</button>
                                      
                    <button class="button is-fullwidth" 
                            onClick={this.placeBid}
                            style={{marginTop : 8}}>Cancel</button>
                    </div>
                </div>




                </div>
            </div>
        )
    }
}

export default ListingItem