import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { getSerieById, updateSeries } from '../../../../services/seriesServices';

const ModalEditSerie = ({id, onClose}) => {
    const titleRef = useRef(null)
    const synopsisRef = useRef(null)
    const urlRef = useRef(null)
    const directorRef = useRef(null)
    const genreRef = useRef(null)
    const languageRef = useRef(null)
    useEffect(() => {
        // Función para cargar los datos
        const fetchData = async () => {
            console.log(id)
            try {
               
                const result = await getSerieById(id);
                console.log(result)
                if(result){
                    titleRef.current.value = result.title;
                    synopsisRef.current.value = result.synopsis
                    urlRef.current.value = result.serieCoverUrl;
                    directorRef.current.value = result.director;
                    genreRef.current.value = result.genres.join(", ");
                    languageRef.current.value = result.language
                }
                console.log("series Cargadas en el abm", result)
            } catch (err) {
                console.log(err.message)
            }
        };

        fetchData();
    }, []);

    const handelSave = async() =>{
        const newData = {
            title: titleRef.current.value,
            synopsis: synopsisRef.current.value,
            serieCoverUrl: urlRef.current.value,
            director: directorRef.current.value,
            genreNames: genreRef.current.value.split(',').map(g => g.trim()),
            language: languageRef.current.value
        }
        console.log(newData)
        if (!newData){
            return console.log("error al actualizar")
        }
        try{
            await updateSeries(id,newData)
            console.log("actualizado")
            onClose()
        } catch (error) {
            console.error('Error al guardar la serie:', error);
        }
    }

  return (
    <div className="modal-overlay">
            <div className="modal-content">
                <h2>Editar Serie</h2>
                <label>
                    Título
                    <input
                        type="text"
                        placeholder="Título"
                        ref={titleRef}
                        required
                    />
                </label>
                <label>
                    Sinopsis (máx. 100 caracteres)
                    <textarea
                        placeholder="Sinopsis"
                        ref={synopsisRef}
                        required
                    />
                </label>
                <label>
                    Lenguaje
                    <input
                        type="text"
                        placeholder="Lenguaje"
                        ref={languageRef}
                        required
                    />
                </label>
                <label>
                    Director
                    <input
                        type="text"
                        placeholder="Director"
                        ref={directorRef}
                        required
                    />
                </label>
                <label>
                    Géneros (separados por comas)
                    <input
                        type="text"
                        placeholder="Ej: Comedia, Drama"
                        ref={genreRef}
                        required
                    />
                </label>
                <label>
                    URL de la portada
                    <input
                        type="text"
                        placeholder="URL de la portada"
                        ref={urlRef}
                        required
                    />
                </label>
                <button  className="save-button" onClick={handelSave}> Guardar Cambios</button>
                <button onClick={onClose} className="cancel-button">Cancelar</button>
            </div>
        </div>
    );
};
  


ModalEditSerie.propTypes = {
    id: PropTypes.string
}

export default ModalEditSerie