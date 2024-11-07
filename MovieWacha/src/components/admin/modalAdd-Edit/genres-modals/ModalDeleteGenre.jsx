import React from "react";
import { Alert } from "react-bootstrap";
import useDeleteGenre from "../../../../hooks/genres/useDeleteGenre";

const ModalDeleteGenre = ({ id, onClose, onDelete }) => {
  const [removedGenre, isRemovingGenre, RemovingGenreError, removeGenre] =
    useDeleteGenre();

  const deleteGenre = async (event) => {
    event.preventDefault();
    await removeGenre(id);
    onDelete(id);
  };
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <Alert variant="warning">
          Estas seguro de que deseas eliminar el genero con id: {id}?
        </Alert>
        {isRemovingGenre && <Alert variant="info">Cargando...</Alert>}
        {RemovingGenreError && <Alert variant="danger">{RemovingGenreError}</Alert>}
        {removedGenre && <Alert variant="success">Género removido exitosamente!</Alert>}
        <button onClick={deleteGenre} className="save-button">
          Eliminar género
        </button>
        <button onClick={onClose} className="cancel-button">
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default ModalDeleteGenre;
