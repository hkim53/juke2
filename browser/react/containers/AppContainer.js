import React, { Component } from 'react';
import axios from 'axios';

import initialState from '../initialState';
import AUDIO from '../audio';
// audio is an element

import Albums from '../components/Albums.js';
import Album from '../components/Album.js';
import Sidebar from '../components/Sidebar';
import Player from '../components/Player';

import { convertAlbum, convertAlbums, skip } from '../utils';

export default class AppContainer extends Component {

  constructor (props) {
    super(props);
    this.state = initialState;
    // album, selected album, current song, current song list, isPlaying, progress for progress bar

    this.toggle = this.toggle.bind(this);
    this.toggleOne = this.toggleOne.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.selectAlbum = this.selectAlbum.bind(this);
    this.deselectAlbum = this.deselectAlbum.bind(this);
  }

  componentDidMount () {
    axios.get('/api/albums/')
      .then(res => res.data)
      .then(album => this.onLoad(convertAlbums(album)));

    AUDIO.addEventListener('ended', () =>
      this.next());
    AUDIO.addEventListener('timeupdate', () =>
      this.setProgress(AUDIO.currentTime / AUDIO.duration));
  }

  onLoad (albums) {
    this.setState({
      albums: albums
    });
  }

  play () {
    AUDIO.play();
    this.setState({ isPlaying: true });
  }

  pause () {
    AUDIO.pause();
    this.setState({ isPlaying: false });
  }

  load (currentSong, currentSongList) {
    AUDIO.src = currentSong.audioUrl;
    AUDIO.load();
    this.setState({
      currentSong: currentSong,
      currentSongList: currentSongList
    });
    // updates the state with current song and its song list
  }

  startSong (song, list) {
    this.pause();
    this.load(song, list);
    this.play();
  }

  toggleOne (selectedSong, selectedSongList) {
    if (selectedSong.id !== this.state.currentSong.id)
      this.startSong(selectedSong, selectedSongList);
    else this.toggle();
  }

  toggle () {
    if (this.state.isPlaying) this.pause();
    else this.play();
  }

  next () {
    this.startSong(...skip(1, this.state));
    // skip returns an array with next song and current songlist
    // runs next song in the song list

  }

  prev () {
    this.startSong(...skip(-1, this.state));
    // skip returns an array with next song and current songlist
    // runs previous song in the song list
  }

  setProgress (progress) {
    this.setState({ progress: progress });
    // updates progress property for the progress bar
  }

  selectAlbum (albumId) {
    axios.get(`/api/albums/${albumId}`)
      .then(res => res.data)
      .then(album => this.setState({
        selectedAlbum: convertAlbum(album)
      }));
  }
    // makes request to the backend for the corresponding album

  deselectAlbum () {
    this.setState({ selectedAlbum: {}});
  }
  // sets selected Album to an empty object

  render () {
    let prop = {album: this.state.selectedAlbum,
    currentSong: this.state.currentSong,
    isPlaying: this.state.isPlaying,
    toggleOne: this.state.toggleOne,
    albums: this.state.albums,
    selectAlbum: this.selectAlbum}
    return (
      <div id="main" className="container-fluid">
        <div className="col-xs-2">
          <Sidebar deselectAlbum={this.deselectAlbum} />
        </div>

        <div className="col-xs-10">
          {this.props.children && React.cloneElement(this.props.children, prop)}
        </div>

        <Player
          currentSong={this.state.currentSong}
          currentSongList={this.state.currentSongList}
          isPlaying={this.state.isPlaying}
          progress={this.state.progress}
          next={this.next}
          prev={this.prev}
          toggle={this.toggle}
        />
      </div>
    );
  }
}
