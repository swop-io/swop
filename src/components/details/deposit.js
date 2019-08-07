import React from 'react'
import 'bulma'

class Deposit extends React.Component {

    render() {
        return (
            <div>
                <form>
                <div class="field">
                    <p class="control has-icons-left">
                        <input class="input" placeholder="Enter amount to deposit"></input>
                        <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                        </span>
                    </p>
                    </div>
                    <div class="field">
                    <p class="control">
                        <button class="button is-black is-fullwidth">
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