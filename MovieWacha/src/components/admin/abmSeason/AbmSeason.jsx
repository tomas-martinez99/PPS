import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import AbmEpisode from '../abmEpisode/AbmEpisode';
import { getSeason } from '../../../services/seriesServices';

const AbmSeason = ({ serieId }) => {
    const [expandedSeasons, setExpandedSeasons] = useState({})//Estados Mostrar episodios
    const [season, setSeasons] = useState([])
    //Mostrar los episodios
    const toggleSeason = (seasonId) => {
        console.log(seasonId, "asd")
        setExpandedSeasons((prev) => ({
            ...prev,
            [seasonId]: !prev[seasonId],
        }));
    };

    useEffect(() => {
        // Función para cargar los datos

        const fetchData = async () => {
            try {
                console.log(serieId)
                const result = await getSeason(serieId); // Guardar datos en el estado
                console.log(result)
                setSeasons(result)
            } catch (err) {
                console.log(err.message)
            }
        };

        fetchData();
    }, [serieId]);
    return (
        <>
            {season.length > 0 ? season.map((season) => (
                <React.Fragment key={season.id}>
                <tr className="row-season" >
                    <td>{season.id}</td>
                    <td>↳  Temporada {season.seasonNumber}</td>
                    <td></td>
                    <td className="action-buttons">
                        <button onClick={() => toggleSeason(season.id)}>
                            {expandedSeasons[season.id] ? '▲' : '▼'}
                        </button>
                        <button className="edit-btn" >✏️</button>
                        <button className="delete-btn">🗑️</button>
                        <button className='add-btn'>+</button>
                    </td>
                </tr>
                {expandedSeasons[season.id] && (
                    <tr>
                        <td colSpan="4">
                            <AbmEpisode idSeason={season.id} />
                        </td>
                    </tr>
                )}
            </React.Fragment>)) :
                <tr className="row-season">
                    <td></td>
                    <td>No hay temporadas cargadas</td>
                    <td></td>
                    <td></td>
                </tr>}
        </>
    )

}

AbmSeason.propTypes = {
    serieId: PropTypes.string
}

export default AbmSeason