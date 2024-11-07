import React from "react";
import useCreateGenre from "../../../../hooks/genres/useCreateGenre";
import { useRef } from "react";
import { useEffect } from "react";
import { Alert } from "react-bootstrap";

const ModalAddGenre = ({ onClose, onCreate }) => {
  const [createdGenre, isCreateGenreLoading, CreateGenreError, createGenre] =
    useCreateGenre();

    const nameInputRef = useRef();

  //Enviar el genero creado al componente padre
  useEffect(() => {
    if (createdGenre) {
      const nameInput = nameInputRef.current.value;

      onCreate(createdGenre, nameInput);
    }
  }, [createdGenre]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nameInput = event.target.elements.name.value;

    await createGenre({name : nameInput});
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
              ref={nameInputRef}
              minLength={4}
              maxLength={30}
              placeholder="Ej: Acción"
              required
            />
          </label>
          {CreateGenreError && (
            <Alert variant="danger">{CreateGenreError}</Alert>
          )}

          {isCreateGenreLoading && (
            <Alert variant="info">
              Creando género....
            </Alert>
          )}

          {createdGenre && (
            <Alert variant="success">
              Género creado exitosamente con id: {createdGenre}
            </Alert>
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

export default ModalAddGenre;
