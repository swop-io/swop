import React from 'react'
import 'bulma'

class BidHistory extends React.Component {


    render() {
        return (
            <div>
                <p>Bid History</p>
                        <table class="table is-fullwidth">
                            <thead>
                                <tr>
                                <th>User</th>
                                <th>Datetime</th>
                                <th>Amount (USD)</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>

                                <td>0xE5CDaa796A8A...</td>
                                <td>08/03/2019 - 20:00:00</td>
                                <td>200</td>
                                </tr>
                                <tr>
                                
                                <td>0xE5CDaa796A8A...</td>
                                <td>08/03/2019 - 20:00:00</td>
                                <td>180</td>
                                </tr>
                                <tr>
                                
                                    <td>0xE5CDaa796A8A...</td>
                                <td>08/03/2019 - 20:00:00</td>
                                <td>150</td>
                                </tr>
                                <tr>
                                
                                <td>0xE5CDaa796A8A...</td>
                                <td>08/03/2019 - 20:00:00</td>
                                <td>100</td>
                                </tr>


                            </tbody>
                        </table>
            </div>
        )
    }
}

export default BidHistory