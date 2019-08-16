import React from 'react'
import 'bulma'
import CardView from '../recommendations/card.js'
import Image2 from '../../images/2.png'
import Image3 from '../../images/3.png'
import Image4 from '../../images/4.png'
import Image5 from '../../images/5.png'

class Recommendations extends React.Component {

    constructor(props){
        super(props)
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

                <li><CardView data = {this.state.list[0]} image= {Image2}/></li>
                <li><CardView data = {this.state.list[1]} image= {Image3}/></li>
                <li><CardView data ={this.state.list[2]} image= {Image4}/></li>
                <li><CardView data = {this.state.list[3]} image= {Image5}/></li>
                </ul>

        
                <a class="has-text-right" href="" >See all</a>

                
            </div>
        )
    }
}

export default Recommendations