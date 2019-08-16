import React from 'react'
import 'bulma'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import EthConverter from '../../utils/converter'

class CardView extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            data : props.data
        }

        this.ethConverter = new EthConverter()
    }

    render() {
        return (
            <div class="card" style={{width: 280, margin : 10}}>
                <div class="card-image">
                    <figure class="image">
                        <img src={ this.props.image }></img>
                    </figure>
                </div>
                <div class="card-content">
                    <p class="title has-text-weight-light">
                    {/* <FontAwesomeIcon icon={faCoffee} /> */}
                        to {this.state.data.depart.destination}
                    </p>
                    <p class="is-size-4 has-text-weight-light">
                        ${this.state.data.amount} 
                    </p>
                    <p class="is-size-6 has-text-weight-light">
                        {this.ethConverter.usdToEth(this.state.data.amount)} ETH
                    </p>
                    <br></br>
                    <p class="is-size-6 has-text-weight-light">
                        {this.state.data.depart.departureDateTime}
                    </p>
                    <p class="is-size-6 has-text-weight-light">
                        {this.state.data.return.departureDateTime}
                    </p>
                    <p class="is-size-6 has-text-weight-light">
                        {this.state.data.airline}
                    </p>
                </div>

                <footer class="card-footer">
                <a href={`/details/${this.state.data.swopRefNo}`} class="card-footer-item is-7">View</a>
                </footer>
          </div>
        )
    }
}

export default CardView