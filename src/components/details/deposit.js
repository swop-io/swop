import React from 'react'
import 'bulma'
import BlockchainClient from '../../data/blockchain'

class Deposit extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            depositAmount : 0
        }

        this.updateInputAmount = this.updateInputAmount.bind(this)
        this.deposit = this.deposit.bind(this)
        this.blockchain = new BlockchainClient()
    }


    async deposit(){
        let txHash = await this.blockchain.deposit(this.props.swopRefNo, this.state.depositAmount)
    }

    updateInputAmount(e){
        this.setState({depositAmount : e.target.value})
    }

    render() {
        return (
            <div>
                <form>
                <div class="field">
                    <p class="control has-icons-left">
                        <input class="input" onChange={this.updateInputAmount} placeholder="Enter amount to deposit"></input>
                        <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                        </span>
                    </p>
                    </div>
                    <div class="field">
                    <p class="control">
                        <button type="button" class="button is-black is-fullwidth"
                        onClick={this.deposit}>
                        Deposit
                        </button>
                    </p>
                </div>
                </form>
            </div>
        )
    }
}

export default Deposit