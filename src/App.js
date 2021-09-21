import React, { useState, useRef } from "react";
//Adding Components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";
//Import Styles
import "./styles/app.scss";
//Import Util
import data from "./data";

function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, SetCurrentSong] = useState(songs[7]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [ActiveSongId, SetActiveSongId] = useState(currentSong.id);

  //Ref
  const audioRef = useRef(null);
  //Event Hanlder
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime: current, duration });
  };

  return (
    <div className="App">
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong}></Song>
      <Player
        songs={songs}
        audioRef={audioRef}
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        SetCurrentSong={SetCurrentSong}
        ActiveSongId={ActiveSongId}
        SetActiveSongId={SetActiveSongId}
      ></Player>
      <Library
        ActiveSongId={ActiveSongId}
        SetActiveSongId={SetActiveSongId}
        libraryStatus={libraryStatus}
        songs={songs}
        currentSong={currentSong}
        SetCurrentSong={SetCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
}

export default App;
