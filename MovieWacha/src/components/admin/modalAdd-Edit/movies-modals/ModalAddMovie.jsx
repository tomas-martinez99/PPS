import React, { useState } from "react";
import PropTypes from "prop-types";
import "../ModalAdd.css";
import useCreateMovie from "../../../../hooks/movies/useCreateMovie";
import Alert from "react-bootstrap/Alert";
import { useEffect } from "react";
import { useRef } from "react";
const ModalAddMovie = ({ onClose, onCreate }) => {
  const [createdMovie, isCreatingMovie, isCreatingMovieError, createMovie] = useCreateMovie();

  const titleInputRef = useRef();
  const genresInputRef = useRef();

  //Enviar la pelicula creada al componente padre
  useEffect(() => {
    if (createdMovie) {
      const titleInput = titleInputRef.current.value;
      const genresInput = genresInputRef.current.value.split(",");

      onCreate(createdMovie, titleInput, genresInput);
    }
  }, [createdMovie]);

  //Manejar el submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    const titleInput = event.target.elements.title;
    const durationInput = event.target.elements.duration;
    const synopsisInput = event.target.elements.synopsis;
    const languageInput = event.target.elements.language;
    const yearInput = event.target.elements.year;
    const directorInput = event.target.elements.director;
    const showCaseImageUrlInput = event.target.elements.showCaseImageUrl;
    const movieCoverUrlInput = event.target.elements.movieCoverUrl;
    const movieVideoInput = event.target.elements.movieVideo;
    const genresInput = event.target.elements.genres;

    formData.append("Title", titleInput.value);
    formData.append("Duration", durationInput.value);
    formData.append("Synopsis", synopsisInput.value);
    formData.append("Language", languageInput.value);
    formData.append("Year", yearInput.value);
    formData.append("Director", directorInput.value);
    formData.append("ShowCaseImageUrl", showCaseImageUrlInput.value);
    formData.append("MovieCoverUrl", movieCoverUrlInput.value);
    formData.append("MovieVideo", movieVideoInput.files[0]);
    const genresArray = genresInput.value.split(",");
    genresArray.forEach((genre, index) => {
      formData.append(`GenreNames[${index}]`, genre.trim());
    });
    await createMovie(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Agregar Pelicula</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Título:
            <input
              type="text"
              name="title"
              ref={titleInputRef}
              placeholder="Ingrese el titulo"
              required
            />
          </label>
          <label>
            Duration:
            <input
              type="text"
              name="duration"
              placeholder="02:00:00"
              required
            />
          </label>
          <label>
            Synopsis:
            <input
              type="text"
              minLength={4}
              name="synopsis"
              placeholder="Ingrese la sinopsis"
              required
            />
          </label>
          <label>
            Language:
            <input type="text" name="language" placeholder="Español" required />
          </label>
          <label>
            Genres:
            <input
              type="text"
              name="genres"
              ref={genresInputRef}
              placeholder="Comedia,Aventura,etc"
              required
            />
          </label>
          <label>
            Year:
            <input type="text" name="year" placeholder="1988" required />
          </label>
          <label>
            Director:
            <input
              type="text"
              name="director"
              placeholder="Director"
              required
            />
          </label>
          <label>
            ShowCaseImageUrl:
            <input
              type="text"
              name="showCaseImageUrl"
              placeholder="https://portada.com/portada.jpg"
            />
          </label>
          <label>
            MovieCoverUrl:
            <input
              type="text"
              name="movieCoverUrl"
              placeholder="https://portada.com/portada.jpg"
              required
            />
          </label>
          <label>
            Video:
            <input type="file" name="movieVideo" required />
          </label>
          {isCreatingMovieError && (
            <Alert variant="danger">{isCreatingMovieError}</Alert>
          )}

          {createdMovie && (
            <Alert variant="success">
              Pelicula creada exitosamente con id: {createdMovie}
            </Alert>
          )}

          <button type="submit" className="save-button">
            Agregar Pelicula
          </button>
          <button onClick={onClose} className="cancel-button">
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalAddMovie;
