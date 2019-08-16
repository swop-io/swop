import React from 'react'
import 'bulma'
import Constants from '../../utils/constants'
import CryptoJS from 'crypto-js';
import * as ethers from 'ethers';
import APIService from '../../data/remote'
import Blockchain from '../../data/blockchain'
import EthConverter from '../../utils/converter'

class BidDetails extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            inputBidAmount : '',
            currentNonce : 0,
            maxAskAmount : 0,
            currentTopBid : 0,
            currentTopBidEth : 0,
            lowestAskAmount : 0,
            lowestAskEth : 0,
            isEnabled : false,
            isBidder : false

        }
        this.placeBid = this.placeBid.bind(this)
        this.updateInputAmount = this.updateInputAmount.bind(this)
        
        this.apiService = new APIService()
        this.blockchain = new Blockchain()
        this.ethConverter = new EthConverter()
        this.database = props.database
    }

    componentWillMount(){
        this.blockchain.isBidder(this.props.swopRefNo).then(res => {
            this.setState({isBidder : res})
        })
    }

    componentDidMount(){
        this.loadAndListen()
    }

    loadAndListen(){
        let auctionRef = this.database.ref(`auctions/${this.props.swopRefNo}`)

        auctionRef.on('value', snapshot => {
            console.log(snapshot.val())
            let data = snapshot.val()
            this.setState({ currentNonce : data.currentNonce,
                            currentTopBid : Number(data.highestBidAmount),
                            maxAskAmount : Number(data.maxAskAmount),
                            lowestAskAmount : Number(data.lowestAskAmount)})
            this.convertAmountInEth()
        });
    }

    convertAmountInEth(){
        this.setState( {currentTopBidEth : this.ethConverter.usdToEth(this.state.currentTopBid), 
                        lowestAskEth : this.ethConverter.usdToEth(this.state.lowestAskAmount)} )
    }

    updateInputAmount(e){
        let inputAmount = e.target.value

        let enable = this.state.maxAskAmount > inputAmount && 
                    inputAmount > this.state.lowestAskAmount &&
                    inputAmount > this.state.currentTopBid &&
                    this.state.isBidder ? 
                    true : false

        this.setState({inputBidAmount : inputAmount,
                        isEnabled : enable })
    }


    async placeBid(){
        const encryptedPK = localStorage.getItem(Constants.LS_KEY_PK);
        const hashKey = localStorage.getItem(Constants.LS_KEY_PASSWORD)
        const bytes = CryptoJS.AES.decrypt(encryptedPK, hashKey);
        const plainText = bytes.toString(CryptoJS.enc.Utf8);

        let hexSwopRefNo = ethers.utils.formatBytes32String(this.props.swopRefNo);
        let bytesNonce = ethers.utils.formatBytes32String(this.state.currentNonce + ':nonce');
        let amountInWei = ethers.utils.parseEther('' + this.ethConverter.usdToEth(this.state.inputBidAmount))
        
        let message = ethers.utils.concat([
            ethers.utils.hexZeroPad(hexSwopRefNo, 32),
            ethers.utils.hexZeroPad(ethers.utils.hexlify(amountInWei), 32),
            ethers.utils.hexZeroPad(bytesNonce, 32)
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
            bidAmount : this.state.inputBidAmount,
            user : wallet.address,
            signature : {
                r : splitSig.r,
                s : splitSig.s,
                v : splitSig.v
            }
        }

        let response = await this.apiService.placeBid(param)
        this.setState({inputBidAmount : ''})
        console.log(response)
    }

    render() {
        return (
            <div>
                <div class="level">
                                    <div class="level-item has-text-centered">
                                        <div>
                                        <p class="heading">Lowest Ask</p>
                                        <p class="title">${this.state.lowestAskAmount}</p>
                                        <p>{this.state.lowestAskEth.toFixed(4)} ETH</p>
                                        </div>
                                    </div>

                                    <div class="level-item has-text-centered">
                                        <div>
                                        <p class="heading">Highest Bid</p>
                                        <p class="title">${this.state.currentTopBid}</p>
                                        <p>{this.state.currentTopBidEth.toFixed(4)} ETH</p>
                                        </div>
                                    
                                    </div>
                                    <div class="level-item">
                                        <div>
                                        {
                                            this.state.isBidder ? 
                                                <p class="is-size-7 has-text-info">Must be higher than top bid</p> :
                                                <p class="is-size-7 has-text-danger">Make a deposit to join auction</p>
                                        }
                                        
                                        
                                        <div class="control">
                                            <input class="input is-small" value={this.state.inputBidAmount} 
                                                    onChange={this.updateInputAmount} type="text" 
                                                    disabled={!this.state.isBidder}
                                                    placeholder="Enter amount in USD"></input>
                                        </div>
                                        
                                        <button class="button is-black is-small is-pulled-right" 
                                                disabled={!this.state.isEnabled} 
                                                onClick={this.placeBid}
                                                style={{marginTop : 8}}
                                                >Place Bid</button>
                                        </div>
                                    </div>
                </div>
            </div>
        )
    }
}

export default BidDetails