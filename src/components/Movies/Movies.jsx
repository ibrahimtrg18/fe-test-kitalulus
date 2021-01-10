import React, { useState } from "react";
import "./Movies.css";
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";
import { ReactComponent as InfoIcon } from "../../assets/icons/info.svg";
import { ReactComponent as SaveIcon } from "../../assets/icons/save.svg";

const Movies = ({
  filterMode,
  movies,
  filter,
  setFilter,
  setOpenModal,
  fetchMovies,
}) => {
  const [editMovie, setEditMovie] = useState({
    id: null,
    title: null,
    views: null,
    genre: null,
    descriptions: null,
  });

  const onSave = async () => {
    const res = await fetch(
      `https://andywiranata-42555.firebaseio.com/test-frontend/items/${editMovie.id}.json`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
          title: editMovie.title,
          views: editMovie.views,
          genre: editMovie.genre,
          descriptions: editMovie.descriptions,
        }),
      }
    );

    if (res.ok) {
      fetchMovies();
      setEditMovie({
        id: null,
        title: null,
        views: null,
        genre: null,
        descriptions: null,
      });
    }
  };

  const onEditMovieChange = (e) => {
    setEditMovie({ ...editMovie, [e.target.name]: e.target.value });
  };

  const renderMovies = () => {
    return movies.map((movie, index) => {
      if (editMovie.id === index) {
        return (
          <tr className="table-body__row" key={index}>
            <td className="table-body__column index">{index + 1}</td>
            <td className="table-body__column title">
              <input
                type="text"
                name="title"
                value={editMovie.title}
                onChange={(e) => onEditMovieChange(e)}
              />
            </td>
            <td className="table-body__column views">
              <input
                type="text"
                name="views"
                value={editMovie.views}
                onChange={(e) => onEditMovieChange(e)}
              />
            </td>
            <td className="table-body__column genre">
              <input
                type="text"
                name="genre"
                value={editMovie.genre}
                onChange={(e) => onEditMovieChange(e)}
              />
            </td>
            <td className="table-body__column descriptions">
              <div className="descriptions-wrapper">
                <input
                  type="text"
                  name="descriptions"
                  value={editMovie.descriptions}
                  onChange={(e) => onEditMovieChange(e)}
                />
                <span
                  className="icon-container info"
                  onClick={() => setOpenModal(movie.descriptions)}
                >
                  <InfoIcon />
                </span>
              </div>
            </td>
            <td className="table-body__column action">
              <span
                className="icon-container save"
                onClick={() => onSave(index)}
              >
                <SaveIcon />
              </span>
            </td>
          </tr>
        );
      } else {
        return (
          <tr className="table-body__row" key={index}>
            <td className="table-body__column index">{index + 1}</td>
            <td className="table-body__column title">{movie.title}</td>
            <td className="table-body__column views">{movie.views}</td>
            <td className="table-body__column genre">{movie.genre}</td>
            <td className="table-body__column descriptions">
              <div className="descriptions-wrapper">
                <p>{movie.descriptions}</p>
                <span
                  className="icon-container info"
                  onClick={() => setOpenModal(movie.descriptions)}
                >
                  <InfoIcon />
                </span>
              </div>
            </td>
            <td className="table-body__column action">
              <span
                className="icon-container create"
                onClick={() => setEditMovie({ ...movie, id: index })}
              >
                <EditIcon />
              </span>
            </td>
          </tr>
        );
      }
    });
  };

  return (
    <table className="table-container__movies">
      <thead className="table-head">
        <tr className="table-head__row">
          <th className="table-head__column index">No</th>
          <th className="table-head__column title">Title</th>
          <th className="table-head__column views">View</th>
          <th className="table-head__column genre">Genre</th>
          <th className="table-head__column descriptions">Descriptions</th>
          <th className="table-head__column action">Action</th>
        </tr>
      </thead>
      <tbody className="table-body">
        {filterMode && (
          <tr className="table-body__row">
            <td className="table-body__column">&nbsp;</td>
            <td className="table-body__column">
              <input
                type="text"
                name="title"
                onChange={(e) =>
                  setFilter({ ...filter, [e.target.name]: e.target.value })
                }
              />
            </td>
            <td className="table-body__column">&nbsp;</td>
            <td className="table-body__column">
              <input
                type="text"
                name="genre"
                onChange={(e) =>
                  setFilter({ ...filter, [e.target.name]: e.target.value })
                }
              />
            </td>
            <td className="table-body__column">&nbsp;</td>
            <td className="table-body__column">&nbsp;</td>
          </tr>
        )}
        {renderMovies()}
      </tbody>
    </table>
  );
};

export default Movies;
