import React from 'react'
import 'bulma'
import ListingItem from './listingItem'
import * as firebase from "firebase";
import config from '../../config/config.json'

class Listings extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            swopRefNos : [],
            ticketDetails : [],
            auctionDetails : [],
            merged : [],
            isLoading : false
        }

        this.displayList = this.displayList.bind(this)

        firebase.initializeApp(config.firebaseConfig);
        this.database = firebase.database()
    }

    componentDidMount(){
        this.setState({ isLoading : true })
        this.loadList()
    }

    loadList(){
        let address = sessionStorage.getItem('selectedAddress')
        let listingsRef = this.database.ref(`listings/${address}`)

        listingsRef.once('value', snapshot => {
            let keys = []
            snapshot.forEach(childSnapshot => {
                keys.push(childSnapshot.key)
            })

            this.setState({ swopRefNos : keys})
            this.getTicketDetails()
        });
    }

    getTicketDetails(){
        let ticketDetails = []
        this.state.swopRefNos.forEach(swopRefNo => {
            let ticketRef = this.database.ref(`tickets/${swopRefNo}`)
            ticketRef.once('value', snapshot => {
                let details = snapshot.val()
                
                if(details !== null){
                    details['swopRefNo'] = swopRefNo
                    ticketDetails.push(details)
                    this.setState({ticketDetails : ticketDetails})
                }
            })
        })
        this.setState({isLoading : false})
    }


    displayList(){
        const listItems = this.state.ticketDetails.map((data) => 
                    <li>
                        <ListingItem flightDetails={data} database={this.database}/>
                    </li>)
        return (
            <ul>
                { listItems }
            </ul>
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
                <p class="title has-text-weight-light">Your Listings</p>
                <div class="tabs is-medium">
                <ul>
                    <li class="is-active is-5 has-text-weight-light"><a>Active</a></li>
                    <li class="is-5 has-text-weight-light"><a>Closed</a></li>
                    <li class="is-5 has-text-weight-light"><a>Cancelled</a></li>
                </ul>
                </div>
                { this.state.isLoading ? this.showLoading() : this.displayList() }
               
            </div>
        )
    }
}

export default Listings