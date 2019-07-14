import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
class Image extends Component {
  constructor(props) {
    super(props);
    this.handleShareLink = this.handleShareLink.bind(this)
    this.state = {
      searchText: ""
    }
  }
  handleShareLink(e){
    window.location.assign("#/surface?lineid=" + this.props.surfaceid + "/" + this.props.lineNumber)
  }
  render() {
    return (
      <p className="label">
        {this.props.label}
        {this.props.surfaceButton && <Button onClick={() => {this.props.handleShowSurface(this.props.surfaceid, this.props.label)}}><Icon>pageview</Icon></Button>}
        <Button onClick={this.handleShareLink}><Icon>share</Icon></Button>
      </p>
    );
  }
}

export default Image;
