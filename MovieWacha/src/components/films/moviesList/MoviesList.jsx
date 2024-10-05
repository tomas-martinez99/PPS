import React from 'react'
import PropTypes from 'prop-types'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "./MoviesList.css"

const MoviesList = ({ movies }) => {
  return (
        <Swiper
          modules={[Navigation, Pagination]} // Añadir módulos si los necesitas
          spaceBetween={10} // Espacio entre las diapositivas
          slidesPerView={7} // Número de diapositivas que se muestran a la vez
          navigation // Activar navegación (anterior/siguiente)
          loop={true} // Habilitar el bucle infinito
        >
          {movies.map((movie, index) => (
            <SwiperSlide key={index}>
              <div className="movie-card">
                <div className="image-container">
                  <img src={movie.img} alt={movie.title} />
                  <button className="view-button">Ver Más</button>
                </div>
              </div>
            </SwiperSlide>))}
        </Swiper>
  )
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired // Agregar title para el alt en la imagen
  })
  ).isRequired,
}

export default MoviesList