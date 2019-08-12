import React from 'react'
import 'bulma'
import Constants from '../../utils/constants'
import CryptoJS from 'crypto-js';
import * as ethers from 'ethers';
import APIService from '../../data/remote'
import * as firebase from "firebase";
import config from '../../config/config.json'

class BidDetails extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            ethPrice : props.ethPrice,
            inputBidAmount : 0,
            currentNonce : 0,
            currentTopBid : 0

        }
        this.placeBid = this.placeBid.bind(this)
        this.updateInputAmount = this.updateInputAmount.bind(this)
        this.apiService = new APIService()
        
        // firebase.initializeApp(config.firebaseConfig);
        // this.database = firebase.app().database()
    }

    componentDidMount(){

    }

    loadAndListen(){
        let auctionRef = this.database.ref(`auctions/${this.props.swopRefNo}`)

        auctionRef.on('value', snapshot => {
            console.log(snapshot.val())
            let data = snapshot.val()
            this.setState({ currentNonce : data.currentNonce,
                            currentTopBid : data.highestBidAmount})
        });
    }


    updateInputAmount(e){
        this.setState({inputBidAmount : e.target.value})
    }

    async placeBid(){
        const encryptedPK = localStorage.getItem(Constants.LS_KEY_PK);
        const hashKey = localStorage.getItem(Constants.LS_KEY_PASSWORD)
        const bytes = CryptoJS.AES.decrypt(encryptedPK, hashKey);
        const plainText = bytes.toString(CryptoJS.enc.Utf8);

        let amountWei = ethers.utils.parseEther('1.0')
        let hexSwopRefNo = ethers.utils.formatBytes32String(this.props.swopRefNo);

        let message = ethers.utils.concat([
                        ethers.utils.hexZeroPad(ethers.utils.hexlify(amountWei), 32),
                        ethers.utils.hexZeroPad(hexSwopRefNo, 32),
        ])

        let messageHash = ethers.utils.keccak256(message)

        let wallet = new ethers.Wallet(plainText)
        let sig = await wallet.signMessage(ethers.utils.arrayify(messageHash));
        let splitSig = ethers.utils.splitSignature(sig);
    
        console.log(`r: ${splitSig.r}`);
        console.log(`s: ${splitSig.s}`);
        console.log(`v: ${splitSig.v}`);

        let param = {
            swopRefNo : this.props.swopRefNo,
            lowestAskAmount : 250,
            maxAskAmount : 500,
            bidAmount : this.state.inputBidAmount,
            user : wallet.address,
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
            <div>
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
                                        <p class="title">${this.state.currentTopBid}</p>
                                        <p>1.01 ETH</p>
                                        </div>
                                    
                                    </div>
                                    <div class="level-item">
                                        <div>
                                        
                                       
                                        <div class="control">
                                        <input class="input is-small" style={{width : 100}} onChange={this.updateInputAmount} type="text" placeholder="Amount in USD"></input>
                                       
                                        </div>
                                        <button class="button is-black is-small is-pulled-right" onClick={this.placeBid}>Place Bid</button>
                                        </div>
                                    </div>
                </div>
            </div>
        )
    }
}

export default BidDetails