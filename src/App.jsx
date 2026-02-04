import { useState } from "react";

function App() {
  const [animes, setAnimes] = useState([]);
  const [title, setTitle] = useState("");

  //FUNCTIONS

  const addAnime = () => {
    if (title.trim() === "") return; // avoid empty titles
    // Check if anime already exists (case-insensitive)
    const exists = animes.some(
      (anime) => anime.title.toLowerCase() === title.toLowerCase(),
    );

    if (exists) {
      alert("This anime is already in your list!");
      return;
    }

    setAnimes([...animes, { title, status: "want to watch" }]);
    setTitle("");
  };

  const markAsWatched = (index) => {
    const updatedAnimes = [...animes];
    updatedAnimes[index].status = "watched";
    setAnimes(updatedAnimes);
  };

  const deleteAnime = (index) => {
    const updatedAnimes = animes.filter((_, i) => i !== index);
    setAnimes(updatedAnimes);
  };

  //HTML

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>My Anime Tracker</h1>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Anime title"
      />
      <button onClick={addAnime}>Add</button>

      <ul>
        {animes.map((anime, index) => (
          <li key={index}>
            {anime.title} - {anime.status}
            {anime.status === "want to watch" && (
              <button onClick={() => markAsWatched(index)}>
                Mark as Watched
              </button>
            )}
            <button onClick={() => deleteAnime(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
