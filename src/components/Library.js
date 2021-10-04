import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({
  songs,
  currentSong,
  SetCurrentSong,
  audioRef,
  isPlaying,
  setIsPlaying,
  libraryStatus,
  createNewShuffleSongs,
  ActiveSongId,
  SetActiveSongId,
}) => {
  return (
    <div className={`library ${libraryStatus ? "active-library" : ""}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song, index) => (
          <LibrarySong
            index={index}
            SetCurrentSong={SetCurrentSong}
            song={song}
            songs={songs}
            key={song.id}
            audioRef={audioRef}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            SetActiveSongId={SetActiveSongId}
            isActive={song.id === ActiveSongId}
            createNewShuffleSongs={createNewShuffleSongs}
          />
        ))}
      </div>
    </div>
  );
};
export default Library;
