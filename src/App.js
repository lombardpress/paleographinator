import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'typeface-roboto'
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


import Axios from 'axios';

import ImageTextWrapper from './ImageTextWrapper';
import Surface from './Surface';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeCodex = this.handleChangeCodex.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.handlePrevious = this.handlePrevious.bind(this)
    this.handleFirst = this.handleFirst.bind(this)
    this.handleLast = this.handleLast.bind(this)
    this.triggerSearch = this.triggerSearch.bind(this)
    this.handleShowSurface = this.handleShowSurface.bind(this)
    this.state = {
      searchText: "",
      searchCodex: "",
      data: [],
      surfaceid: "",
      targetLabel: ""

    }
  }
  handleChange(event) {

    const inputText = event.target.value
    this.setState({searchText: inputText});
  };
  handleChangeCodex(event) {
    const searchCodex = event.target.value
    this.setState({searchCodex: searchCodex});
  };
  triggerSearch(url){
    console.log(url)
    //$.getJSON(, function( data ){
    Axios.get(url)
      .then(({ data })=> {
        this.setState({
          data: data.resources,
          next: data.next,
          prev: data.prev,
          total: data.within.total,
          first: data.within.first,
          last: data.within.last,
          index: data.startIndex,
          page: Math.ceil(data.startIndex / 10) + 1,
          totalPages: Math.ceil(data.within.total / 10),

        });
      })
      .catch((err)=> {
        console.log(err)
      })
  }
  handleSubmit(){
    this.triggerSearch("http://localhost:8080/exist/apps/scta-app/iiifsearch-with-paging-line-level-from-simpleXmlCoordinates.xq?page=1&q=" + this.state.searchText + "&codex=" + this.state.searchCodex);
  }
  handleNext(){
    this.triggerSearch(this.state.next + "&codex=" + this.state.searchCodex);
  }
  handlePrevious(){
    this.triggerSearch(this.state.prev + "&codex=" + this.state.searchCodex);
  }
  handleFirst(){
    this.triggerSearch(this.state.first + "&codex=" + this.state.searchCodex);
  }
  handleLast(){
    this.triggerSearch(this.state.last + "&codex=" + this.state.searchCodex);
  }
  handleShowSurface(surfaceid, label){
    this.setState({surfaceid: surfaceid, targetLabel: label});
  }
  componentDidUpdate(){
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
          const surfaceid = h.surfaceId
          return (
            <ImageTextWrapper key={i}
              imageUrl={imageUrl}
              canvas={canvas}
              coords={coords}
              canvasShort={canvasShort}
              text={text}
              label={label}
              surfaceid={surfaceid}
              handleShowSurface={this.handleShowSurface}
              surfaceButton={true}
              displayWidth="800"
              />
          )
          });
          return wrappers
    }
    return (
      <div className="App">
        <AppBar position="fixed" color="primary">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Paleographinator
            </Typography>
            <div className="search">
              <TextField id="queryString" onChange={this.handleChange} value={this.state.searchText} placeholder="search for word here"></TextField>
              <Button onClick={this.handleSubmit}><Icon color="secondary">send</Icon></Button>
            </div>
            <div className="codex">
              <TextField id="queryString" onChange={this.handleChangeCodex} value={this.state.codex} placeholder="restrict to codex"></TextField>
            </div>
          </Toolbar>

        </AppBar>
        <div className="wrapper">
          <div className="searchResults">
            <div className="paggerWrapper">
              {this.state.page > 2 && <Button onClick={this.handleFirst}><Icon color="secondary">first_page</Icon></Button>}
              {this.state.page > 1 && <Button onClick={this.handlePrevious}><Icon color="secondary">navigate_before</Icon></Button>}
              <span>{!!this.state.page && this.state.page}</span>
              {this.state.page < (this.state.totalPages) && <Button onClick={this.handleNext} aria-label="Next"><Icon color="secondary">navigate_next</Icon></Button>}
              {this.state.page < (this.state.totalPages - 1) && <Button onClick={this.handleLast}><Icon color="secondary">last_page</Icon></Button>}
            </div>
            {getImageTextWrappers()}
          </div>
          <div className="surfaceResults">
            {this.state.surfaceid && <Surface key={this.state.surfaceid} surfaceid={this.state.surfaceid} targetLabel={this.state.targetLabel}/>}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
