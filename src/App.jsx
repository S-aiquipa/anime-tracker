import { useEffect, useState } from "react";
import AddAnimeForm from "./components/AddAnimeForm";
import AnimeList from "./components/AnimeList";
import Auth from "./components/Auth";
import API_URL from "./api";

const API_URL = import.meta.env.VITE_API_URL || "";

function App() {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState(localStorage.getItem("username"));

  const handleLogin = (newToken, newUsername) => {
    setToken(newToken);
    setUsername(newUsername);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken(null);
    setUsername(null);
    setAnimes([]);
  };

  const loadAnimes = () => {
    setLoading(true);
    setError(null);

    (fetch(`${API_URL}/animes`),
      {
        headers: { Authorization: `Bearer ${token}` },
      }
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
        }));
  };

  useEffect(() => {
    if (token) loadAnimes();
  }, [token]);

  const addAnime = (animeData) => {
    setAnimes([...animes, animeData]);
  };

  const markWatched = (id, newStatus, rating = null) => {
    const body = { status: newStatus };
    if (rating !== null) body.rating = rating;

    fetch(`${API_URL}/animes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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

  const deleteAnime = (id) => {
    fetch(`${API_URL}/animes/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete anime");
        return res.json();
      })
      .then(() => setAnimes(animes.filter((a) => a._id !== id)))
      .catch((err) => setError(err.message));
  };

  // If no token, show login/register page
  if (!token) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Anime Tracker</h1>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ color: "#888", fontSize: "0.9rem" }}>
            👋 {username}
          </span>
          <button
            onClick={handleLogout}
            style={{
              background: "#b33a3a",
              color: "#fff",
              border: "none",
              padding: "8px 16px",
              borderRadius: "20px",
              cursor: "pointer",
              fontSize: "0.85rem",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {loading && <p>Loading anime list...</p>}
      {error && (
        <div style={{ color: "red" }}>
          <p>Error: {error}</p>
          <button onClick={loadAnimes}>Retry</button>
        </div>
      )}

      {!loading && !error && (
        <>
          <AddAnimeForm onAdd={addAnime} token={token} />
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
