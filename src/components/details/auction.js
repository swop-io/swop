import React from 'react'
import 'bulma'
import Constants from '../../utils/constants'
import Deposit from './deposit'
import { keccak512 } from 'js-sha3';
import CryptoJS from 'crypto-js';
import BlockchainClient from '../../data/blockchain/index'

class AuctionSetup extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            hasAccountSetup : props.hasAccountSetup,
            inputPK : '',
            inputPW : ''
        }

        this.storeWallet = this.storeWallet.bind(this)
        this.updateInputPK = this.updateInputPK.bind(this)
        this.updateInputPW = this.updateInputPW.bind(this)
        this.blockchainClient = new BlockchainClient()
    }

    updateInputPK(e){
        this.setState({inputPK : e.target.value})
    }

    updateInputPW(e){
        this.setState({inputPW : e.target.value})
    }

    storeWallet(){
        this.blockchainClient.enableTorus()
        // if(typeof(Storage) !== "undefined"){

        //     const hashKey = keccak512(this.state.inputPW)
        //     const encryptedPK = CryptoJS.AES.encrypt(this.state.inputPK, hashKey);

        //     localStorage.setItem(Constants.LS_KEY_PK, encryptedPK)
        //     localStorage.setItem(Constants.LS_KEY_PASSWORD, hashKey)
        //     this.setState({hasAccountSetup : true})
        // }else{
        //     console.log('browser not support web storage')
        // }
    }

    render() {
        return (
            <div>
                {
                    !this.state.hasAccountSetup ?

                    <div>
                        <p>Import Wallet </p>
                        {/* <div class="field">
                        <p class="control has-icons-left has-icons-right">
                            <input class="input" onChange={this.updateInputPK} placeholder="Enter private key" required></input>
                            <span class="icon is-small is-left">
                            <i class="fas fa-envelope"></i>
                            </span>
                            <span class="icon is-small is-right">
                            <i class="fas fa-check"></i>
                            </span>
                        </p>
                        </div>
                        <div class="field">
                        <p class="control has-icons-left">
                            <input class="input" type="password" onChange={this.updateInputPW} placeholder="Password" required></input>
                            <span class="icon is-small is-left">
                            <i class="fas fa-lock"></i>
                            </span>
                        </p>
                        </div> */}
                        <div class="field">
                        <p class="control">
                            <button class="button is-black is-fullwidth" onClick={this.storeWallet}>
                            Import
                            </button>
                        </p>
                        </div>
                    </div>
                            :

                        <div>
                                Account already setup
                                <hr></hr>
                                <Deposit swopRefNo={this.props.swopRefNo}/> 
                        </div>
                }
                

                
            </div>

        )
    }
}

export default AuctionSetup