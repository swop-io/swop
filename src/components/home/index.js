import React from 'react'
import 'bulma'
import SwopLogo from '../../images/swop-logo.svg'
import Recommendations from '../recommendations'
import ExpiringTickets from '../../mock/getRecommendations.json'
import * as firebase from "firebase";
import config from '../../config/config.json'

class Home extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            expiring : ExpiringTickets,
            tickets : ExpiringTickets,
            isLoading : false
        }

        firebase.initializeApp(config.firebaseConfig);
        this.database = firebase.database()
    }

    componentDidMount(){
        this.loadAndListen()
        this.setState({isLoading : true})
    }

    loadAndListen(){
        let ticketsRef = this.database.ref('tickets').limitToLast(4)
        let ticketsList = []

        ticketsRef.once('value', snapshot => {
            console.log(snapshot.val())
         
            snapshot.forEach(childSnapshot => {
                let childKey = childSnapshot.key
                let childData = childSnapshot.val()

                childData['swopRefNo'] = childKey
                ticketsList.push(childData)
              
            })
    
            this.setState({ tickets : ticketsList, isLoading : false })
        });

    }

    render() {
        return (
            <div>
                { this.state.isLoading ? 
                
                <p>Loading...</p> : 
                // <p>DOne...</p>
                
                <Recommendations title = "Swop before they expire" list = { this.state.tickets }  /> 
                }
                
                <Recommendations title = "Active auctions" list = { this.state.tickets }/>
            </div>
        
        )
    }
}

export default Home