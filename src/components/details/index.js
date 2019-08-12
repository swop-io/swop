import React from 'react'
import 'bulma'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Footer from '../footer'
import FlightInfo from './flight'
import BidHistory from './history'
import BidDetails from './bidDetails'
import AuctionSetup from './auction'
import Constants from '../../utils/constants'
import APIService from '../../data/remote'
import * as firebase from "firebase";
import config from '../../config/config.json'

class TicketDetails extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            showAuction : false,
            hasAccountSetup : false,
            wallet : undefined,
            hasWallet : false,
            ethPrice : 211,
            amountInEth : 0,
            data : {
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
                status: "PENDING"
            }
        }

        this.showHideAuction = this.showHideAuction.bind(this)
        this.checkWalletStatus = this.checkWalletStatus.bind(this)

        this.apiService = new APIService()
        firebase.initializeApp(config.firebaseConfig);
        this.database = firebase.app().database()
      
        // setInterval(() => {
        //     this.getEthPrice()
        // }, 5000)
    }

    componentDidMount(){
        this.getTicketDetails()
        this.checkWalletStatus()
        this.convertAmountInEth()
    }

    convertAmountInEth(){
        let converted = this.state.data.amount / this.state.ethPrice
        this.setState({amountInEth : converted})
    }

    getTicketDetails(){
        this.apiService.getTicketDetails(`?swopRefNo=${this.props.match.params.id}`).then(res => {
            return res.json()
        }).then(res => {
            console.log(res)
            this.setState({data : res})
        })
      
    }

    getEthPrice(){
        this.apiService.getEtherPrice().then(response => {
            console.log(response)
            if(response.ok) return response.json()
        }).catch(err => {
            console.log(err)
        }).then(response => {
            // if(response.status === "1" && response.message === "OK"){
                console.log('loadLastPrice' , response)
                // this.setState({ethPrice : JSON.stringify(response.result)})
            // }else{
            //     console.log(response.message)
            // }
        })
    }

    showHideAuction(){
        this.setState(state => ({
            showAuction : !state.showAuction
        }))
    }
    
    checkWalletStatus(){
        if(typeof(Storage) !== "undefined"){
            let pk = localStorage.getItem(Constants.LS_KEY_PK) 
            if(pk === null || pk === 'undefined'){
                this.setState({hasAccountSetup : false})
            }else{
                this.setState({hasAccountSetup : true})
            }
        }else{
            console.log('web storage not supported')
        }
    }



    render() {
        return (
            <div style={{margin : 10}}>
                <div class="columns">
                    <div class="column is-two-thirds">
                    <p class="title is-5">Flight Details</p>

                        <FlightInfo title="Departing Flight" data={this.state.data.depart}/>
                        <br></br>
                        <FlightInfo title="Return Flight" data={this.state.data.return}/>

                        <p class="title is-5">Bids</p>
                        <div class="box">

                        <BidDetails swopRefNo={this.props.match.params.id} database={this.database} ethPrice={this.state.ethPrice}/>
                        <BidHistory swopRefNo={this.props.match.params.id} database={this.database}/>
                        
                        </div>
                    </div>
                    
                    <div class="column">
                    <p class="title is-5">Payment</p>
                        <div class="card">
                            <div class="card-content">
                                <p class="title">${this.state.data.amount}</p>
                                <p class="subtitle">{this.state.amountInEth.toFixed(4)} ETH</p>

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
                               
                            </div>
                            
                        </div>
                    </div>
                </div>


               
            </div>
        )
    }
}

export default TicketDetails