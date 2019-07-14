import React, { Component } from 'react';
import Image from './Image';
import Text from './Text';
import Label from './Label';

class ImageTextWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ""
    }
  }
  render() {
    const getClass = () => {
      if (this.props.targetLabel === this.props.label){
        return "target"
      }
    }
    return (
      <div className="ImageTextWrapper" className={getClass()}>
        <div className="labelImageWrapper">
        <Label label={this.props.label} handleShowSurface={this.props.handleShowSurface} surfaceid={this.props.surfaceid} surfaceButton={this.props.surfaceButton} lineNumber={this.props.lineNumber}/>
        <Image
          imageUrl={this.props.imageUrl}
          canvas={this.props.canvas}
          coords={this.props.coords}
          canvasShort={this.props.canvasShort}
          displayWidth={this.props.displayWidth}
          />
        </div>
        <Text text={this.props.text}/>
        
      </div>
    );
  }
}

export default ImageTextWrapper;
