import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {addSeries} from "../../../services/seriesServices"
import "./ModalAdd.css"

const ModalAdd = ({ onClose, editData }) => {
    const [seriesTitle, setSeriesTitle] = useState('');
    const [seasons, setSeasons] = useState([]);
    const [episodes, setEpisodes] = useState({});
    const [synopsis, setSynopsis] = useState("");
    const [language, setLanguage] = useState("");
    const [director, setDirector] = useState("");
    const [genre, setGenre] = useState("");
    const [imgUrl, setImgUrl] = useState("");

    const handleAddSeason = () => {
        const newSeason = `Temporada ${seasons.length + 1}`;
        setSeasons([...seasons, newSeason]);
        setEpisodes({ ...episodes, [newSeason]: [] });
    };

    const handleAddEpisode = (season) => {
        setEpisodes((prev) => ({
            ...prev,
            [season]: [...(prev[season] || []), `Episodio ${((prev[season] || []).length + 1)}`]
        }));
    };

    const handleSeasonTitleChange = (index, newTitle) => {
        const updatedSeasons = [...seasons];
        updatedSeasons[index] = newTitle;
        setSeasons(updatedSeasons);
    };

    const handleEpisodeTitleChange = (season, index, newTitle) => {
        const updatedEpisodes = { ...episodes };
        updatedEpisodes[season][index] = newTitle;
        setEpisodes(updatedEpisodes);
    };

    const handleSave = async () => {
        const seriesData = {
            title: seriesTitle,
            synopsis: synopsis,
            language: language,
            director: director,
            genreNames: genre,
            serieCoverUrl: imgUrl,
        };
        try {
            await addSeries(seriesData);
            console.log('Serie agregada correctamente');
            onClose();
        } catch (error) {
            console.error('Error al guardar la serie:', error);
        }
        
        console.log('Saving series:', seriesData);
    };


    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{editData ? 'Editar Serie' : 'Agregar Serie'}</h2>
                {/* Sección de Serie */}
                <div>
                    <label>
                        Título
                        <input
                            type="text"
                            placeholder="Título"
                            value={seriesTitle}
                            onChange={(e) => setSeriesTitle(e.target.value)}
                        />
                    </label>
                    <label>
                        Genero
                        <input
                            type="text"
                            placeholder="Genero"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                        />
                    </label>
                    <label>
                        Director
                        <input
                            type="text"
                            placeholder="Director"
                            value={director}
                            onChange={(e) => setDirector(e.target.value)}
                        />
                    </label>
                    <label>
                        Lenguaje
                        <input
                            type="text"
                            placeholder="Lenguaje"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                        />
                    </label>
                    <label>
                        Sinopsis
                        <input
                            type="text"
                            placeholder="Sinopsis"
                            value={synopsis}
                            onChange={(e) => setSynopsis(e.target.value)}
                        />
                    </label>
                    <label>
                        Img
                        <input
                            type="text"
                            placeholder="Url Img"
                            value={imgUrl}
                            onChange={(e) => setImgUrl(e.target.value)}
                        />
                    </label>
                    <button onClick={handleAddSeason}>Agregar Temporada</button>
                </div>
                <div>
                    <h3>Temporadas</h3>
                    {seasons.map((season, seasonIndex) => (
                        <div key={seasonIndex} style={{ marginBottom: '10px' }}>
                            <input
                                type="text"
                                value={season}
                                onChange={(e) => handleSeasonTitleChange(seasonIndex, e.target.value)}
                                placeholder="Título de la temporada"
                            />
                            <button onClick={() => handleAddEpisode(season)}>Agregar Episodio</button>

                            {/* Sección de Episodios */}
                            <div style={{ marginLeft: '20px' }}>
                                {episodes[season]?.map((episode, episodeIndex) => (
                                    <input
                                        key={episodeIndex}
                                        type="text"
                                        value={episode}
                                        onChange={(e) => handleEpisodeTitleChange(season, episodeIndex, e.target.value)}
                                        placeholder="Título del episodio"
                                        style={{ display: 'block', margin: '5px 0' }}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                {/* Botones de acción */}
                <button onClick={onClose} className="cancel-button">Cancelar</button>
                <button onClick={handleSave} className="save-button">{editData ? 'Guardar Cambios' : 'Agregar Serie'}</button>
            </div>
        </div>
    );
};


ModalAdd.propTypes = {
    onClose: PropTypes.func,
    editData: PropTypes.shape({
        title: PropTypes.string,
        seasons: PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string,
                episodes: PropTypes.arrayOf(PropTypes.string),
            })
        ),
    }),
}

export default ModalAdd