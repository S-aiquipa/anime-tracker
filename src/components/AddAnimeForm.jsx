import { useState, useEffect } from "react";
import "./AddAnimeForm.css";

function AddAnimeForm({ onAdd }) {
  const [query, setQuery] = useState("");
  const [animeOptions, setAnimeOptions] = useState([]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.length > 2) {
        fetch(`https://api.jikan.moe/v4/anime?q=${query}&limit=5`)
          .then((res) => res.json())
          .then((data) => {
            setAnimeOptions(data.data || []);
          })
          .catch((err) => console.error(err));
      } else {
        setAnimeOptions([]);
      }
    }, 500); // espera 500ms antes de hacer la petición

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleSelect = (anime) => {
    const animeData = {
      title: anime.title,
      year: anime.year || "Undefined",
      episodes: anime.episodes || "N/A",
      studio: anime.studios?.map((s) => s.name).join(", ") || "Undefined",
      image: anime.images?.jpg?.image_url || "",
      type: anime.type || "Undefined",
    };
    onAdd(animeData);
    setQuery("");
    setAnimeOptions([]);
  };

  return (
    <div className="anime-form">
      <input
        type="text"
        placeholder="Escribe el nombre del anime"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="anime-input"
      />

      {animeOptions.length > 0 && (
        <ul className="anime-options">
          {animeOptions.map((anime) => (
            <li
              key={anime.mal_id}
              className="anime-option"
              onClick={() => handleSelect(anime)}
            >
              <img
                src={anime.images?.jpg?.image_url}
                alt={anime.title}
                className="anime-image"
              />
              <div className="anime-info">
                <strong>{anime.title}</strong> <br />
                <small>
                  {anime.type} • {anime.year || "Año desconocido"}
                </small>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AddAnimeForm;
