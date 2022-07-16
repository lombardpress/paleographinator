import React, { Component } from 'react';
import Qs from "query-string"

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
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {packageData} from './Utils.js'


import Axios from 'axios';

import ImageTextWrapper from './ImageTextWrapper';
import Surface from './Surface';
import About from './About';

class App extends Component {
  constructor(props) {
    super(props);
    this.retrieveInfo = this.retrieveInfo.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeCodex = this.handleChangeCodex.bind(this)
    this.handleChangeInstitution = this.handleChangeInstitution.bind(this)
    this.handleChangeAfterDate = this.handleChangeAfterDate.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.handlePrevious = this.handlePrevious.bind(this)
    this.handleFirst = this.handleFirst.bind(this)
    this.handleLast = this.handleLast.bind(this)
    this.triggerSearch = this.triggerSearch.bind(this)
    this.handleShowSurface = this.handleShowSurface.bind(this)
    this.handleHideSurface = this.handleHideSurface.bind(this)
    this.handleChangeCodexType = this.handleChangeCodexType.bind(this)

    this.state = {
      searchText: "",
      searchCodex: "",
      searchLine: "",
      searchSurface: "",
      searchInstitution: "",
      data: [],
      surfaceid: "",
      targetLabel: "",
      itemsPerPage: 5,
      institutions: [],
      aboutView: false,
      afterDate: "",
      codexType: ""

    }
  }
  handleChange(event) {

    const inputText = event.target.value
    this.setState({searchText: inputText});
  };
  handleChangeCodex(event) {
    const searchCodex = event.target.value
    this.setState({searchCodex: searchCodex, searchInstitution: "", afterDate: ""});
  };
  handleChangeInstitution(event) {
    const searchInstitution = event.target.value
    this.setState({searchInstitution: searchInstitution, searchCodex: "", afterDate: ""});
  };
  handleChangeAfterDate(event) {
    const afterDate = event.target.value
    this.setState({afterDate: afterDate, searchInstitution: "", searchCodex: ""});
  };
  handleChangeCodexType(event){
    const codexType = event.target.value
    this.setState({codexType: codexType});
  }
  triggerSearch(url){
    Axios.get(url)
      .then(({ data })=> {
        let newData = []
        if (data.constructor === Array){
          newData = data.map((d) => {
            return packageData(d, this.state.itemsPerPage)
            });
          }
        else{
          newData = [packageData(data, this.state.itemsPerPage)]
        }
        this.setState({
          data: newData
        });
        })
      .catch((err)=> {
        console.log(err)
      });
  }

