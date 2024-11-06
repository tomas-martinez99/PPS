import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getEpisode } from '../../../services/seriesServices';
import "../abmSeries/AbmSeries.css"


const AbmEpisode = ({ idSeason }) => {
    const [episodes, setEpisodes] = useState([])
    useEffect(() => {
        // Función para cargar los datos
        const fetchData = async () => {
            try {
                console.log("id serie", idSeason)
                const result = await getEpisode(idSeason);
                setEpisodes(result); // Guardar datos en el estado
                console.log(result)
            } catch (err) {
                console.log(err.message)
            }
        };

        fetchData();
    }, [idSeason]);
    return (
        <>
            {episodes.length > 0 ? episodes.map((episode) => (
                <tr className="row-episode" key={episode.id}>
                    <td>{episode.id}</td>
                    <td>↳ ↳ {episode.title}</td>
                    <td></td>
                    <td className="action-buttons">
                        <button className="edit-btn" >✏️</button>
                        <button className="delete-btn">🗑️</button>
                    </td>
                </tr>)) : <tr className="row-episode">
                <td className="row-episode"></td>
                <td className="row-episode">No hay episodios cargadas</td>
                <td className="row-episode"></td>
                <td className="row-episode"></td>
            </tr>}
        </>
    )
}

AbmEpisode.propTypes = {
    idSeason: PropTypes.number
}

export default AbmEpisode