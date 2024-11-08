import { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { addSeries, updateSeries } from '../../../services/seriesServices';
import "./ModalAdd.css";


// Definimos las acciones para el reducer
const ACTIONS = {
    SET_TITLE: 'SET_TITLE',
    SET_SYNOPSIS: 'SET_SYNOPSIS',
    SET_LANGUAGE: 'SET_LANGUAGE',
    SET_DIRECTOR: 'SET_DIRECTOR',
    SET_GENRE: 'SET_GENRE',
    SET_COVER_URL: 'SET_COVER_URL',
    SET_ERROR: 'SET_ERROR',
    CLEAR_ERROR: 'CLEAR_ERROR',
    RESET_FORM: 'RESET_FORM',
    ADD_SEASON: 'ADD_SEASON',
    ADD_CHAPTER: 'ADD_CHAPTER'
};

// Estado inicial
const initialState = {
    title: '',
    synopsis: '',
    language: '',
    director: '',
    genre: '',
    serieCoverUrl: '',
    error: null,
    season: []
};

// Reducer para manejar el estado del formulario
const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.SET_TITLE:
            return { ...state, title: action.payload };
        case ACTIONS.SET_SYNOPSIS:
            return { ...state, synopsis: action.payload };
        case ACTIONS.SET_LANGUAGE:
            return { ...state, language: action.payload };
        case ACTIONS.SET_DIRECTOR:
            return { ...state, director: action.payload };
        case ACTIONS.SET_GENRE:
            return { ...state, genre: action.payload };
        case ACTIONS.SET_COVER_URL:
            return { ...state, serieCoverUrl: action.payload };
        case ACTIONS.SET_ERROR:
            return { ...state, error: action.payload };
        case ACTIONS.CLEAR_ERROR:
            return { ...state, error: null };
        case ACTIONS.RESET_FORM:
            return { initialState };

        default:
            return state;
    }
};

const ModalAddSeries = ({ onClose,  }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
     const refreshPage = () => {
        window.location.reload();
    };


    // Maneja el envío del formulario
    const handleSave = async () => {
        // Validación del formulario
        console.log(state, "edit ya pegandole a la api")
        if (!state.title) return dispatch({ type: ACTIONS.SET_ERROR, payload: "Title is required." });
        if (!state.synopsis) return dispatch({ type: ACTIONS.SET_ERROR, payload: "Synopsis is required." });
        const seriesData = {
            title: state.title,
            synopsis: state.synopsis,
            language: state.language,
            director: state.director,
            genreNames: state.genre.split(',').map(g => g.trim()), // Convierte genre en un array de strings
            serieCoverUrl: state.serieCoverUrl
        };

        try {
                await addSeries(seriesData); // Llamada para agregar
                console.log('Serie agregada correctamente');
            dispatch({ type: ACTIONS.RESET_FORM });
            onClose(); // Cierra el formulario al guardar correctamente
        } catch (error) {
            console.error('Error al guardar la serie:', error);
            dispatch({ type: ACTIONS.SET_ERROR, payload: "Failed to save series." });
        }
         refreshPage()
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Agregar Serie</h2>
                {state.error && <p className="error-message">{state.error}</p>}
                <label>
                    Título
                    <input
                        type="text"
                        placeholder="Título"
                        value={state.title}
                        onChange={(e) => dispatch({ type: ACTIONS.SET_TITLE, payload: e.target.value })}
                        required
                    />
                </label>
                <label>
                    Sinopsis (máx. 100 caracteres)
                    <textarea
                        placeholder="Sinopsis"
                        value={state.synopsis}
                        maxLength={100}
                        onChange={(e) => dispatch({ type: ACTIONS.SET_SYNOPSIS, payload: e.target.value })}
                        required
                    />
                </label>
                <label>
                    Lenguaje
                    <input
                        type="text"
                        placeholder="Lenguaje"
                        value={state.language}
                        onChange={(e) => dispatch({ type: ACTIONS.SET_LANGUAGE, payload: e.target.value })}
                    />
                </label>
                <label>
                    Director
                    <input
                        type="text"
                        placeholder="Director"
                        value={state.director}
                        onChange={(e) => dispatch({ type: ACTIONS.SET_DIRECTOR, payload: e.target.value })}
                    />
                </label>
                <label>
                    Géneros (separados por comas)
                    <input
                        type="text"
                        placeholder="Ej: Comedia, Drama"
                        value={state.genre}
                        onChange={(e) => dispatch({ type: ACTIONS.SET_GENRE, payload: e.target.value })}
                    />
                </label>
                <label>
                    URL de la portada
                    <input
                        type="text"
                        placeholder="URL de la portada"
                        value={state.serieCoverUrl}
                        onChange={(e) => dispatch({ type: ACTIONS.SET_COVER_URL, payload: e.target.value })}
                    />
                </label>
                <button onClick={handleSave} className="save-button"> Agregar Serie</button>
                <button onClick={onClose} className="cancel-button">Cancelar</button>
            </div>
        </div>
    );
};

ModalAddSeries.propTypes = {
    onClose: PropTypes.func.isRequired,
    serieToEdit: PropTypes.object
};

export default ModalAddSeries;
