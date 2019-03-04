import React, { Component } from 'react';

class Text extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ""
    }
  }
  render() {
    return (
      <div className="text">
       <span dangerouslySetInnerHTML={{__html: this.props.text}} />
      </div>
    );
  }
}

export default Text;
