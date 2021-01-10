import React, { useState, useEffect } from "react";
import "./App.css";

import Movies from "./Movies/Movies";
import Modal from "./Modal/Modal";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filter, setFilter] = useState({
    title: "",
    genre: "",
  });
  const [filterMode, setFilterMode] = useState(false);
  const [openModal, setOpenModal] = useState("");

  const fetchMovies = async () => {
    const res = await fetch(
      "https://andywiranata-42555.firebaseio.com/test-frontend/items.json",
      {
        method: "GET",
      }
    );
    const data = await res.json();

    setMovies(data);
    setFilteredMovies(data);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    (function () {
      setFilteredMovies(
        movies.filter(
          (movie) =>
            movie.title.toLowerCase().includes(filter.title) &&
            movie.genre.toLowerCase().includes(filter.genre)
        )
      );
    })();
  }, [filter, movies]);

  return (
    <div className="container">
      <button
        type="button"
        className="button"
        onClick={() => setFilterMode(!filterMode)}
      >
        Filter
      </button>
      <Movies
        filterMode={filterMode}
        movies={filteredMovies}
        filter={filter}
        setFilter={setFilter}
        setOpenModal={setOpenModal}
        fetchMovies={fetchMovies}
      />
      {openModal && <Modal body={openModal} setOpenModal={setOpenModal} />}
    </div>
  );
};

export default App;
