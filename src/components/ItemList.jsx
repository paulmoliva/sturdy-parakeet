import React from 'react';
import { Fetch } from 'react-request';
import Masonry from 'react-masonry-component';
import { Icon } from 'antd';
import Constants from '../constants'
 
const masonryOptions = {
  transitionDuration: 2
};

export default class ItemList extends React.Component {
state = { loading: true }

  render() {
    return (
      <Fetch url={Constants.url()}>
        {({ fetching, failed, data }) => {
          if (fetching) {
            return <div>Loading data...</div>;
          }
 
          if (failed) {
            return <div>The request did not succeed.</div>;
          }
 
          if (data) {
            if (this.state.loading) {
              this.props.setItems(data.data)
              this.setState({ loading: false })
            }
            return (
              <Masonry
                className={'my-gallery-class'} // default ''
                elementType={'ul'} // default 'div'
                options={masonryOptions} // default {}
                disableImagesLoaded={false} // default false
                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
              >
                  {data.data.map(item => {
                    return (
                      <li className="shop-item">
                        {item.name}
                        <br />
                        <img src="https://via.placeholder.com/150" />
                        <br/>
                        Random Text
                        <br/>
                        <Icon type="plus" onClick={() => this.props.addItem(item)} /> Buy Me
                      </li>
                    )
                  })}
              </Masonry>
            );
          }
 
          return null;
        }}
      </Fetch>
    )
  }
}