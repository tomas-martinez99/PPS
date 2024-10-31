import React, { useState } from 'react'
import PropTypes from 'prop-types'
import AbmEpisode from '../abmEpisode/AbmEpisode';

const AbmSeason = ({season}) => {
    const [expandedSeasons, setExpandedSeasons] = useState({})//Estados Mostrar episodios

    //Mostrar los episodios
    const toggleSeason = (seasonId) => {
        setExpandedSeasons((prev) => ({
            ...prev,
            [`-${seasonId}`]: !prev[`-${seasonId}`],
        }));
    };
    return (
        <>
        <tr className="row-season">
            <td>{season.id}</td>
            <td>↳ {season.title}</td>
            <td></td>
            <td className="action-buttons">
                <button onClick={() => toggleSeason(season.id)}>
                    {expandedSeasons[season.id] ? '▲' : '▼'}
                </button>
                <button className="edit-btn" >✏️</button>
                <button className="delete-btn">🗑️</button>
            </td>
        </tr>
        {expandedSeasons[season.id] &&
        season.episodes.map((episode) => (
            <AbmEpisode key={episode.id} episode={episode}/>
        ))}
        </>
    )
    
}

AbmSeason.propTypes = {
    season: PropTypes.object
}

export default AbmSeason