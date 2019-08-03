import React from 'react'
import 'bulma'
import DummyImage from '../../images/3.png'

class CardView extends React.Component {

    render() {
        return (
            <div class="card" style={{width: 200, margin : 10}}>
            <div class="card-image">
              <figure class="image">
                <img src={ DummyImage }></img>
              </figure>
            </div>
            <div class="card-content">
            <p>
                Calgary
            </p>
            <p class="is-size-7">
              August 17, 2019 3:00 PM
            </p>
            <p class="is-size-7">
              August 20, 2019 5:00 PM
            </p>
            <p class="is-size-7">
              Air Canada
            </p>
              {/* <div class="media">
                <div class="media-left">
                  <figure class="image is-48x48">
                    <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image"></img>
                  </figure>
                </div>
                <div class="media-content">
                  <p class="title is-4">John Smith</p>
                  <p class="subtitle is-6">@johnsmith</p>
                </div>
              </div> */}
          
              <div class="content">
                {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                <a href="#">#css</a> <a href="#">#responsive</a>
                <br></br>
                <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time> */}
              </div>

            </div>
            <footer class="card-footer">
                <p class="card-footer-item subtitle">
                  $500 ( 2.01 ETH )
                </p>
            </footer>
          </div>
        )
    }
}

export default CardView