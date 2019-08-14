import React from 'react'
import 'bulma'
import Recommendations from '../recommendations'
import ExpiringTickets from '../../mock/getRecommendations.json'
import * as firebase from "firebase";
import config from '../../config/config.json'

class Home extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            tickets : ExpiringTickets,
            isLoading : false
        }

        this.displayRecommendations = this.displayRecommendations.bind(this)
        this.showLoading = this.showLoading.bind(this)
        firebase.initializeApp(config.firebaseConfig);
        this.database = firebase.database()
    }

    componentDidMount(){
        this.loadAndListen()
        this.setState({isLoading : true})
    }

    loadAndListen(){
        let ticketsRef = this.database.ref('tickets').orderByChild('createdAt')
        let ticketsList = []

        ticketsRef.once('value', snapshot => {
            console.log(snapshot.val())
        
            snapshot.forEach(childSnapshot => {
                let childKey = childSnapshot.key
                let childData = childSnapshot.val()

                childData['swopRefNo'] = childKey
                ticketsList.push(childData)
              
            })
    
            this.setState({ tickets : ticketsList.reverse(), isLoading : false })
        });

    }

    displayRecommendations(){
        return (
            <div>
                <Recommendations title = "Swop before they expire" list = { this.state.tickets }  /> 
                <Recommendations title = "Active auctions" list = { this.state.tickets }/>
            </div>
        )
    }

    showLoading(){
        return (
            <div>
                <p>Loading...</p> 
            </div>
        )
    }

    render() {
        return (
            <div>
                { this.state.isLoading ? this.showLoading() : this.displayRecommendations() }
            </div>
        )
    }
}

export default Home