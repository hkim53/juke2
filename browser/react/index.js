import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/AppContainer';
import {Route, Router, hashHistory, Link} from 'react-router';
import Album from './components/Album';
import Albums from './components/Albums';

// ReactDOM.render(
//   <AppContainer />,
//   document.getElementById('app')
// );
ReactDOM.render(
  <Router history={hashHistory}>
    <Route path='/' component = {AppContainer}>
      <Route path = 'album' component = {Album}/>
      <Route path = 'albums' component = {Albums}/>
    </Route>
  </Router>,
  document.getElementById('app')
)
