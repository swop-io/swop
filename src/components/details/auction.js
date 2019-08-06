import React from 'react'
import 'bulma'

class AuctionSetup extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            hasAccountSetup : props.hasAccountSetup
        }

    }
    render() {
        return (
            <div>
                {
                    !this.state.hasAccountSetup ?

                    <div>
                <p>Import Wallet </p>
                <div class="field">
                <p class="control has-icons-left has-icons-right">
                    <input class="input" placeholder="Enter private key"></input>
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
                    <input class="input" type="password" placeholder="Password"></input>
                    <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                    </span>
                </p>
                </div>
                <div class="field">
                <p class="control">
                    <button class="button is-black is-fullwidth">
                    Import
                    </button>
                </p>
                </div>
                </div>
                    :

<div>
                    Account already setup
</div>
                }
                

                
            </div>

        )
    }
}

export default AuctionSetup