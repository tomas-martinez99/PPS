import  { useState } from 'react'
import PropTypes from 'prop-types'
import "../../modalAdd-Edit/ModalAdd.css"
import { addSeason } from '../../../../services/seriesServices'

const ModalAddSeason = ({id, onClose}) => {
    const [seasonNumeber, setSeasonNumber] = useState("")
    const [serieId, setSerieId] = useState(id)
    const handleSave = async () =>{
        
        const seasonData ={
            serieId: serieId,
            seasonNumber: seasonNumeber
        }
    try{
        await addSeason(seasonData);
        console.log("season agregada correctamente");
        setSeasonNumber("")
        setSerieId("")
        onClose()
    }catch (error) {
        console.error('Error al guardar la serie:', error);
    }}   
  return (
    <div className="modal-overlay">
            <div className="modal-content">
                <h2>Agregar Temporada</h2>
            
                <label>
                    Ingrese El numero de la Temporada
                    <input
                        type="text"
                        placeholder="Numero de temporada"
                        value={seasonNumeber}
                        onChange={ (e)=> setSeasonNumber(e.target.value )}
                        required
                    />
                </label>
                <button onClick={handleSave} className="save-button">Agregar Temporada</button>
                <button onClick={onClose} className="cancel-button">Cancelar</button>
            </div>
        </div>
    );
  
}

ModalAddSeason.propTypes = {
    id: PropTypes.number,
    onClose: PropTypes.func.isRequired
}

export default ModalAddSeason