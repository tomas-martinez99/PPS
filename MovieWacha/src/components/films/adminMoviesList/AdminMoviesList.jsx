import { useState } from 'react';
import PropTypes from 'prop-types'
import "./AdminMoviesList.css"
import "../../../App.css"
import { useNavigate } from 'react-router-dom';

function AdminMoviesList({ movies, series,onDeleteMovie, onDeleteSerie, onDeleteSeason, onDeleteEpisode }) {
  const [expandedSeries, setExpandedSeries] = useState(null);
  const [expandedSeason, setExpandedSeason] = useState(null);
  const navigate = useNavigate()

  const toggleSeries = (seriesId) => {
    setExpandedSeries(expandedSeries === seriesId ? null : seriesId);
  };

  const toggleSeason = (seasonId) => {
    setExpandedSeason(expandedSeason === seasonId ? null : seasonId);
  };

  const handleNewSerie = () => {
    navigate("/newSerie")
  }

  return (
    <div className='min-h-screen  flex justify-center items-center px-20'>
      <div className='space-y-10 w-full max-w-4xl'>
        <h2 className='text-center mt-10 text-4xl font-bold'>Películas</h2>
        <button className='button1 '>
                Agregar Pelicula
              </button>
        <ul className='p-8 mt-8 space-y-8 bg-gray-100 dark:bg-gray-800 rounded-xl'>
          {Array.isArray(movies) && movies.length > 0 ? (
            movies.map((movie) => (
              <li key={movie.id} className='flex items-center justify-between text-gray-800 bg-gray-100 dark:text-gray-200 dark:bg-gray-700 p-4 rounded-lg shadow-md w-full'>
              <p className='text-lg sm:text-xl flex-grow truncate'>
                {movie.title}
              </p>
              <button className='button2'onClick={() => onDeleteMovie(movie.id)}>
                Eliminar
              </button>
            </li> ))) : (
            <li className='text-center text-lg text-gray-500'>No hay películas disponibles.</li>)}
        </ul>
        <h2 className='text-center mt-10 text-4xl font-bold'>Series</h2>
        <button className='button1' onClick={handleNewSerie}> Agregar Serie</button>
    <ul className='p-8 mt-8 space-y-8 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg'>
      {Array.isArray(series) && series.length > 0 ? (
        series.map((serie) => (
          <li key={serie.id} className='flex flex-col   rounded-lg  overflow-hidden'>
            <div className='flex items-center justify-between bg-gray-200 dark:bg-gray-600 p-4'>
              <p className='text-lg sm:text-xl flex-grow truncate'>{serie.title}</p>
              {expandedSeries === serie.id ? "" :
              <button className='button2'onClick={() => onDeleteSerie(serie.id)} >
                Eliminar
              </button>}
              <button onClick={() => toggleSeries(serie.id)} className='button1'>
                {expandedSeries === serie.id ? 'Ocultar temporadas' : 'Ver temporadas'}
              </button>
            </div>
            {expandedSeries === serie.id && (
              <ul className='p-4 mt-2 space-y-4 bg-gray-50 dark:bg-gray-800 rounded-lg '>
                {serie.seasons.map((season) => (
                  <li key={season.id} className='flex items-center justify-between bg-gray-100 dark:bg-gray-600 p-4 rounded-lg shadow-md '>
                    <p className='text-lg sm:text-xl flex-grow truncate '>{season.name}</p>
                    {expandedSeason === season.id ? "":
                    <button className='button2' onClick={() => onDeleteSeason(serie.id, season.id)}  >
                      Eliminar
                    </button>}
                    <button onClick={() => toggleSeason(season.id)} className='button1'>
                      {expandedSeason === season.id ? 'Ocultar capítulos' : 'Ver capítulos'}
                    </button>
                    {expandedSeason === season.id && (
                      <ul className='mt-2'>
                        {season.episodes.map((episode) => (
                          <li key={episode.id} className='flex justify-between items-center bg-gray-200 dark:bg-gray-500 p-2 rounded-md'>
                            <p className='text-lg sm:text-xl flex-grow truncate'>{episode.name}</p>
                            <button  className='button2' onClick={() => onDeleteEpisode(serie.id, season.id,episode.id)}>Eliminar</button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li> ))) : (
        <li>No hay series disponibles.</li>
      )}
    </ul>
  </div>
</div>
  );
}

AdminMoviesList.propTypes = {
  movies: PropTypes.arrayOf.isRequired,
  series: PropTypes.arrayOf.isRequired,
  onDeleteMovie: PropTypes.func.isRequired,
  onDeleteSerie: PropTypes.func.isRequired,
  onDeleteSeason: PropTypes.func.isRequired,
  onDeleteEpisode: PropTypes.func.isRequired
}
export default AdminMoviesList;
