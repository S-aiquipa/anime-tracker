function AnimeList({ animes, onWatched, onDelete }) {
  return (
    <ul>
      {animes.map((anime) => (
        <li key={anime.title}>
          {anime.title} - {anime.status}
          <button onClick={() => onWatched(anime.title)}>Watched</button>
          <button onClick={() => onDelete(anime.title)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default AnimeList;
