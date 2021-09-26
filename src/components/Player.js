import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
  faVolumeUp,
  faVolumeDown,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as Repeat } from "../icons/loop_all.svg";
import { useState } from "react/cjs/react.development";

const Player = ({
  songs,
  audioRef,
  currentSong,
  isPlaying,
  setIsPlaying,
  setPlayerVolume,
  playerVolume,
  isMute,
  setIsMute,
  songInfo,
  setSongInfo,
  SetCurrentSong,
  SetActiveSongId,
}) => {
  //States
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  let lastVolume = 0.8;

  //Event Handlers
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };
  const MuteSongHandler = () => {
    if (isMute) {
      audioRef.current.volume = lastVolume;
      setPlayerVolume(lastVolume);
      setIsMute(!isMute);
    } else {
      audioRef.current.volume = 0;
      lastVolume = playerVolume;
      setPlayerVolume(0);
      setIsMute(!isMute);
    }

    console.log(audioRef.current.volume);
  };
  const PlayerVolumeHandler = (e) => {
    audioRef.current.volume = e.target.value / 100;
    setPlayerVolume(e.target.value / 100);
    setIsMute(false);
  };
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };
  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === -1) {
        await SetCurrentSong(songs[songs.length - 1]);
        SetActiveSongId(songs[songs.length - 1].id);
        setIsPlaying(true);
        audioRef.current.play();
        return;
      }
      await SetCurrentSong(songs[(currentIndex - 1) % songs.length]);
      SetActiveSongId(songs[currentIndex - 1].id);
    }
    if (direction === "skip-forward") {
      await SetCurrentSong(songs[(currentIndex + 1) % songs.length]);
      SetActiveSongId(songs[(currentIndex + 1) % songs.length].id);
    }
    setIsPlaying(true);
    audioRef.current.play();
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          className="track"
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
          }}
        >
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
            type="range"
          />
          <div
            className="animate-track"
            style={{
              transform: `translateX(${songInfo.animationPercentage}%)`,
            }}
          ></div>
        </div>

        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <Repeat className="loop" />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-forward")}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />

        <div id="volume-control">
          <div id="volume-button">
            <FontAwesomeIcon
              onClick={() => MuteSongHandler()}
              id="volume-button"
              className="volume"
              size="2x"
              icon={isMute ? faVolumeMute : faVolumeUp}
            />
          </div>
          <div id="volume-range">
            <input
              min={0}
              max={100}
              value={playerVolume * 100}
              onChange={PlayerVolumeHandler}
              className="volume"
              type="range"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
