import React from 'react';
import { Link } from 'react-router';

const Sidebar = (props) => {

  const deselectAlbum = props.deselectAlbum;

  return (
    <sidebar>
      <img src="juke.svg" className="logo" />
      <section>
        <h4 className="menu-item active">
          <Link to={`albums`} onClick={deselectAlbum}>
            {/*Link tag represented as an <a> element tag on DOM*/}
            ALBUMS
          </Link>
        </h4>

        <h4 className="menu-item">
          <Link to={`artists`}>ARTISTS</Link>
        </h4>
      </section>
    </sidebar>
  );
}

export default Sidebar;
