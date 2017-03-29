import React from 'react';
import initialState from '../initialState';
import AUDIO from '../audio';

import Albums from './Albums.js';
import Album from './Album.js';
import Sidebar from './Sidebar';
import Player from './Player';
import Songs from './Songs';
import { Link } from 'react-router';



class Artist extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const artistId= this.props.routeParams.artistId;  //takes in :artistId
        const selectArtist = this.props.selectArtist;

        selectArtist(artistId)
    }


    render() {

      let props = {
        currentSong: this.props.currentSong,
        isPlaying: this.props.isPlaying,
        toggleOne: this.props.toggleOne,
        artist: this.props.selectedArtist,
        albums: this.props.artistAlbums,
        songs: this.props.artistSongs,
        selectArtist: this.selectArtist
      }

        return (
            <div>
                <h3>{this.props.artist.name}</h3>
                <Link to = {`/artists/${this.props.artist.id}/albums`} >
                    <h4>Albums</h4>
                </Link>
                <Link to = {`/artists/${this.props.artist.id}/songs`} >
                    <h4>Songs</h4>
                </Link>
                {this.props.children && React.cloneElement(this.props.children, props)}
            </div>


        )
    }
}

export default Artist;
