import React from 'react';
import initialState from '../initialState';
import AUDIO from '../audio';

import Albums from '../components/Albums.js';
import Album from '../components/Album.js';
import Sidebar from '../components/Sidebar';
import Player from '../components/Player';
import Songs from '../components/Songs';


class Artist extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const artistId= this.props.routeParams.artistId;
        const selectArtist = this.props.selectArtist;

        selectArtist(artistId);
    }

    render() {
        console.log(this.props.artist);
        return (
            <div>
                <h3>Artist</h3>
                <h4>Albums</h4>
                <h4>Songs</h4>
            </div>
            
        )
    }
}

export default Artist;