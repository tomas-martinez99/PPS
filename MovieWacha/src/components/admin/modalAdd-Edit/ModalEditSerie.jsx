import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getSerieById } from '../../../services/seriesServices';

const ModalEditSerie = ({id, onClose}) => {
    const [newTitle, setNewTitle] = useState("")
    const [newSynopsis, setNewSynopsis] = useState("")
    const [newUrl, setNewUrl] = useState("")
    const [newDirector, setNewDirector] = useState("")
    const [newLanguage, setNewLanguage] = useState("")
    const [newGenre, setNewGenre] = useState([])
    useEffect(() => {
        // Función para cargar los datos
        const fetchData = async () => {
            try {
                const result = await getSerieById(id);
                setNewUrl(result.sereiCoverUrl); // Guardar datos en el estado
                setNewSynopsis(result.synopsis)
                setNewTitle(result.title)
                setNewGenre(result.genre)
                setNewDirector(result.director)
                setNewLanguage(result.newLanguage)
                console.log("series Cargadas en el abm", result)
            } catch (err) {
                console.log(err.message)
            }
        };

        fetchData();
    }, []);

  return (
    <div className="modal-overlay">
            <div className="modal-content">
                <h2>Editar Serie</h2>
                <label>
                    Título
                    <input
                        type="text"
                        placeholder="Título"
                        value={newTitle}
                        onChange={(e) => e.target.value}
                        required
                    />
                </label>
                <label>
                    Sinopsis (máx. 100 caracteres)
                    <textarea
                        placeholder="Sinopsis"
                        value={newSynopsis}
                        maxLength={100}
                        onChange={(e) => e.target.value}
                        required
                    />
                </label>
                <label>
                    Lenguaje
                    <input
                        type="text"
                        placeholder="Lenguaje"
                        onChange={(e) => e.target.value}
                        value={newLanguage}
                    />
                </label>
                <label>
                    Director
                    <input
                        type="text"
                        placeholder="Director"
                        onChange={(e) => e.target.value}
                        value={newDirector}
                    />
                </label>
                <label>
                    Géneros (separados por comas)
                    <input
                        type="text"
                        placeholder="Ej: Comedia, Drama"
                        onChange={(e) => e.target.value}
                        value={newGenre}
                    />
                </label>
                <label>
                    URL de la portada
                    <input
                        type="text"
                        placeholder="URL de la portada"
                        onChange={(e) => e.target.value}
                        value={newUrl}
                    />
                </label>
                <button  className="save-button"> Agregar Serie</button>
                <button onClick={onClose} className="cancel-button">Cancelar</button>
            </div>
        </div>
    );
};
  


ModalEditSerie.propTypes = {
    id: PropTypes.string
}

export default ModalEditSerie