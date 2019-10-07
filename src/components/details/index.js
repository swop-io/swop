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
import EthConverter from '../../utils/converter'
import BlockchainClient from '../../data/blockchain/index'
import web3Obj from '../../data/blockchain/helper'

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
        this.purchaseTicket = this.purchaseTicket.bind(this)

        this.apiService = new APIService()
        this.ethConverter = new EthConverter()
        this.blockchainClient = new BlockchainClient()
        firebase.initializeApp(config.firebaseConfig);
        this.database = firebase.app().database()
      
    }

    componentDidMount(){
        this.getTicketDetails()
        this.checkWalletStatus()
        this.convertAmountInEth()
    }

    convertAmountInEth(){
        this.setState({amountInEth : this.ethConverter.usdToEth(this.state.data.amount)})
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
        const isTorus = sessionStorage.getItem('pageUsingTorus')

        if (isTorus) {
            this.setState({hasAccountSetup : true})
        }else{
            this.setState({hasAccountSetup : false})
        }

    }

    enableTorus = async () =>{
        try {
          await web3Obj.initialize()
          this.setStateInfo()
        } catch (error) {
          console.error(error)
        }
      }

      setStateInfo = () => {
        web3Obj.web3.eth.getAccounts().then(accounts => {
          console.log('pasok kp::' + accounts[0])
          this.checkWalletStatus()
          this.blockchainClient.initContracts()

        })
      }

    purchaseTicket(){
        this.blockchainClient.buyTicket(this.props.match.params.id, this.state.amountInEth)
    }
    render() {
        return (
            <div style={{margin : 10}}>
                <div class="columns">
                    <div class="column is-two-thirds">
                    <p class="title has-text-weight-light">Flight Details</p>

                        <FlightInfo title="Departing Flight" data={this.state.data.depart}/>
                        <br></br>
                        <FlightInfo title="Return Flight" data={this.state.data.return}/>
                        <br></br>
                        <p class="title has-text-weight-light">Bids</p>
                        <div class="box">

                        <BidDetails swopRefNo={this.props.match.params.id} database={this.database} ethPrice={this.state.ethPrice}/>
                        <br></br>
                        <BidHistory swopRefNo={this.props.match.params.id} database={this.database}/>
                        
                        </div>
                    </div>
                    
                    <div class="column">
                    <p class="title has-text-weight-light">Payment</p>
                        <div class="card">
                            <div class="card-content">
                                <p class="title is-1">${this.state.data.amount}</p>
                                <p class="subtitle">{this.state.amountInEth.toFixed(4)} ETH</p>

                                <a class="button is-fullwidth is-black" 
                                    onClick={this.purchaseTicket}
                                  disabled={!this.state.hasAccountSetup}>Purchase</a>
                      
                                <p class="has-text-centered">or</p>
                            
                                <a class="button is-fullwidth" 
                                    disabled={!this.state.hasAccountSetup}
                                    onClick={this.showHideAuction}>
                                    {this.state.showAuction ? 'Cancel' : 'Join Auction'}
                                </a>

                                { this.state.showAuction ? 
                                    <div>
                                        <hr></hr>
                                        <AuctionSetup hasAccountSetup={this.state.hasAccountSetup} swopRefNo={this.props.match.params.id}/> 
                                    </div>
                                    : "" 
                                    
                                    }
                               
                               <br></br>
                               <br></br>
                               <a class="button is-fullwidth" onClick={this.enableTorus}>
                                    TORUS LOGIN
                                </a>
                            </div>
                            
                        </div>
                    </div>
                </div>


               
            </div>
        )
    }
}

export default TicketDetails