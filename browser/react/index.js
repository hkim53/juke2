// npm stimport React from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/AppContainer';
import {Route, Router, hashHistory, Link, IndexRedirect} from 'react-router';

import Album from './components/Album';
import Albums from './components/Albums';
import Artists from './components/Artists';
import Artist from './components/Artist';
import Songs from './components/Songs';



ReactDOM.render(
  <Router history={hashHistory}>
    <Route path='/' component = {AppContainer}>
      <IndexRedirect to="/albums"/>
      <Route path="albums/:albumId" component = {Album} />
      <Route path = 'albums' component = {Albums} />
      <Route path="artists" component = {Artists} />
      <Route path="artists/:artistId" component = {Artist}>
        <Route path='songs' component = {Songs}/>
        <Route path='albums' component = {Albums}/>
      </Route>
    </Route>
  </Router>,
  document.getElementById('app')
)
