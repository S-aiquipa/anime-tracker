import "./AnimeList.css";

const AnimeList = ({ animes, onWatched, onDelete }) => (
  <div className="anime-list">
    {/* Encabezado de columnas */}
    <div className="playlist-row playlist-header">
      <span className="playlist-title">Title</span>
      <span className="playlist-studio">Studio</span>
      <span className="playlist-year">Year</span>
      <span className="playlist-duration">Duration</span>
      <span className="playlist-type">Type</span>
      <span className="playlist-actions">Actions</span>
    </div>

    {/* Filas de animes */}
    {animes.map((anime) => (
      <div key={anime._id} className="playlist-row">
        {/* Imagen + título */}
        <div className="playlist-title">
          <img src={anime.image} alt={anime.title} className="playlist-image" />
          <span className="playlist-title-text">{anime.title}</span>
        </div>

        {/* Estudio */}
        <div className="playlist-studio">{anime.studio || "Unknown"}</div>

        {/* Año */}
        <div className="playlist-year">{anime.year || "N/A"}</div>

        {/* Duración */}
        <div className="playlist-duration">
          {anime.episodes ? `${anime.episodes} eps` : anime.duration || "N/A"}
        </div>

        {/* Tipo */}
        <div className="playlist-type">{anime.type || "N/A"}</div>

        {/* Acciones */}
        <div className="playlist-actions">
          <select
            value={anime.status}
            onChange={(e) => onWatched(anime._id, e.target.value)}
            className="anime-select"
          >
            <option value="want to watch">Want to watch</option>
            <option value="watching">Watching</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={anime.rating || ""}
            onChange={(e) =>
              onWatched(anime._id, anime.status, Number(e.target.value))
            }
            className="anime-select"
          >
            <option value="">Rate this anime</option>
            <option value={1}>⭐</option>
            <option value={2}>⭐⭐</option>
            <option value={3}>⭐⭐⭐</option>
            <option value={4}>⭐⭐⭐⭐</option>
            <option value={5}>⭐⭐⭐⭐⭐</option>
          </select>

          <button onClick={() => onDelete(anime._id)} className="anime-delete">
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
);

export default AnimeList;
