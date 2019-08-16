import React from 'react'
import 'bulma'
import BlockchainClient from '../../data/blockchain'
import EthConverter from '../../utils/converter'

class ListingItem extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            auctionDetails : null,
            isLoading : false,
            flightDetails : props.flightDetails
        }
        this.displayDetails = this.displayDetails.bind(this)
        this.closeAuction = this.closeAuction.bind(this)
        this.blockchain = new BlockchainClient()
        this.ethConverter = new EthConverter()

    }

    componentDidMount(){
        this.setState({ isLoading : true})
        this.loadAndListen()
    }

    loadAndListen(){
        let auctionRef = this.props.database.ref(`auctions/${this.state.flightDetails.swopRefNo}`)
        auctionRef.on('value', snapshot => {
            this.setState({auctionDetails : snapshot.val()})
            this.setState({isLoading : false})
        })
    }

    async closeAuction(){
        let txHash = await this.blockchain.closeAuction(
                                this.state.flightDetails.swopRefNo,
                                this.state.auctionDetails.topBidAmount,
                                this.state.auctionDetails.currentNonce,
                                this.state.auctionDetails.currentSignature)

        console.log(txHash)
    }

    displayDetails(){
        return (
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
                        <strong>To {this.state.flightDetails.depart.destination}</strong> 
                        <br></br>
                        {this.state.flightDetails.depart.departureDateTime}
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
                                        { this.state.auctionDetails !== null ? 
                                            <div>
                                                 <p class="title">${this.state.auctionDetails.lowestAskAmount}</p>
                                                 <p>{this.ethConverter.usdToEth(this.state.auctionDetails.lowestAskAmount)} ETH</p>
                                            </div>
                                            : ""}
                                       
                                        </div>
                                    </div>

                                    <div class="level-item has-text-centered">
                                        <div>
                                        <p class="heading">Highest Bid</p>
                                        { this.state.auctionDetails !== null ? 
                                            <div>
                                                <p class="title">${this.state.auctionDetails.highestBidAmount}</p>
                                                <p>{this.ethConverter.usdToEth(this.state.auctionDetails.highestBidAmount)}</p>
                                            </div>
                                             : ""}
                                        </div>
                                    
                                    </div>
   
                </div>

                    </div>
                    <div class="column is-one-quarter">
                    <button class="button is-black is-fullwidth" 
                            onClick={this.closeAuction}>Close Auction</button>
                                      
                    <button class="button is-fullwidth" 
                            onClick={this.placeBid}
                            style={{marginTop : 8}}>Cancel</button>
                    </div>
                </div>
        </div>
        )
    }

    render() {
        return (
            <div>
                { !this.state.isLoading ? this.displayDetails() : ""}
            </div>
        )
    }
}

export default ListingItem