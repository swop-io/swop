import React from 'react'
import 'bulma'
import DummyImage from '../../images/3.png'

class CardView extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            data : props.data
        }

    }

    render() {
        return (
            <div class="card" style={{width: 200, margin : 10}}>
            <div class="card-image">
              <figure class="image">
                <img src={ DummyImage }></img>
              </figure>
            </div>
            <div class="card-content">
            <p>
                {this.state.data.destination}
            </p>
            <p class="is-size-7">
                {this.state.data.departureDateTime}
            </p>
            <p class="is-size-7">
                {this.state.data.returnDateTime}
            </p>
            <p class="is-size-7">
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