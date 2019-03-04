import React, { Component } from 'react';
class Image extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ""
    }
  }
  render() {
    const imageLink = this.props.imageUrl + "/" + this.props.coords + "/" + this.props.displayWidth + ",/0/default.jpg"
    return (
      <img src={imageLink}/>
    );
  }
}

export default Image;
