import React from 'react'
import PropTypes from 'prop-types'

const AbmEpisode = ({episode}) => {
    return (
        <tbody>
        <tr className="row-episode" key={episode.id}>
            <td>{episode.id}</td>
            <td>↳ ↳ {episode.title}</td>
            <td></td>
            <td className="action-buttons">
                <button className="edit-btn" >✏️</button>
                <button className="delete-btn">🗑️</button>
            </td>
        </tr>
        </tbody>
    )
}

AbmEpisode.propTypes = {
    episode: PropTypes.object
}

export default AbmEpisode