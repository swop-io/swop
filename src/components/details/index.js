import React from 'react'
import 'bulma'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Footer from '../footer'
import FlightInfo from './flight'
import BidHistory from './history'
import AuctionSetup from './auction'
import Constants from '../../utils/constants'
import CryptoJS from 'crypto-js';
import * as ethers from 'ethers';
import APIService from '../../data/remote'


class TicketDetails extends React.Component {

    constructor(props){
        super(props)
        // this.data = {
        //     flightDate : "Monday, August 19th, 2019",
        //     origin : "Toronto",
        //     originAirportCode: "YYZ",
        //     destination : "New York",
        //     destinationAirportCode: "JFK",
        //     departureTime : "06:30",
        //     arrivalTime : "10:30"

        // }

        this.state = {
            showAuction : false,
            hasAccountSetup : false,
            wallet : undefined,
            hasWallet : false,
            data : {
                airline : "temp",
                amount : "temp",
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
        this.placeBid = this.placeBid.bind(this)

        this.apiService = new APIService()
    }

    componentDidMount(){
        this.getTicketDetails()
        this.checkWalletStatus()
       
        console.log('params: ' + this.props.match.params.id);
    }

    getTicketDetails(){
        this.apiService.getTicketDetails(`?swopRefNo=${this.props.match.params.id}`).then(res => {
            return res.json()
        }).then(res => {
            console.log(res)
            this.setState({data : res})
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

    async placeBid(){
        const encryptedPK = localStorage.getItem(Constants.LS_KEY_PK);
        const hashKey = localStorage.getItem(Constants.LS_KEY_PASSWORD)
        const bytes = CryptoJS.AES.decrypt(encryptedPK, hashKey);
        const plainText = bytes.toString(CryptoJS.enc.Utf8);

        let amountWei = ethers.utils.parseEther('1.0')
        let hash = "0x3ea2f1d0abf3fc66cf29eebb70cbd4e7fe762ef8a09bcc06c8edf641230afec0";

        let message = ethers.utils.concat([
                        ethers.utils.hexZeroPad(ethers.utils.hexlify(amountWei), 32),
                        ethers.utils.hexZeroPad(hash, 32),
        ])

        let messageHash = ethers.utils.keccak256(message)

        let x = new ethers.Wallet(plainText)
        let sig = await x.signMessage(ethers.utils.arrayify(messageHash));
        let splitSig = ethers.utils.splitSignature(sig);
    
        console.log(`r: ${splitSig.r}`);
        console.log(`s: ${splitSig.s}`);
        console.log(`v: ${splitSig.v}`);

        let param = {
            swopRefNo : hash,
            lowestAskAmount : 250,
            maxAskAmount : 500,
            bidAmount : 253,
            user : "0xE5CDaa796A8AA9009FEBA23395f5FC083e462283",
            signature : {
                r : splitSig.r,
                s : splitSig.s,
                v : splitSig.v
            }
        }

        let response = await this.apiService.placeBid(param)
        console.log(response)
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
                                        <button class="button is-black is-small is-pulled-right" onClick={this.placeBid}>Place Bid</button>
                                        </div>
                                    </div>
                                </div>

                        <BidHistory swopRefNo={this.props.match.params.id}/>
                        
                        </div>
                    </div>
                    
                    <div class="column">
                    <p class="title is-5">Payment</p>
                        <div class="card">
                            <div class="card-content">
                                <p class="title">${this.state.data.amount}</p>
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
                               
                            </div>
                            
                        </div>
                    </div>
                </div>


               
            </div>
        )
    }
}

export default TicketDetails