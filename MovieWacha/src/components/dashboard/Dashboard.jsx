import { useContext, useEffect, useState } from 'react'
import { getMovies, getSeries, deleteMovie, deleteSerie, deleteEpisode, deleteSeason } from '../../services/movieServices';
import { AuthenticationContext } from '../../services/Authentication.context'
import MoviesList from '../films/moviesList/MoviesList';
import AdminMoviesList from '../films/adminMoviesList/adminMoviesList';
const Dashboard = () => {

  const [movies, setMovies] = useState([])
  const [series, setSeries] = useState([])
  const [error, setError] = useState()
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthenticationContext)

  // Efecto para cargar películas y series
  useEffect(() => {
    const fetchMoviesAndSeries = async () => {
      try {
        const moviesResult = await getMovies();
        const seriesResult = await getSeries();
        setMovies(moviesResult);
        setSeries(seriesResult);
        console.log(movies)
        console.log(series)
        setLoading(false); // Datos cargados, detener el estado de carga
      } catch (error) {
        setError(error.message);
        setLoading(false); // Detener el estado de carga en caso de error
      }
    };

    fetchMoviesAndSeries();
  }, [AdminMoviesList]);

  // Funciones para manejar la eliminación de películas y series
  const handleDeleteMovie = async (id) => {
    try {
      await deleteMovie(id);
      setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteSeire = async (id) => {
    try {
      await deleteSerie(id);
      setSeries((prevSeries) => prevSeries.filter((serie) => serie.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteSeason = async (serieId, seasonId) => {
    try {
      console.log(serieId, seasonId)
      await deleteSeason(serieId, seasonId);
      setSeries((prevSeries) =>
        prevSeries.map((serie) =>
          serie.id === serieId
            ? { ...serie, seasons: serie.seasons.filter((season) => season.id !== seasonId) }
            : serie
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteEpisode = async (serieId, seasonId, episodeId) => {
    try {
      await deleteEpisode(serieId, seasonId, episodeId);
      setSeries((prevSeries) =>
        prevSeries.map((serie) =>
          serie.id === serieId
            ? {
              ...serie,
              seasons: serie.seasons.map((season) =>
                season.id === seasonId
                  ? { ...season, episodes: season.episodes.filter((episode) => episode.id !== episodeId) }
                  : season
              ),
            }
            : serie
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>

  return (
    <div >
      {user && user.rol === 0 && <AdminMoviesList
        movies={movies}
        series={series}
        onDeleteMovie={handleDeleteMovie}
        onDeleteSerie={handleDeleteSeire}
        onDeleteSeason={handleDeleteSeason}
        onDeleteEpisode={handleDeleteEpisode} />}
      {(!user || user.rol === 2) &&
        <div >
          <MoviesList movies={movies} series={series} />
        </div>
      }
    </div>
  )
}

Dashboard.propTypes = {}

export default Dashboard