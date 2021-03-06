import React, { Component } from 'react';
import axios from 'axios'; //axios: info from server

import initialState from '../initialState';
import AUDIO from '../audio';

import Albums from '../components/Albums.js';
import Album from '../components/Album.js';
import Sidebar from '../components/Sidebar';
import Player from '../components/Player';


import { convertAlbum, convertAlbums, skip } from '../utils';

export default class AppContainer extends Component {

  constructor (props) {
    super(props);
    this.state = initialState; //pulls from initialState.js
    // album, selected album, current song, current song list, isPlaying, progress for progress bar

    this.toggle = this.toggle.bind(this);
    this.toggleOne = this.toggleOne.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.selectAlbum = this.selectAlbum.bind(this);
    this.deselectAlbum = this.deselectAlbum.bind(this);
    this.selectArtist = this.selectArtist.bind(this);
  }

//when DOM finishes loading, axios moves forth
  componentDidMount () {
    axios.all([
      axios.get('/api/albums/'),
      axios.get('/api/artists/')
    ])
    .then(axios.spread((albums, artists) => {
        this.onLoad(convertAlbums(albums.data), artists.data);
    }))

    AUDIO.addEventListener('ended', () =>
      this.next());
    AUDIO.addEventListener('timeupdate', () =>
      this.setProgress(AUDIO.currentTime / AUDIO.duration));
  }

//don't run until we use in artist component (don't run prematurely, no immediate use)
// axios requests don't have to be in this specific order
  selectArtist(artistId) {
    axios.all([
      axios.get(`/api/artists/${artistId}`),
      axios.get(`/api/artists/${artistId}/albums`),
      axios.get(`/api/artists/${artistId}/songs`)
    ])
      .then(axios.spread((artist, albums, songs) => {
        this.setState({
          selectedArtist: artist.data,
          artistAlbums: convertAlbums(albums.data),
          artistSongs: songs.data
        })
      }))
  }

  onLoad (albums, artists) {
    this.setState({
      albums: albums,
      artists: artists
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

// props have been renamed for use in child components (below)
// names must work with what we're given 
    let prop = {album: this.state.selectedAlbum,
    currentSong: this.state.currentSong,
    isPlaying: this.state.isPlaying,
    toggleOne: this.state.toggleOne,
    albums: this.state.albums,
    artists: this.state.artists,
    selectAlbum: this.selectAlbum,
    artist: this.state.selectedArtist,
    artistAlbums: this.state.artistAlbums,
    artistSongs: this.state.artistSongs,
    selectArtist: this.selectArtist
    }

    // artist: this.state.selectedArtist,

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

// this.props.children only exists when on child route
