import { useState, useEffect } from "react";
import "./AddAnimeForm.css";

function AddAnimeForm({ onAdd, token }) {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (query.length <= 2) {
      setOptions([]);
      setError("");
      return;
    }

    const delay = setTimeout(() => {
      fetch(`/search?q=${query}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length === 0) {
            setError(
              "No results found. MyAnimeList may be unavailable, try again later.",
            );
          } else {
            setError("");
          }
          setOptions(data);
        })
        .catch(() => setError("Search unavailable, try again later."));
    }, 500);

    return () => clearTimeout(delay);
  }, [query]);

  const handleSelect = async (anime) => {
    try {
      const response = await fetch("/animes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ mal_id: anime.mal_id }),
      });

      const data = await response.json();
      if (response.ok) {
        onAdd(data);
        setQuery("");
        setOptions([]);
        setError("");
      } else {
        console.error("Error:", data.error);
        alert(data.error);
      }
    } catch (err) {
      console.error("Error en la petición:", err);
    }
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

      {/* Error message */}
      {error && <p className="search-error">{error}</p>}

      {/* Lista de sugerencias */}
      {options.length > 0 && (
        <ul className="anime-options">
          {options.map((anime) => (
            <li
              key={anime.mal_id}
              onClick={() => {
                console.log("Anime seleccionado:", anime);
                handleSelect(anime);
              }}
            >
              <img
                src={anime.images?.jpg?.image_url}
                alt={anime.title}
                width="40"
              />
              {anime.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AddAnimeForm;
