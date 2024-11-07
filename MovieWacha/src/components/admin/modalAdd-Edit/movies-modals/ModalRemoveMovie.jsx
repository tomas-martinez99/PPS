import React from "react";
import Alert from "react-bootstrap/Alert";
import useDeleteMovie from "../../../../hooks/movies/useDeleteMovie";

const ModalRemoveMovie = ({ id, onClose, onDelete }) => {
    const [deletedMovie, isDeletingMovie, deletedMovieError, deleteMovie] = useDeleteMovie();

    const removeMovie = async (event) => {
        event.preventDefault();
        await deleteMovie(id);
        onDelete(id);
    }
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <Alert variant="warning">
          Estas seguro de que deseas eliminar la pelicula con id: {id}
        </Alert>
        {isDeletingMovie && <Alert variant="info">Cargando...</Alert>}
        {deletedMovieError && <Alert variant="danger">{deletedMovieError}</Alert>}
        {deletedMovie && <Alert variant="success">Género removido exitosamente!</Alert>}
        <button onClick={removeMovie} className="save-button">Eliminar pelicula</button>
        <button onClick={onClose} className="cancel-button">
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default ModalRemoveMovie;
