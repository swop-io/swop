import React from 'react'
import 'bulma'
import ListingItem from './listingItem'
import BlockchainClient from '../../data/blockchain'

class Listings extends React.Component {

    constructor(props){
        super(props)
    }


    render() {
        return (
            <div>
                <p class="title is-5 has-text-weight-light">Your Listings</p>
                <div class="tabs is-medium">
                <ul>
                    <li class="is-active is-5 has-text-weight-light"><a>Active</a></li>
                    <li class="is-5 has-text-weight-light"><a>Closed</a></li>
                    <li class="is-5 has-text-weight-light"><a>Cancelled</a></li>
                </ul>
                </div>

                <ListingItem/>
                <ListingItem/>
                <ListingItem/>
            </div>
        )
    }
}

export default Listings