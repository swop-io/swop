import React from 'react'
import 'bulma'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons'
import { faEthereum } from '@fortawesome/free-brands-svg-icons'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { faPlane } from '@fortawesome/free-solid-svg-icons'
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
                        to {this.state.data.depart.destination}
                    </p>
                    <p class="is-size-4 has-text-weight-bold">
                        <FontAwesomeIcon icon={faDollarSign}/> {this.state.data.amount} 
                    </p>
                    <p class="is-size-6 has-text-weight-light">
                        <FontAwesomeIcon icon={faEthereum} style={{marginRight : 5}}/> {this.ethConverter.usdToEth(this.state.data.amount)}
                    </p>
                    <br></br>
                    <p class="is-size-6 has-text-weight-light">
                        <FontAwesomeIcon icon={faPlaneDeparture} style={{marginRight : 10}} /> {this.state.data.depart.departureDateTime}
                    </p>
                    <p class="is-size-6 has-text-weight-light">
                        <FontAwesomeIcon icon={faPlane} style={{marginRight : 10}} /> {this.state.data.airline}
                    </p>
                </div>

                <footer class="card-footer">
                <a href={`/swop-ui/details/${this.state.data.swopRefNo}`} class="card-footer-item is-7">View</a>
                </footer>
          </div>
        )
    }
}

export default CardView