import React, { Component } from 'react';

import {HashRouter, Route, Switch} from 'react-router-dom';
import App from './App';
import Surface from './Surface';

class AppWrapper extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <HashRouter forceRefresh={false}>
        <Switch>
          <Route path="/" exact={true} component={App}/>
          <Route path="/surface" exact={true} component={Surface}/>
        </Switch>
      </HashRouter>
    )
  }
}

export default AppWrapper;
