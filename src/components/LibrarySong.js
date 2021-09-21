import React from "react";
import { playAudio } from "../util";
const LibrarySong = ({
  song,
  SetCurrentSong,
  audioRef,
  setIsPlaying,
  isPlaying,
  SetActiveSongId,
  isActive,
}) => {
  const songSelectHandler = () => {
    SetCurrentSong(song);
    SetActiveSongId(song.id);
    playAudio(setIsPlaying, audioRef);

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
