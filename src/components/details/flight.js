import React from 'react'
import 'bulma'

class FlightInfo extends React.Component {

    constructor(props){
        super(props)
        // arrivalDateTime: "August 17, 2019 6:00 PM",
        // departureDateTime: "August 17, 2019 3:00 PM",
        // destination: "New York",
        // destinationAirportCode: "JFK",
        // origin: "Toronto",
        // originAirportCode: "YYZ"
        this.state = { 
            title : props.title,
            data : props.data }
    }

    render() {
        return (
            <div>
                <p>{this.state.title}</p>
                    <article class="message is-small is-dark">
                        <div class="message-header">
                            <p>{this.state.data.flightDate}</p>
                            <span style={{float : 'right'}}>{this.state.data.origin} ({this.state.data.originAirportCode}) 
                                                - {this.state.data.destination}({this.state.data.destinationAirportCode})</span>
                            </div>
                            <div class="message-body">
                                <div class="level">
                                    <div class="level-item has-text-centered">
                                        <div>
                                        <p class="heading">{this.state.data.origin} ({this.state.data.originAirportCode})</p>
                                        <p class="title">{this.state.data.departureTime}</p>
                                        </div>
                                    </div>
                                    <div class="level-item has-text-centered">
                                        <div>
                                        <p class="heading">Non-stop (1h30m)</p>
                                        <p class="title">>>></p>
                                        </div>
                                    </div>
                                    <div class="level-item has-text-centered">
                                        <div>
                                        <p class="heading">{this.state.data.destination} ({this.state.data.destinationAirportCode})</p>
                                        <p class="title">{this.state.data.arrivalTime}</p>
                                        </div>
                                    </div>

                                </div>
                        </div>
                    </article>
            </div>
        )
    }
}

export default FlightInfo