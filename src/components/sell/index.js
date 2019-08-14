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

        this.apiService = new APIService()
        this.blockchain = new BlockchainClient()
    }

    retrieveTicket(){
        this.setState({isVerified : true})
        // this.apiService.verifyTicket(this.state.bookingRefNo).then(res => {
        //     console.log(res)
        //     return res.json()
        // }).then(res => {
        //     this.setState({ ticket : res, isVerified : true })
        // })
    }

    async postTicket(){
        let txHash = await this.blockchain.postTicket(
                                this.state.ticket.swopRefNo, 
                                this.state.ticket.amount, 
                                this.state.lowestAskAmount)
        console.log(txHash)
    }

    updateInputBooking(e){
        this.setState({ bookingRefNo : e.target.value })
    }

    updateLowestAskAmount(e){
        this.setState({ lowestAskAmount : e.target.value })
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
                            <div class="card-content">

                        <FlightInfo title="Departing Flight" data={this.state.ticket.depart}/>
                        <br></br>
                        <FlightInfo title="Return Flight" data={this.state.ticket.return}/>
                        <br></br>
        
                            <div class="field">
                                <p class="control has-icons-left">
                                    <input class="input" onChange={this.updateLowestAskAmount} placeholder="Enter minimum asking amount"></input>
                                    <span class="icon is-small is-left">
                                    <i class="fas fa-lock"></i>
                                    </span>
                                </p>
                           
                            </div>
             
                            <button type="button" class="button is-black "
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