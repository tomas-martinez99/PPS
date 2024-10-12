import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { useLocation, useNavigate } from 'react-router-dom'
import "./MoviesCard.css"
import { Button } from 'react-bootstrap';
import { AuthenticationContext } from '../../../services/Authentication.context';

const MoviesCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {user} = useContext(AuthenticationContext)

  const loginClick = () =>{
    navigate("/login")
  }
  if (!location.state || !location.state.movie) {
    return <div>No se encontraron los datos de la película.</div>;
  }
  const { movie } = location.state;
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card"> {/* Clase de la card ajustada */}
        {/* Imagen a la izquierda */}
        <img
          src={movie.img}
          alt={movie.title}
          className="card-image"
        />
        {/* Contenido a la derecha */}
        <div className="card-content">
          {/* Nombre */}
          <div className="card-title">
            <h2 className="text-lg font-bold">{movie.title}</h2>
          </div>
          {/* Puntuación */}
          <div className="card-rating">
            <p className="text-sm">Puntuación: ★★★★☆</p>
          </div>
          {/* Datos adicionales */}
          <div className="card-details"> {/* Asegúrate de que este nombre coincida */}
            <p className="text-sm">Director: {movie.director}</p>
            <p className="text-sm">Año: {movie.year}</p>
            <p className="text-sm">Duración: {movie.duration}</p>
            <p className="text-sm">Género: {movie.genre}</p>
          </div>
            {user?.rol ===2 ?<button className='button1'>Ver Pelicula</button>
            :<button className='button1' onClick={loginClick}>Ver Pelicula</button>}
          
        </div>
      </div>
    </div>
  );
};

MoviesCard.propTypes = {}

export default MoviesCard