import React from "react";
import Alert from "react-bootstrap/Alert";
import useDeleteMovie from "../../../../hooks/movies/useDeleteMovie";

const ModalRemoveMovie = ({ id, onClose }) => {
    const [deletedMovie, isDeletingMovie, deletedMovieError, deleteMovie] = useDeleteMovie();

    const removeMovie = async (event) => {
        event.preventDefault();
        await deleteMovie(id);
    }
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <Alert variant="warning">
          Estas seguro de que deseas eliminar la pelicula con id: {id}
        </Alert>
        {isDeletingMovie && <p>Cargando...</p>}
        {deletedMovieError && <p>Un error ha ocurrido al eliminar la pelicula</p>}
        {deletedMovie && <p>Pelicula removida exitosamente!</p>}
        <button onClick={removeMovie} className="save-button">Eliminar pelicula</button>
        <button onClick={onClose} className="cancel-button">
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default ModalRemoveMovie;
