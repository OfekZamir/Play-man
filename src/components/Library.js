import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({ songs, SetCurrentSong }) => {
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
          />
        ))}
      </div>
    </div>
  );
};
export default Library;
