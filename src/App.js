import React, { useState } from "react";
//Adding Components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
//Import Styles
import "./styles/app.scss";
//Import Util
import data from "./Util";

function App() {
  const [songs, setSong] = useState(data());
  const [currentSong, SetCurrentSong] = useState(songs[7]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="App">
      <Song currentSong={currentSong}></Song>
      <Player
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      ></Player>
      <Library songs={songs} SetCurrentSong={SetCurrentSong} />
    </div>
  );
}

export default App;
