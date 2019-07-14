import React, { Component } from 'react';
import Axios from 'axios';
import Button from '@material-ui/core/Button';

import Qs from "query-string"
import ImageTextWrapper from './ImageTextWrapper';

class Surface extends Component {
  constructor(props) {
    super(props);

    this.scrollToRef = this.scrollToRef.bind(this)
    this.scrollRef = React.createRef();
    this.state = {
      data: [],
      focusedLineNumber: undefined
    }
  }
  scrollToRef(){
    console.log(this.scrollRef)
    //this.surfaceRef.scrollTo(0, this.scrollRef.current.offsetTop)
    //if (this.scrollRef.current.scrollIntoView){
      //this.scrollRef.current.scrollIntoView(true)
    //}
    //this.boxRef.current.scrollIntoView();
  }
  componentDidMount(){
    let shortSurfaceId = ""
    let shortLineIdSlug = ""
    if (this.props.surfaceid){
      shortSurfaceId = this.props.surfaceid.split("/resource/")[1]
      shortLineIdSlug = ""
    }
    else if (Qs.parse(this.props.location.search)){
      const shortLineId = Qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).lineid.split("/resource/")[1]
      const shortCodexId = shortLineId.split("/")[0]
      const shortSurfaceIdSlug = shortLineId.split("/")[1]
      shortLineIdSlug = shortLineId.split("/")[2]
      shortSurfaceId = shortCodexId + "/" + shortSurfaceIdSlug
      console.log("surfaceid", shortSurfaceId)
    }
    else{
      shortSurfaceId = ""
      shortLineIdSlug = ""
    }



    const url = "https://exist.scta.info/exist/apps/scta-app/folio-annotaiton-list-from-simpleXmlCoordinates.xq?surfaceid=" + shortSurfaceId
    // const url = "http://localhost:8080/exist/apps/scta-app/folio-annotaiton-list-from-simpleXmlCoordinates.xq?surfaceid=" + shortSurfaceId
    Axios.get(url)
      .then(({ data })=> {
        console.log('data', data)
        this.setState({
          data: data.resources,
          focusedLineNumber: parseInt(shortLineIdSlug)
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
        const lineNumberFromLabel = label.split("line: ")[1]
        const match = this.props.targetLabel ? true : false
        if (this.state.focusedLineNumber === (i + 1) || !this.state.focusedLineNumber){
        return (
            <div ref={match && this.scrollRef}>
            <ImageTextWrapper key={i}
              imageUrl={imageUrl}
              canvas={canvas}
              coords={coords}
              canvasShort={canvasShort}
              text={text}
              label={label}
              targetLabel={this.props.targetLabel  ? this.props.targetLabel : Qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).targetLabel}
              surfaceButton={false}
              displayWidth="800"
              lineNumber={lineNumberFromLabel}
              surfaceid={this.props.surfaceid}
              />
            </div>
          )
        }
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
