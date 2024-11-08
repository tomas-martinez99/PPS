import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { updateSeason } from '../../../../services/seriesServices'

const ModalUpdateSeason = ({ seasonId, onClose }) => {
    const [seasonNumber, setSeasonNumber] = useState("")
    
    

   const handleSave = async () => {
        
        console.log(seasonId)
        const seasonData = {
            seasonNumber: seasonNumber
        }
        try {
            await updateSeason(seasonId, seasonData);
            console.log("temporada actualizada")
            setSeasonNumber("")
            onClose()
        } catch (error) {
            console.error('Error al guardar la serie:', error);
        }
    }

    return (
        <div className="modal-overlay">
        <div className="modal-content">
            <h2>Editar Temporada</h2>
        
            <label>
                Ingrese El numero de la Temporada
                <input
                    type="text"
                    placeholder="Numero de temporada"
                    value={seasonNumber}
                    onChange={ (e)=> setSeasonNumber(e.target.value )}
                    required
                />
            </label>
            <button onClick={handleSave } className="save-button">Guardar Cambios</button>
            <button onClick={onClose} className="cancel-button">Cancelar</button>
        </div>
    </div>
  )
}

ModalUpdateSeason.propTypes = {
    seasonId: PropTypes.string,
    onClose: PropTypes.func
}

export default ModalUpdateSeason