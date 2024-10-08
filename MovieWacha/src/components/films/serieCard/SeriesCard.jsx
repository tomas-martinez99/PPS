import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'

const SeriesCard = () => {
    const [selectedSeason, setSelectedSeason] = useState()
    const location = useLocation();

    if (!location.state || !location.state.serie) {
        return <div>No se encontraron los datos de la serie.</div>;
    }

    const { serie } = location.state

    const handleChangeSelectedSeason = (e) =>{
        setSelectedSeason(e.target.value)
    }

    const selectedSeasonData = serie.seasons.find(season => season.name === selectedSeason);
    const filteredEpisodes = selectedSeasonData ? selectedSeasonData.episodes : []; // Obtener episodios de la temporada seleccionada


    return (
        <div className="grid grid-cols-5 grid-rows-5 gap-4">
            <div className="col-span-2 row-span-3">
                <img src={serie.img}/>
            </div>
            <div className="col-span-3 col-start-3">
                <h2>{serie.title}</h2>
                <select onChange={handleChangeSelectedSeason} value={selectedSeason}>
                 {serie.seasons.map(s => (
                    <option key={s.id} value={s.name}>{s.name}</option>
                 ))}
                </select>
            </div>
            <div className="col-span-3 row-span-4 col-start-3 row-start-2">
                <h2>{selectedSeason}</h2>
                <ul>
                {filteredEpisodes.map(c =>(
                    <li key={c.id}>{c.name}</li>
                    
                ))}
                </ul>
            </div>
            <div className="col-span-2 row-span-2 row-start-4">5</div>
        </div>


    )
}

SeriesCard.propTypes = {}

export default SeriesCard