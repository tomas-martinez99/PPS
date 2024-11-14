import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import AbmEpisode from '../abmEpisode/AbmEpisode';
import { deleteSeason, getSeason } from '../../../services/seriesServices';
import ModalUpdateSeason from '../modalAdd-Edit/season-modals/ModalUpdateSeason';
import ModalAddEpisode from '../modalAdd-Edit/episode-Modal/ModalAddEpisode';

const AbmSeason = ({ serieId }) => {
    const [expandedSeasons, setExpandedSeasons] = useState({})//Estados Mostrar episodios
    const [showModalEditSeason, setShowModalEditSeason] = useState(false)
    const [showModalAddEpisode, setShowModalAddEpisode] = useState(false)
    const [selectedSeasonId, setSelectedSeasonId] = useState(null)
    const [episode, setEpisode] =useState()
    const [season, setSeasons] = useState([])
    //Mostrar los episodios
    const toggleSeason = (seasonId) => {
        setExpandedSeasons((prev) => ({
            ...prev,
            [seasonId]: !prev[seasonId],
        }));
    };


    useEffect(() => {
        // Función para cargar los datos
        const fetchData = async () => {
            try {
                const result = await getSeason(serieId); // Guardar datos en el estado
                console.log(result)
                setSeasons(result)
            } catch (err) {
                console.log(err.message)
            }
        };

        fetchData();
    }, [serieId]);

    const handleDeleteSeason = (id) =>{
        console.log(id)
        deleteSeason(id)
    }
    const handleAddEpisode= (id)=>{
        console.log(id)
        setShowModalAddEpisode(true)
        setSelectedSeasonId(id)
    }

    const handleSelectEditSeason = (id) =>{
        setShowModalEditSeason(true)
        setSelectedSeasonId(id)
    }

    const handleCloseModal = () =>{
        setShowModalEditSeason(false)
        setShowModalAddEpisode(false)
    }
    return (
        
            <>
            {showModalEditSeason && <ModalUpdateSeason seasonId ={selectedSeasonId} onClose={handleCloseModal} />}
             {showModalAddEpisode && <ModalAddEpisode seasonId ={selectedSeasonId}  onClose={handleCloseModal}  />} 
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
                            <button className="edit-btn" onClick={() => handleSelectEditSeason(season.id)}><i className="fa-solid fa-pen"></i></button>
                            <button className="delete-btn" onClick={()=> handleDeleteSeason(season.id)}><i className="fa-solid fa-trash"></i></button>
                            <button className='add-btn'onClick={()=>handleAddEpisode(season.id)}><i className="fa-solid fa-plus"></i></button>
                        </td>
                    </tr>
                    {expandedSeasons[season.id] && (
                        <tr>
                            <td colSpan="4">
                                <AbmEpisode seasonId={season.id} />
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
    serieId: PropTypes.number
}

export default AbmSeason