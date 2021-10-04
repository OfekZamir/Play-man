import React from "react";
const LibrarySong = ({
  index,
  song,
  SetCurrentSong,
  audioRef,
  setIsPlaying,
  SetActiveSongId,
  isActive,
  createNewShuffleSongs,
}) => {
  const songSelectHandler = async () => {
    await SetCurrentSong(song);
    SetActiveSongId(song.id);
    setIsPlaying(true);
    audioRef.current.play();
    createNewShuffleSongs(index);

    // const playPromise = audioRef.current.play();
    // if (playPromise !== undefined) {
    //   playPromise.then((audio) => {
    //     audioRef.current.play();
    //   });
    // }
  };

  return (
    <div
      onClick={songSelectHandler}
      className={`library-song ${isActive ? "selected" : ""}`}
    >
      <img alt={song.name} src={song.cover}></img>
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