  updateSearch(url, codex){
    Axios.get(url)
      .then(({ data })=> {
        const newData = packageData(data, this.state.itemsPerPage)

          this.setState((prevState) => {
            const newDataArray = prevState.data.map((d) => {
              if (d.codex === codex){
                return newData
              }
              else {
                return d
              }
            })
            return{
              data: newDataArray
            }
          });
        })
        .catch((err)=> {
          console.log(err)
        });
      }
  handleSubmit(e){
    e.preventDefault()
    this.retrieveInfo()
  }
  retrieveInfo(){
    let parameters = "?page=1&q=" + this.state.searchText
    if (this.state.searchInstitution){ parameters = parameters + "&institution=" + this.state.searchInstitution}
    if (this.state.searchCodex) { parameters = parameters + "&codex=" + this.state.searchCodex}
    if (this.state.codexType) { parameters = parameters + "&codexType=" + this.state.codexType}
    if (this.state.afterDate) { parameters = parameters + "&afterDate=" + this.state.afterDate}
    if (this.state.searchSurface) { parameters = parameters + "&searchSurface=" + this.state.searchSurface}
    if (this.state.searchLine) { parameters = parameters + "&searchLine=" + this.state.searchLine}
     // const searchUrl = "http://localhost:8080/exist/apps/scta-app/iiifsearch-with-paging-line-level-from-simpleXmlCoordinates2.xq"
    const searchUrl = "https://exist.scta.info/exist/apps/scta-app/iiifsearch-with-paging-line-level-from-simpleXmlCoordinates2.xq"
    this.triggerSearch(searchUrl + parameters);
    // if (this.state.searchCodex)
    //   {this.triggerSearch("http://localhost:8080/exist/apps/scta-app/iiifsearch-with-paging-line-level-from-simpleXmlCoordinates.xq?page=1&q=" + this.state.searchText + "&codex=" + this.state.searchCodex);
    // }
    // else{
    //   this.triggerSearch("http://localhost:8080/exist/apps/scta-app/iiifsearch-with-paging-line-level-from-simpleXmlCoordinates2.xq?page=1&q=" + this.state.searchText + "&codex=" + this.state.searchCodex);
    // }
  }
  handleNext(codex){
    const target = this.state.data.find((c) => c.codex === codex)
    this.updateSearch(target.next, codex);
  }
  handlePrevious(codex){
    // this.triggerSearch(this.state.prev + "&codex=" + this.state.searchCodex);
    const target = this.state.data.find((c) => c.codex === codex)
    this.updateSearch(target.prev, codex);
  }
  handleFirst(codex){
    //this.triggerSearch(this.state.first + "&codex=" + this.state.searchCodex);
    const target = this.state.data.find((c) => c.codex === codex)
    this.updateSearch(target.first, codex);
  }
  handleLast(codex){
    //this.triggerSearch(this.state.last + "&codex=" + this.state.searchCodex);
    const target = this.state.data.find((c) => c.codex === codex)
    this.updateSearch(target.last, codex);
  }
  handleShowSurface(surfaceid, label){
    this.setState({surfaceid: surfaceid, targetLabel: label});
  }
  handleHideSurface(surfaceid, label){
    this.setState({surfaceid: "", targetLabel: ""});
  }
  componentWillMount(){
    if (this.props.location.search){
      this.setState((prevState) => {
        return {
          searchText: Qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).searchText,
          searchCodex: Qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).searchCodex,
          searchSurface: Qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).searchSurface,
          searchLine: Qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).searchLine,
          searchInstitution: Qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).searchInstitution
        }
      }, () => {
        this.retrieveInfo()
      }
    )
    }

    // after setting state perform query
      const _this = this;
      const sparqlEndpoint = "https://sparql-docker.scta.info/ds/query"
      const query = [
          "SELECT DISTINCT ?institution ?institutionTitle  ",
          "WHERE { ",
          "?institution a <http://scta.info/resource/institution> .",
          "?institution <http://purl.org/dc/elements/1.1/title> ?institutionTitle .",
          "}",
          "ORDER BY ?institutionTitle"
        ].join('');

        Axios.get(sparqlEndpoint, {params: {"query" : query, "output": "json"}})
          .then(function(res){
            const institutions = res.data.results.bindings.map((i) => {
              return {
                institutionShortId: i.institution.value.split("/resource/")[1],
                institutionTitle: i.institutionTitle.value
              }
            });
            _this.setState({institutions: institutions})
          })
          .catch((err)=> {
            console.log(err)
          });

          const codexQuery = [
              "SELECT DISTINCT ?codex ?codexTitle  ",
              "WHERE { ",
              "?codex a <http://scta.info/resource/codex> .",
              "?codex <http://purl.org/dc/elements/1.1/title> ?codexTitle .",
              "}",
              "ORDER BY ?codexTitle"
            ].join('');

            Axios.get(sparqlEndpoint, {params: {"query" : codexQuery, "output": "json"}})
              .then(function(res){
                const codices = res.data.results.bindings.map((c) => {
                  return {
                    codexShortId: c.codex.value.split("/resource/")[1],
                    codexTitle: c.codexTitle.value
                  }
                });
                _this.setState({codices: codices})
              })
              .catch((err)=> {
                console.log(err)
              });


  }
  handleToggleAbout(){
    this.setState((prevState) => {
      return {
        aboutView: !prevState.aboutView
      }
    })
  }
  render() {
    const getImageTextWrappers = () => {
      const codexWrapper = this.state.data.map((codex, i) => {
        const wrappers = codex.data.map((h, i) => {
          const text = h.resource.chars;
          const canvas = h.on.split("#xywh=")[0];
          const canvasShort = canvas.split("/")[canvas.split("/").length - 1];
          const coords = h.on.split("#xywh=")[1];
          const imageUrl = h.imageUrl
          const label = h.label
          const lineNumberFromLabel = label.split("line: ")[1]
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
              lineNumber={lineNumberFromLabel}
              />
          )
        });
        return(
            <div key={codex.codex}>

              {
                <div className="paggerWrapper">
                <p>{codex.total} total results for codex {codex.label}</p>
                {codex.page > 2 && <Button onClick={() => {this.handleFirst(codex.codex)}}><Icon color="secondary">first_page</Icon></Button>}
                {codex.page > 1 && <Button onClick={() => {this.handlePrevious(codex.codex)}}><Icon color="secondary">navigate_before</Icon></Button>}
                <span>{!!codex.page && codex.page}</span>
                {codex.page < (codex.totalPages) && <Button onClick={() => {this.handleNext(codex.codex)}} aria-label="Next"><Icon color="secondary">navigate_next</Icon></Button>}
                {codex.page < (codex.totalPages - 1) && <Button onClick={() => {this.handleLast(codex.codex)}}><Icon color="secondary">last_page</Icon></Button>}
              </div>
              }
              <div>
              {wrappers}
              </div>
            </div>
          )
        });
        return codexWrapper

    }
    const getInstitutionMenuItems = () => {
      //temp include list to exclude scta codices without corresponding coords data.
      const includeList = ["I-i9ujd3", "I-pdn3as"]
      if (this.state.institutions){
        const institutions = this.state.institutions.map((i) => {
          if (includeList.includes(i.institutionShortId)){
            return <MenuItem key={i.codexShortId} value={i.institutionShortId}>{i.institutionTitle}</MenuItem>
          }
        })
        return institutions
      }

    }
    const getCodexMenuItems = () => {
      //temp include list to exclude scta codices without corresponding coords data.
      //const includeList = ["penn", "svict", "lon", "reims", "cod-yu78uh", "cod-xowk10", "penn855", "Lyon1518", "vatlat955", "tara", "vat", "pal", "sorb"]
      if (this.state.codices){
        const codices = this.state.codices.map((c) => {
        //  if (includeList.includes(c.codexShortId)){
            return <MenuItem key={c.codexShortId} value={c.codexShortId}>{c.codexTitle}</MenuItem>
          //}
        })
        return codices
      }

    }
    return (

      <div className="App">

        <AppBar position="fixed" color="primary">

          <Toolbar>
          <Typography variant="h6" color="inherit">
            Paleographinator
          </Typography>

          <form onSubmit={this.handleSubmit} id="input-form">

              <InputLabel htmlFor="queryString">Search Term</InputLabel>
              <TextField id="queryString"  onChange={this.handleChange} value={this.state.searchText} placeholder="search for word here"></TextField>
              <span style={{"padding": "0 5px"}}>|</span>
              <InputLabel htmlFor="queryAfterDate">After Date</InputLabel>
              <TextField id="queryAfterDate"  onChange={this.handleChangeAfterDate} value={this.state.afterDate} placeholder="1500"></TextField>
              <span style={{"padding": "0 5px"}}>|</span>
              <InputLabel htmlFor="codexType">Codex Type</InputLabel>
              <Select
                  value={this.state.codexType}
                  onChange={this.handleChangeCodexType}
                  placeholder="codexType"
                  >
                    <MenuItem key="blankCodex" value="">Select</MenuItem>
                    <MenuItem key="manuscript" value="http://scta.info/resource/codexTypeManuscript">Manuscript</MenuItem>
                    <MenuItem key="book" value="http://scta.info/resource/codexTypeBook">Print</MenuItem>
                    
              </Select>
              <span style={{"padding": "0 5px"}}>|</span>
              <InputLabel htmlFor="codices">Codices</InputLabel>
                <Select
                  value={this.state.searchCodex}
                  onChange={this.handleChangeCodex}
                  placeholder="restrict to codex"
                  inputProps={{
                    codex: 'codex',
                    id: 'codex',
                  }}
                  >
                <MenuItem key="blankCodex" value="">Select</MenuItem>
                {getCodexMenuItems()}


                </Select>
                <span style={{"padding": "0 5px"}}>|</span>
            <InputLabel htmlFor="institutions">Institutions</InputLabel>
              <Select
                value={this.state.searchInstitution}
                onChange={this.handleChangeInstitution}
                inputProps={{
                  institution: 'institution',
                  id: 'institution',
                }}
                >
                <MenuItem key="blankInstitutions" value="">Select</MenuItem>
              {getInstitutionMenuItems()}

              </Select>


              <span style={{"padding": "0 5px"}}>|</span>
            <Button onClick={this.handleSubmit} type="submit"><Icon color="secondary">send</Icon></Button>
          </form>
          <Button onClick={() => {this.handleToggleAbout()}}>{this.state.aboutView ? <span>Hide About</span> : <span>About</span>}</Button>
          </Toolbar>
        </AppBar>
        { this.state.aboutView ? <About/> :

        <div className="wrapper">
          <div className="searchResults">
            {getImageTextWrappers()}
          </div>
          {this.state.surfaceid &&
          <div className="surfaceResults">
             <Button id="hide-surface" onClick={this.handleHideSurface}>Hide</Button>
             <Surface key={this.state.surfaceid} surfaceid={this.state.surfaceid} targetLabel={this.state.targetLabel}/>
          </div>}
        </div>
      }
        <AppBar position="sticky" color="primary">
        <Toolbar id="footer-toolbar">
          <Link href="http://lombardpress.org" block={false} color="secondary">
            A LombardPress Publication
          </Link>
          <Link href="https://scta.info" block={false} color="secondary">
            Powered by SCTA Data
          </Link>
          <Link href="https://jeffreycwitt.com" block={false} color="secondary">
            Designed by Jeffrey C. Witt
          </Link>
          </Toolbar>
        </AppBar>
      </div>

    );
  }
}

export default App;
