import { useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { addSeries } from '../../../../services/seriesServices';
import "../../modalAdd-Edit/ModalAdd.css";
import { Alert } from "react-bootstrap";

// Estado inicial
const initialState = {
    title: '',
    synopsis: '',
    language: '',
    director: '',
    genre: '',
    serieCoverUrl: '',
    errors: {
        title: false,
        synopsis: false,
        language: false,
        director: false,
        genre: false,
        serieCoverUrl: false
    },

};

// Reducer para manejar el estado del formulario
const reducer = (state, action) => {
    switch (action.type) {
        case "FIELD_CHANGE":
            return {
                ...state,
                [action.field]: action.value,
                error: { ...state.error, [action.field]: false }
            }
        case "VALIDATE_FIELDS": {
            const newError = {
                title: !state.title,
                synopsis: !state.synopsis,
                language: !state.language,
                director: !state.director,
                genre: !state.genre,
                serieCoverUrl: !state.serieCoverUrl
            }
            return { ...state, errors: newError, }
        } case "RESET_FORM":
            return initialState;

        default:
            return state;
    }
};

const ModalAddSeries = ({ onClose,onRefresh }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [showRegisterErrorAlert, setShowRegisterErrorAlert] = useState(false)
    const [showRegisterErrorAlertMessage, setShowRegisterErrorAlertMessage] = useState("")

    
    // Maneja el envío del formulario
    const handleSave = async (e) => {
        e.preventDefault();
        // Validación del formulario
        console.log(state)
        dispatch({ type: "VALIDATE_FIELDS" });
       

        // Verificar si hay algún campo con error y establecer el mensaje correspondiente
        const hasErrors = Object.values(state.errors).some((error) => error === true);
        if (hasErrors) {
            setShowRegisterErrorAlert(true);
            setShowRegisterErrorAlertMessage("Completa todos los campos");
            return;
        }


        const seriesData = {
            title: state.title,
            synopsis: state.synopsis,
            language: state.language,
            director: state.director,
            genreNames: state.genre.split(',').map(g => g.trim()), // Convierte genre en un array de strings
            serieCoverUrl: state.serieCoverUrl
        };

        try {
            await addSeries(seriesData);
            
            dispatch({ type: "RESET_FORM" });
            setShowRegisterErrorAlert(false);
            if (onRefresh) {
                onRefresh();
            }
            onClose();
        } catch (error) {
            console.error('Error al guardar la serie:', error);
        }

    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Agregar Serie</h2>
                <label>
                    Título
                    <input
                        type="text"
                        placeholder="Título"
                        value={state.title}
                        onChange={(e) => dispatch({ type: "FIELD_CHANGE", field: "title", value: e.target.value })}
                        className={state.errors.title ? 'is-invalid' : ''}
                        required
                    />
                </label>
                <label>
                    Sinopsis (máx. 100 caracteres)
                    <textarea
                        placeholder="Sinopsis"
                        value={state.synopsis}
                        maxLength={100}
                        onChange={(e) => dispatch({ type: "FIELD_CHANGE", field: "synopsis", value: e.target.value })}
                        className={state.errors.synopsis ? 'is-invalid' : ''}
                        required
                    />
                </label>
                <label>
                    Lenguaje
                    <input
                        type="text"
                        placeholder="Lenguaje"
                        value={state.language}
                        onChange={(e) => dispatch({ type: "FIELD_CHANGE", field: "language", value: e.target.value })}
                        className={state.errors.language ? 'is-invalid' : ''}
                        required
                    />
                </label>
                <label>
                    Director
                    <input
                        type="text"
                        placeholder="Director"
                        value={state.director}
                        onChange={(e) => dispatch({ type: "FIELD_CHANGE", field: "director", value: e.target.value })}
                        className={state.errors.director ? 'is-invalid' : ''}
                        required
                    />
                </label>
                <label>
                    Géneros (separados por comas)
                    <input
                        type="text"
                        placeholder="Ej: Comedia, Drama"
                        value={state.genre}
                        onChange={(e) => dispatch({ type: "FIELD_CHANGE", field: "genre", value: e.target.value })}
                        className={state.errors.genre ? 'is-invalid' : ''}
                        required
                    />
                </label>
                <label>
                    URL de la portada
                    <input
                        type="text"
                        placeholder="URL de la portada"
                        value={state.serieCoverUrl}
                        onChange={(e) => dispatch({ type: "FIELD_CHANGE", field: "serieCoverUrl", value: e.target.value })}
                        className={state.errors.serieCoverUrl ? 'is-invalid' : ''}
                        required
                    />
                </label>
                {showRegisterErrorAlert && (
                    <Alert variant="danger" onClose={() => setShowRegisterErrorAlert(false)} dismissible>
                        {showRegisterErrorAlertMessage}
                    </Alert>
                )}
                <button onClick={handleSave} className="save-button"> Agregar Serie</button>
                <button onClick={onClose} className="cancel-button">Cancelar</button>
            </div>
        </div>
    );
};

ModalAddSeries.propTypes = {
    onClose: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired
};

export default ModalAddSeries;
