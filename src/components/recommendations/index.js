import React from 'react'
import 'bulma'
import CardView from '../recommendations/card.js'

class Recommendations extends React.Component {

    constructor(props){
        super(props)
    }
     
    render() {
        return (
            <div id="recommendations">
                <h1 class="subtitle">
                    {this.props.title}
                </h1>
                <ul>
                <li><CardView/></li>
                <li><CardView/></li>
                <li><CardView/></li>
                <li><CardView/></li>
                </ul>

        
                <a class="has-text-right" href="" >See all</a>

                
            </div>
        )
    }
}

export default Recommendations