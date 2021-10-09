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
  //Funtions
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }
  const createShuffleSongs = (songs, currentIndex) => {
    let temp = Array.from(Array(songs.length).keys());
    temp.splice(currentIndex, 1);
    shuffleArray(temp);
    temp.unshift(currentIndex);
    return temp;
  };
  const createNewShuffleSongs = (currentIndex) => {
    let temp = Array.from(Array(songs.length).keys());
    temp.splice(currentIndex, 1);
    shuffleArray(temp);
    temp.unshift(currentIndex);
    setShuffledSong(temp);
  };
  const [songs, setSongs] = useState(data());
  const [shuffledSongs, setShuffledSong] = useState(
    createShuffleSongs(songs, 0)
  );
  const [currentSong, SetCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const [playerVolume, setPlayerVolume] = useState(0.5);
  const [lastVolume, setLastVolume] = useState(0.5);
  const [loopStatus, setLoopStatus] = useState(0);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [ActiveSongId, SetActiveSongId] = useState(currentSong.id);

  //Ref
  const audioRef = useRef(null);
  //Event Hanlder
  const songEndHandler = async () => {
    var currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    switch (loopStatus) {
      case 0:
        //noloop - going back to start without playing.
        await SetCurrentSong(songs[(currentIndex + 1) % songs.length]);
        SetActiveSongId(songs[(currentIndex + 1) % songs.length].id);
        if (currentIndex === songs.length - 1) {
          setIsPlaying(false);
        } else {
          audioRef.current.play();
        }
        break;
      case 1:
        setShuffledSong((state) => {
          console.log("shuffled list:");
          console.log(state);
          return state;
        });
        var shufflendex = shuffledSongs.findIndex(
          (index) => index === currentIndex
        );
        //shuffle - creating temp list for songs to play, picking randomly from the list and then removing it.
        await SetCurrentSong(
          songs[shuffledSongs[(shufflendex + 1) % shuffledSongs.length]]
        );
        SetActiveSongId(
          songs[shuffledSongs[(shufflendex + 1) % shuffledSongs.length]].id
        );
        audioRef.current.play();

        break;
      case 2:
        //loop - going back to start and keeps playing!
        await SetCurrentSong(songs[(currentIndex + 1) % songs.length]);
        SetActiveSongId(songs[(currentIndex + 1) % songs.length].id);

        audioRef.current.play();

        break;
      case 3:
        //loopone - reseting time and playing the gud song again!
        audioRef.current.currentTime = 0;
        audioRef.current.play();
        break;
      default:
        break;
    }
  };
  const skipTrackHandler = async (direction) => {
    if (direction === "skip-back" && songInfo.currentTime >= 2) {
      audioRef.current.currentTime = 0;

      setIsPlaying(true);
      audioRef.current.play();
      return;
    }
    if (loopStatus === 1) {
      setShuffledSong((state) => {
        console.log("shuffled list:");
        console.log(state);
        return state;
      });
      let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
      var shufflendex = shuffledSongs.findIndex(
        (index) => index === currentIndex
      );
      if (direction === "skip-forward") {
        await SetCurrentSong(
          songs[shuffledSongs[(shufflendex + 1) % shuffledSongs.length]]
        );
        SetActiveSongId(
          songs[shuffledSongs[(shufflendex + 1) % shuffledSongs.length]].id
        );
        audioRef.current.play();
      }
      if (direction === "skip-back") {
        if ((shufflendex - 1) % shuffledSongs.length === -1) {
          console.log("t");
          await SetCurrentSong(songs[shuffledSongs[shuffledSongs.length - 1]]);
          SetActiveSongId(songs[shuffledSongs[shuffledSongs.length - 1]].id);
          return;
        }
        await SetCurrentSong(
          songs[shuffledSongs[(shufflendex - 1) % shuffledSongs.length]]
        );
        SetActiveSongId(songs[shuffledSongs[shufflendex - 1]].id);
      }
    } else {
      let currentIndex = songs.findIndex((song) => song.id === currentSong.id);

      if (direction === "skip-back") {
        if ((currentIndex - 1) % songs.length === -1) {
          await SetCurrentSong(songs[songs.length - 1]);
          SetActiveSongId(songs[songs.length - 1].id);
          return;
        }
        await SetCurrentSong(songs[(currentIndex - 1) % songs.length]);
        SetActiveSongId(songs[currentIndex - 1].id);
      }
      if (direction === "skip-forward") {
        await SetCurrentSong(songs[(currentIndex + 1) % songs.length]);
        SetActiveSongId(songs[(currentIndex + 1) % songs.length].id);
      }
    }
    setIsPlaying(true);
    audioRef.current.play();
  };
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    //Calculate Percentage
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animationPercentage = Math.round(
      (roundedCurrent / roundedDuration) * 100
    );

    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
      animationPercentage: animationPercentage,
    });
  };

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong}></Song>
      <Player
        songs={songs}
        audioRef={audioRef}
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setPlayerVolume={setPlayerVolume}
        playerVolume={playerVolume}
        loopStatus={loopStatus}
        setLoopStatus={setLoopStatus}
        lastVolume={lastVolume}
        setLastVolume={setLastVolume}
        skipTrackHandler={skipTrackHandler}
        isMute={isMute}
        setIsMute={setIsMute}
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
        createNewShuffleSongs={createNewShuffleSongs}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
        volume={playerVolume}
      ></audio>
    </div>
  );
}
export default App;
