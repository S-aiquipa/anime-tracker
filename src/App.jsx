import { useEffect, useState } from "react";
import AddAnimeForm from "./components/AddAnimeForm";
import AnimeList from "./components/AnimeList";

function App() {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to load anime list (used on startup and retry)
  const loadAnimes = () => {
    setLoading(true);
    setError(null);

    fetch("http://localhost:5000/animes")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch anime list");
        return res.json();
      })
      .then((data) => {
        setAnimes(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  // Load anime list when app starts
  useEffect(() => {
    loadAnimes();
  }, []);

  // Add anime
  const addAnime = (title) => {
    fetch("http://localhost:5000/animes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Anime already exists or server error");
        return res.json();
      })
      .then((anime) => setAnimes([...animes, anime]))
      .catch((err) => setError(err.message));
  };

  // Mark as watched
  const markWatched = (title) => {
    fetch(`http://localhost:5000/animes/${encodeURIComponent(title)}`, {
      method: "PUT",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update anime");
        return res.json();
      })
      .then((updated) =>
        setAnimes(
          animes.map((a) =>
            a.title === updated.title ? { ...a, status: updated.status } : a,
          ),
        ),
      )
      .catch((err) => setError(err.message));
  };

  // Delete anime
  const deleteAnime = (title) => {
    fetch(`http://localhost:5000/animes/${encodeURIComponent(title)}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete anime");
        setAnimes(animes.filter((a) => a.title !== title));
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Anime Tracker</h1>

      {/* Show loading or error */}
      {loading && <p>Loading anime list...</p>}
      {error && (
        <div style={{ color: "red" }}>
          <p>Error: {error}</p>
          <button onClick={loadAnimes}>Retry</button>
        </div>
      )}

      {/* Show form and list only when not loading */}
      {!loading && !error && (
        <>
          <AddAnimeForm onAdd={addAnime} />
          <AnimeList
            animes={animes}
            onWatched={markWatched}
            onDelete={deleteAnime}
          />
        </>
      )}
    </div>
  );
}

export default App;
