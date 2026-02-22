import { useEffect, useState } from "react";
import AddAnimeForm from "./components/AddAnimeForm";
import AnimeList from "./components/AnimeList";

function App() {
  //STATE VARIABLES
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to load anime list (used on startup and retry)
  const loadAnimes = () => {
    setLoading(true);
    setError(null);

    fetch("http://localhost:5000/animes")
      .then((res) => {
        console.log("Raw Response:", res);
        if (!res.ok) throw new Error("Failed to fetch anime list");
        return res.json();
      })
      .then((data) => {
        console.log("Parsed JSON Data:", data);
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
  const addAnime = (animeData) => {
    fetch("http://localhost:5000/animes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(animeData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Anime already exists or server error");
        return res.json();
      })
      .then((anime) => setAnimes([...animes, anime]))
      .catch((err) => setError(err.message));
  };

  // Mark as watched
  const markWatched = (id, newStatus, rating = null) => {
    const body = { status: newStatus };
    if (rating !== null) body.rating = rating;
    fetch(`http://localhost:5000/animes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update anime");
        return res.json();
      })
      .then((updated) =>
        setAnimes(
          animes.map((a) =>
            a._id === updated._id
              ? { ...a, status: updated.status, rating: updated.rating }
              : a,
          ),
        ),
      )
      .catch((err) => setError(err.message));
  };

  // Delete anime
  const deleteAnime = (id) => {
    fetch(`http://localhost:5000/animes/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete anime");
        return res.json();
      })
      .then(() => setAnimes(animes.filter((a) => a._id !== id)))
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
