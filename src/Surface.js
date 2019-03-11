import React, { Component } from 'react';
import Axios from 'axios';
import Button from '@material-ui/core/Button';

import ImageTextWrapper from './ImageTextWrapper';

class Surface extends Component {
  constructor(props) {
    super(props);

    this.scrollToRef = this.scrollToRef.bind(this)
    this.scrollRef = React.createRef();
    this.state = {
      data: []
    }
  }
  scrollToRef(){
    console.log(this.scrollRef)
    //this.surfaceRef.scrollTo(0, this.scrollRef.current.offsetTop)
    //if (this.scrollRef.current.scrollIntoView){
      this.scrollRef.current.scrollIntoView(true)
    //}
    //this.boxRef.current.scrollIntoView();
  }
  componentDidMount(){
    const shortSurfaceId = this.props.surfaceid.split("/resource/")[1]
    const url = "https://exist.scta.info/exist/apps/scta-app/folio-annotaiton-list-from-simpleXmlCoordinates.xq?surfaceid=" + shortSurfaceId
    // const url = "http://localhost:8080/exist/apps/scta-app/folio-annotaiton-list-from-simpleXmlCoordinates.xq?surfaceid=" + shortSurfaceId
    Axios.get(url)
      .then(({ data })=> {
        this.setState({
          data: data.resources,
        });

      })
      .catch((err)=> {
        console.log(err)
      })
  }
  componentDidUpdate(){
    this.scrollToRef()
  }

  render() {
    const getImageTextWrappers = () => {
      const wrappers = this.state.data.map((h, i) => {
          const text = h.resource.chars;
          const canvas = h.on.split("#xywh=")[0];
          const canvasShort = canvas.split("/")[canvas.split("/").length - 1];
          const coords = h.on.split("#xywh=")[1];
          const imageUrl = h.imageUrl
          const label = h.label
          const match = label === this.props.targetLabel ? true : false
          return (
            <div ref={match && this.scrollRef}>
            <ImageTextWrapper key={i}
              imageUrl={imageUrl}
              canvas={canvas}
              coords={coords}
              canvasShort={canvasShort}
              text={text}
              label={label}
              targetLabel={this.props.targetLabel}
              surfaceButton={false}
              displayWidth="800"
              />
            </div>
          )
          });
          return wrappers
    }
    return (
      <div className="surface">
            <p>{this.props.surfaceid}</p>


            {getImageTextWrappers()}

      </div>
    );
  }
}

export default Surface;
