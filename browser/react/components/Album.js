import React from 'react';
import Songs from '../components/Songs';

class Album extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount () {
    const albumId = this.props.routeParams.albumId;
    const selectAlbum = this.props.selectAlbum;

    selectAlbum(albumId);
}

    render() {
      console.log(this.props.routeParams)
      const album = this.props.album;
      const currentSong = this.props.currentSong;
      const isPlaying = this.props.isPlaying;
      const toggleOne = this.props.toggleOne;
      return (

        <div className="album">
          <div>
            <h3>{ album.name }</h3>
            <img src={ album.imageUrl } className="img-thumbnail" />
          </div>
          <Songs
            songs={this.props.toggle}
            currentSong={this.props.currentSong}
            isPlaying={isPlaying}
            toggleOne={toggleOne} />
        </div>
      )
    }
}

export default Album;
