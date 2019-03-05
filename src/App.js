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

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeCodex = this.handleChangeCodex.bind(this)
    this.handleChangeInstitution = this.handleChangeInstitution.bind(this)
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
      searchInstitution: "",
      data: [],
      surfaceid: "",
      targetLabel: "",
      itemsPerPage: 5,
      institutions: []

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
  handleChangeInstitution(event) {
    const searchInstitution = event.target.value
    this.setState({searchInstitution: searchInstitution});
  };
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
    console.log("next url", url)
    Axios.get(url)
      .then(({ data })=> {
        console.log("data from next url", data)

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
            console.log("codex", codex, "newDataArray", newDataArray)
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
    let parameters = "?page=1&q=" + this.state.searchText
    console.log("params1", parameters)
    if (this.state.searchInstitution){ parameters = parameters + "&institution=" + this.state.searchInstitution}
    if (this.state.searchCodex) { parameters = parameters + "&codex=" + this.state.searchCodex}
    console.log("params2", parameters)
    this.triggerSearch("http://localhost:8080/exist/apps/scta-app/iiifsearch-with-paging-line-level-from-simpleXmlCoordinates2.xq" + parameters);
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
  componentWillMount(){
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
              console.log("codices", codices)
              _this.setState({codices: codices})
            })
            .catch((err)=> {
              console.log(err)
            });

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
      if (this.state.institutions){
        const institutions = this.state.institutions.map((i) => {
          return <MenuItem value={i.institutionShortId}>{i.institutionTitle}</MenuItem>
        })
        return institutions
      }

    }
    const getCodexMenuItems = () => {
      if (this.state.codices){
        const codices = this.state.codices.map((c) => {
          return <MenuItem value={c.codexShortId}>{c.codexTitle}</MenuItem>
        })
        return codices
      }

    }
    return (
      <div className="App">
        <AppBar position="fixed" color="primary">

          <Toolbar block={false}>
          <Typography variant="h6" color="inherit">
            Paleographinator
          </Typography>

          <form onSubmit={this.handleSubmit} id="input-form">

              <InputLabel htmlFor="queryString">Search Term</InputLabel>

              <TextField id="queryString"  onChange={this.handleChange} value={this.state.searchText} placeholder="search for word here"></TextField>

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
                <MenuItem value="">Select</MenuItem>
                {getCodexMenuItems()}


                </Select>

            <InputLabel htmlFor="institutions">Institutions</InputLabel>
              <Select
                value={this.state.searchInstitution}
                onChange={this.handleChangeInstitution}
                inputProps={{
                  institution: 'institution',
                  id: 'institution',
                }}
                >
                <MenuItem value="">Select</MenuItem>
              {getInstitutionMenuItems()}

              </Select>



            <Button onClick={this.handleSubmit} type="submit"><Icon color="secondary">send</Icon></Button>
          </form>
          </Toolbar>
        </AppBar>

        <div className="wrapper">
          <div className="searchResults">

            {getImageTextWrappers()}
          </div>
          <div className="surfaceResults">
            {this.state.surfaceid && <Surface key={this.state.surfaceid} surfaceid={this.state.surfaceid} targetLabel={this.state.targetLabel}/>}
          </div>
        </div>
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
