import React from "react";
import useUpdateGenre from "../../../../hooks/genres/useUpdateGenre";
import { useRef } from "react";
import { useEffect } from "react";
import { Alert } from "react-bootstrap";

const ModalUpdateGenre = ({ id, onClose, onUpdate }) => {
  const [updatedGenre, isUpdatingGenre, UpdateGenreError, updateGenre] =
    useUpdateGenre();
  const nameInputRef = useRef();

  useEffect(() => {
    if (updatedGenre) {
      const name = nameInputRef.current.value;

      onUpdate(id, name);
    }
  }, [updatedGenre]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nameInput = nameInputRef.current.value;

    await updateGenre(id, nameInput);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <label>
            Nombre del género:
            <input
              type="text"
              name="name"
              minLength={4}
              ref={nameInputRef}
              maxLength={30}
              required
            />
          </label>
          {UpdateGenreError && (
            <Alert variant="danger">{UpdateGenreError}</Alert>
          )}

          {isUpdatingGenre && (
            <Alert variant="info">Modificando género....</Alert>
          )}

          {updatedGenre && (
            <Alert variant="success">Género modificado exitosamente!</Alert>
          )}

          <button type="submit" className="save-button">
            Crear genero
          </button>
          <button onClick={onClose} className="cancel-button">
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalUpdateGenre;
