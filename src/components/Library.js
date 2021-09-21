import React, { useState } from "react";
import LibrarySong from "./LibrarySong";

const Library = ({
  songs,
  currentSong,
  SetCurrentSong,
  audioRef,
  setIsPlaying,
}) => {
  const [ActiveSongId, SetActiveSongId] = useState(currentSong.id);

  return (
    <div className="library">
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            SetCurrentSong={SetCurrentSong}
            song={song}
            songs={songs}
            key={song.id}
            audioRef={audioRef}
            setIsPlaying={setIsPlaying}
            SetActiveSongId={SetActiveSongId}
            isActive={song.id === ActiveSongId}
          />
        ))}
      </div>
    </div>
  );
};
export default Library;
