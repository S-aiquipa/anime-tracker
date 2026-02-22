const AnimeList = ({ animes, onWatched, onDelete }) => (
  <ul>
    {animes.map((anime) => (
      <li key={anime._id}>
        <strong>{anime.title}</strong> - {anime.status}
        {/*DROPDOWN STATUS*/}
        <select
          value={anime.status}
          onChange={(e) => onWatched(anime._id, e.target.value)}
        >
          <option value="want to watch">Want to watch</option>
          <option value="watching">Watching</option>
          <option value="completed">Completed</option>
        </select>
        {/*RATING DROPDOWN*/}
        {anime.status === "completed" && (
          <select
            value={anime.rating || ""}
            onChange={(e) =>
              onWatched(anime._id, "completed", Number(e.target.value))
            }
          >
            <option value="">Rate this anime</option>
            <option value={1}>⭐</option>
            <option value={2}>⭐⭐</option>
            <option value={3}>⭐⭐⭐</option>
            <option value={4}>⭐⭐⭐⭐</option>
            <option value={5}>⭐⭐⭐⭐⭐</option>
          </select>
        )}
        {/*DELETE BUTTON */}
        <button onClick={() => onDelete(anime._id)}>Delete</button>
      </li>
    ))}
  </ul>
);

export default AnimeList;
