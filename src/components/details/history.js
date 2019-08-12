import React from 'react'
import 'bulma'
import * as firebase from "firebase";
import config from '../../config/config.json'

class BidHistory extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            bids : null
        }

        // Initialize Firebase
        firebase.initializeApp(config.firebaseConfig);
        this.database = firebase.database()

    }

    componentDidMount(){
        this.loadAndListen()
    }

    loadAndListen(){
        let bidRef = this.database.ref(`bids/${this.props.swopRefNo}`)
        bidRef.on('value', snapshot => {
            console.log(snapshot.val())
            this.setState({bids : snapshot.val()})
        });
    }

    createRow(row){
        return (
            <tr>
                <td key={row.user}>{row.user.substring(0,10)}...{row.user.substring(row.user.length - 4)}</td>
                <td key={row.datetime}>{row.datetime}</td>
                <td key={row.amount}>{row.amount}</td>
            </tr>
        )
    }

    createTable(data){
        return (
            <table class="table is-fullwidth">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Datetime</th>
                            <th>Amount (USD)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.reverse().map(row => {
                                return this.createRow(row)
                            })
                        }
                    </tbody>
            </table>
        )
    }

    displayLatestBids(){
        if(this.state.bids === null){
            return <div>No Bids</div>
        }else {
            return this.createTable(this.state.bids)
        }
    }
    render() {
        return (
            <div>
                <p>Bid History</p>
                { this.displayLatestBids() }
            </div>
        )
    }
}

export default BidHistory