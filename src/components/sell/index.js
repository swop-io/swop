import React from 'react'
import 'bulma'
import APIService from '../../data/remote'
import BlockchainClient from '../../data/blockchain'
import FlightInfo from '../details/flight'

class SellTicket extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            bookingRefNo : '',
            lowestAskAmount : 0,
            isVerified : false,
            isLoading : false,
            ticket : {
                airline : "temp",
                amount : 500,
                depart : {
                    arrivalDateTime: "August 17, 2019 6:00 PM",
                    departureDateTime: "August 17, 2019 3:00 PM",
                    destination: "New York",
                    destinationAirportCode: "JFK",
                    origin: "Toronto",
                    originAirportCode: "YYZ"
                },
                return: {
                    arrivalDateTime: "August 20, 2019 3:00 PM",
                    departureDateTime: "August 20, 2019 12:00 PM",
                    destination: "Toronto",
                    destinationAirportCode: "YYZ",
                    origin: "New York",
                    originAirportCode: "JFK"
                },
                status: "PENDING",
                swopRefNo : "SWP123"
            }
        }

        this.displayForm = this.displayForm.bind(this)
        this.displayTicketDetails = this.displayTicketDetails.bind(this)
        this.retrieveTicket = this.retrieveTicket.bind(this)
        this.postTicket = this.postTicket.bind(this)
        this.updateInputBooking = this.updateInputBooking.bind(this)
        this.updateLowestAskAmount = this.updateLowestAskAmount.bind(this)
        this.updateMaxAskAmount = this.updateMaxAskAmount.bind(this)

        this.apiService = new APIService()
        this.blockchain = new BlockchainClient()
    }

    retrieveTicket(){
        this.apiService.verifyTicket({ "bookingRefNo" : this.state.bookingRefNo}).then(res => {
            return res.json()
        }).then(res => {
            console.log(res)
            this.setState({ ticket : res.data, isVerified : true })
        })
    }

    async postTicket(){
        let txHash = await this.blockchain.postTicket(
                                this.state.ticket.swopRefNo, 
                                this.state.ticket.amount, 
                                this.state.lowestAskAmount)
        console.log(txHash)
        let address = window.web3.eth.accounts[0].toLowerCase()
        this.apiService.postTicket(this.state.ticket, this.state.lowestAskAmount, address).then(res => {
            return res.json()
        }).then(res => {
            console.log(res)
        })
    }

    updateInputBooking(e){
        this.setState({ bookingRefNo : e.target.value })
    }

    updateLowestAskAmount(e){
        this.setState({ lowestAskAmount : e.target.value })
    }

    updateMaxAskAmount(e){
        let inputAmount = e.target.value
        let temp = this.state.ticket
        temp['amount'] = inputAmount
        this.setState({ ticket : temp })
    }

    displayForm(){
        return (
            <div>
                <div class="columns">
                    <div class="column">
                    <p class="title is-5 has-text-weight-light">Retrieve Ticket</p>
                        <div class="card">
                            <div class="card-content">
                            <div class="field">
                                <p class="control has-icons-left">
                                    <input class="input" onChange={this.updateInputBooking} placeholder="Enter booking reference"></input>
                                    <span class="icon is-small is-left">
                                    <i class="fas fa-lock"></i>
                                    </span>
                                </p>
                                </div>
                                <div class="field">
                                <p class="control">
                                    <button type="button" class="button is-black is-fullwidth"
                                    onClick={this.retrieveTicket}>
                                    Retrieve
                                    </button>
                                </p>
                            </div>
                               
                            </div>
                            
                        </div>
                    </div>

                    <div class="column is-two-thirds">
                    <p class="title is-5 has-text-weight-light">Flight Details</p>

                    </div>
                </div>
            </div>
        )
    }

    displayTicketDetails(){
        return (
            <div>
                <p class="title is-5 has-text-weight-light">Flight Details</p>
                <div class="card">
                            <div class="card-content" style={{paddingBottom : 50}}>

                        <FlightInfo title="Departing Flight" data={this.state.ticket.depart}/>
                        <br></br>
                        <FlightInfo title="Return Flight" data={this.state.ticket.return}/>
                        <br></br>
        
                            <div class="field">
                                <p class="control has-icons-left">
                                    <input class="input" onChange={this.updateMaxAskAmount} placeholder="Enter maximum asking amount"></input>
                                    <span class="icon is-small is-left">
                                    <i class="fas fa-lock"></i>
                                    </span>
                                </p>
                           
                            </div>

                            <div class="field">
                                <p class="control has-icons-left">
                                    <input class="input" onChange={this.updateLowestAskAmount} placeholder="Enter minimum asking amount"></input>
                                    <span class="icon is-small is-left">
                                    <i class="fas fa-lock"></i>
                                    </span>
                                </p>
                           
                            </div>
             
                            <button type="button" class="button is-black is-pulled-right" style={{width : 200}}
                                    onClick={this.postTicket}>
                                    Post
                                    </button>
                            </div>
                            
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
            


                <div class="columns">
                    <div class="column">
                    <p class="title is-5 has-text-weight-light">Retrieve Ticket</p>
                        <div class="card">
                            <div class="card-content">
                            <div class="field">
                                <p class="control has-icons-left">
                                    <input class="input" onChange={this.updateInputBooking} placeholder="Enter booking reference"></input>
                                    <span class="icon is-small is-left">
                                    <i class="fas fa-lock"></i>
                                    </span>
                                </p>
                                </div>
                                <div class="field">
                                <p class="control">
                                    <button type="button" class="button is-black is-fullwidth"
                                    onClick={this.retrieveTicket}>
                                    Retrieve
                                    </button>
                                </p>
                            </div>
                               
                            </div>
                            
                        </div>
                    </div>

                    <div class="column is-two-thirds">
                        {
                            !this.state.isVerified ?
                            "" :
                            this.displayTicketDetails()
                    }

                    </div>
                </div>
            </div>
        )
    }
}

export default SellTicket