import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "./MoviesList.css"
import { useNavigate } from 'react-router-dom';

const MoviesList = ({ movies, series }) => {
  const [combinedByGenre, setCombinedByGenre] = useState({});

  const navigate = useNavigate()

  const handlerMovieCard = (movie) => {
    navigate("/moviesCard", { state: { movie } })
  }
  const handlerSerieCard = (serie) => {
    navigate("/seriesCard", { state: { serie } })
  }

  const combinedGenres = () => {
    const combined = {};
    const addByGenre = (items) => {
      if (!items || items.length === 0) return;

      items.forEach((item) => {
        const genres = item.genres || [item.genre];
        genres.forEach((genre) => {
          if (!combined[genre]) {
            combined[genre] = [];
          }
          combined[genre].push({ ...item });
        });
      });

    };
    addByGenre(movies, 'movies');
    addByGenre(series, 'series');

    setCombinedByGenre(combined);
  }
  React.useEffect(() => {
    combinedGenres();
  }, [movies, series])
  return (
    <div>
      {Object.keys(combinedByGenre).map((genre) => (
        <div key={genre}>
          <h2>{genre}</h2>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            slidesPerView={7}
            navigation
            loop={true}
          >
            {/* Mostrar películas y series juntas */}
            {combinedByGenre[genre].map((item, index) => (
              <SwiperSlide key={index}>
                <div className="movie-card">
                  <div className="image-container">
                    <img src={item.img} alt={item.title} />
                    {item.type === 0 && (
                      <button className="view-button" onClick={() => handlerMovieCard(item)}>Ver Película</button>
                    )}
                    {item.type === 1 && (
                      <button className="view-button" onClick={() => handlerSerieCard(item)}>Ver Serie</button>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ))}
    </div>
  )
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
  })
  ).isRequired,
  series: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired, 
      img: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default MoviesList