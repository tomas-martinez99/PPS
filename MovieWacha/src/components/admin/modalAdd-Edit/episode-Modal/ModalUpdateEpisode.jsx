import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { getEpisodeById } from '../../../../services/seriesServices'
import useUpdateEpisode from "../../../../hooks/episode/useUpdateEpisode";
import { Alert } from 'react-bootstrap';
const ModalUpdateEpisode = ({id, onClose}) => {
    const [episode, setEpisode] = useState (null)
    const [updadatedEpisode, isUpdateEpisodeLoading, isUpdateEpisodeError, updateEpisode] = useUpdateEpisode()
    const titleInputRef = useRef(null);
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

    useEffect(() => {
      if(episode){
        console.log(episode)
        titleInputRef.current.value = episode.title;
      }
    }, [episode]);

    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const formData = new FormData();
      const episodeVideoInput = event.target.elements.Media;
  
      formData.append("Title", titleInputRef.current.value);
      formData.append("Media", episodeVideoInput.files[0]);
   
      await updateEpisode(id,formData);


    };

  return (
  <div className="modal-overlay">
  <div className="modal-content">
    <form onSubmit={handleSubmit}>
      <label>
        Título:
        <input type="text" name="title" ref={titleInputRef} required />
      </label>
      <label>
        Video:
        <input type="file" name="Media" required />
      </label>
    

      {isUpdateEpisodeError && (
        <Alert variant="danger">{isUpdateEpisodeError}</Alert>
      )}
      {isUpdateEpisodeLoading && (
        <Alert variant="info">Modificando pelicula...</Alert>
      )}

      {updadatedEpisode && (
        <Alert variant="success">
          Episodio modificada exitosamente
        </Alert>
      )}
      <button type="submit" className="save-button">
        Modificar episodio
      </button>
      <button onClick={onClose} className="cancel-button">
        Cancelar
      </button>
    </form>
  </div>
</div>
);
}

ModalUpdateEpisode.propTypes = {
  id: PropTypes.number,
  onClose:PropTypes.func
}

export default ModalUpdateEpisode