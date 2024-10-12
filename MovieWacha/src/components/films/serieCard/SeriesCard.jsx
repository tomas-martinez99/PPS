import  { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import "./SeriesCard.css"
import "../../../App.css"
import { AuthenticationContext } from '../../../services/Authentication.context';

const SeriesCard = () => {
    const [selectedSeason, setSelectedSeason] = useState()
    const location = useLocation();
    const navigate = useNavigate();
    const {user} = useContext(AuthenticationContext)

    if (!location.state || !location.state.serie) {
        return <div>No se encontraron los datos de la serie.</div>;
    }

    const { serie } = location.state

    const handleChangeSelectedSeason = (e) => {
        setSelectedSeason(e.target.value)
    }

    const loginClick = () =>{
        navigate("/login")
      }

    const selectedSeasonData = serie.seasons.find(season => season.name === selectedSeason);
    const filteredEpisodes = selectedSeasonData ? selectedSeasonData.episodes : []; // Obtener episodios de la temporada seleccionada


    return (
        <div className="container">
            <div className="image-container">
                <img src={serie.img} />
            </div>
            <div className='right-container'>
                <h2 className='title'>{serie.title}</h2>
                <select className='select-custom' onChange={handleChangeSelectedSeason} value={selectedSeason} >
                    <option value="" >Seleccione una temporada</option>
                    {serie.seasons.map(s => (
                        <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                </select>
            </div>
            <div className="title">
                <h2>{selectedSeason}</h2>
                <ul className='item-list'>
                    {filteredEpisodes.map(c => (
                        <li className='item-list li' key={c.id}>
                            <p className='item-text'>{c.name}</p>
                            <div className='button1 button'>
                                {user?.rol === 2 ? <button>Ver Capitulo</button>
                                    : <button onClick={loginClick}>Ver Capitulo</button>}
                            </div>
                        </li>

                    ))}
                </ul>
            </div>
            <div className="col-span-2 row-span-2 row-start-4">5</div>
        </div>


    )
}

SeriesCard.propTypes = {}

export default SeriesCard