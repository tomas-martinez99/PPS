import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { deleteEpisode, getEpisode } from '../../../services/seriesServices';
import "../abmSeries/AbmSeries.css"
import ModalUpdateEpisode from "../modalAdd-Edit/episode-Modal/ModalUpdateEpisode";

const AbmEpisode = ({ seasonId }) => {
    const [episodes, setEpisodes] = useState([])
    const [selectedEpisodeId, setSelectedEpisodeId] = useState(null)
    const [isModalUpdateOpen, setModalUpdateOpen] = useState(false);
    const fetchEpisodes = async () => {
        try {
            const result = await getEpisode(seasonId);
            setEpisodes(result);
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        fetchEpisodes();
    }, [seasonId]);

    const handleOpenModalUpdateEpisode = (id) => {
        setSelectedEpisodeId(id)
        setModalUpdateOpen(true);
    }
    const handleCloseModalUpdateMovie = () => {
        setModalUpdateOpen(false);
    };

    const handleDeleteEpisode = (id) => {
        console.log(id)
        deleteEpisode(id)
    }
    return (
        <table>
            {isModalUpdateOpen && (
                <ModalUpdateEpisode
                    id={selectedEpisodeId}
                    onClose={handleCloseModalUpdateMovie}
                    
                />
            )
            }
            {episodes.length > 0 ? episodes.map((episode) => (
                <tr className="row-episode" key={episode.id}>
                    <td>{episode.id}</td>
                    <td>↳ ↳ {episode.title}</td>
                    <td></td>
                    <td className="action-buttons">
                        <button className="edit-btn" onClick={() => handleOpenModalUpdateEpisode(episode.id)}><i className="fa-solid fa-pen"></i></button>
                        <button className="delete-btn" onClick={() => handleDeleteEpisode(episode.id)}><i className="fa-solid fa-trash"></i></button>
                    </td>
                </tr>)) : <tr className="row-episode">
                <td className="row-episode"></td>
                <td className="row-episode">No hay episodios cargadas</td>
                <td className="row-episode"></td>
                <td className="row-episode"></td>
            </tr>}
        </table>
    )
}

AbmEpisode.propTypes = {
    seasonId: PropTypes.number
}

export default AbmEpisode