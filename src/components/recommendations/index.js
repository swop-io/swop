import React from 'react'
import 'bulma'
import CardView from '../recommendations/card.js'

class Recommendations extends React.Component {

    constructor(props){
        super(props)
        console.log(props.list)
        this.state = {
            list : props.list
        }
    }
     
    render() {
        return (
            <div id="recommendations" style={{marginBottom : 30}}>
                <h1 class="title has-text-weight-light">
                    {this.props.title}
                </h1>
                <ul>

                <li><CardView data={this.state.list[0]}/></li>
                <li><CardView data={this.state.list[1]}/></li>
                <li><CardView data={this.state.list[2]}/></li>
                <li><CardView data={this.state.list[3]}/></li>
                </ul>

        
                <a class="has-text-right" href="" >See all</a>

                
            </div>
        )
    }
}

export default Recommendations