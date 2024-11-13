import React, { useState } from "react";
import PropTypes from "prop-types";
import "../ModalAdd.css";
import Alert from "react-bootstrap/Alert";
import { useEffect } from "react";
import { useRef } from "react";
import useCreateEpisode from "../../../../hooks/episode/useCreateEpisode";
const ModalAddMovie = ({ onClose, seasonId}) => {
  const [createdEpisode,isLoadingEpisode, isCreatingEpisodeError, createEpisode] = useCreateEpisode();
  const titleInputRef = useRef();
  

  //Manejar el submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log (seasonId)
    const formData = new FormData();
    const titleInput = event.target.elements.title
    const movieVideoInput = event.target.elements.movieVideo;

    formData.append("Title", titleInput.value);
    formData.append("EpisodeVideo", movieVideoInput.files[0]);
    formData.append("SeasonId", seasonId);

    console.log(formData)
    await createEpisode(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Agregar Episodio</h2>
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
            Video:
            <input type="file" name="movieVideo" required />
          </label>
          {isCreatingEpisodeError && (
            <Alert variant="danger">{isCreatingEpisodeError}</Alert>
          )}

          {createdEpisode && (
            <Alert variant="success">
              Episodio creada exitosamente con id: {createdEpisode}
            </Alert>
          )}

          <button type="submit" className="save-button">
            Agregar Episodio
          </button>
          <button onClick={onClose} className="cancel-button">
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

ModalAddMovie.propTypes = {
  onClose: PropTypes.func,
  seasonId: PropTypes.string

};

export default ModalAddMovie;
