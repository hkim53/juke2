export const convertSong = (song) => {
  song.audioUrl = `/api/songs/${song.id}/audio`;
  return song;
};

export const convertAlbum = (album) => {
  album.imageUrl = `/api/albums/${album.id}/image`;
  album.songs = album.songs.map(convertSong);
  return album;
};

export const convertAlbums = (albums) =>
  albums.map(album => convertAlbum(album));

const mod = (num, m) => ((num % m) + m) % m;
// When current song is the last song in the list and user skips to the next song
// the index restarts to the first song

export const skip = (interval, { currentSongList, currentSong }) => {
  let idx = currentSongList.map(song => song.id).indexOf(currentSong.id);
  // idx = the index position of the current song in its corresponding song list
  idx = mod(idx + interval, currentSongList.length);
  // idx = current index position + interval
  const next = currentSongList[idx];
  // queued song
  return [next, currentSongList];
  // returns queued song and its list
};
