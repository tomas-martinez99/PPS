import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getEpisodeById } from '../../../../services/seriesServices'

const ModalUpdateEpisode = ({id, onClose}) => {
    const [episode, setEpisode] = useState (null)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getEpisodeById(id); // getEpisodeById debe estar definido en tu servicio.
                setEpisode(result);
                console.log(result, "Episodio a editar");
            } catch (err) {
                console.log(err.message);
            }
        };
        fetchData();
    }, [id]);
  return (
    <div>ModalUpdateEpisode
        {episode && <div>{episode.title}</div>} {/* Ejemplo para mostrar detalles del episodio */}
    </div>
  )
}

ModalUpdateEpisode.propTypes = {}

export default ModalUpdateEpisode