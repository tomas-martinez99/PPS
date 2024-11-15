import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../../../services/homeServices";
import "./preReproMovie.css"; // Importar los estilos
import MediaList from "../../shared/MediaList";
import { getMovieByGenre } from "../../../services/movieServices";
import { useNavigate } from "react-router-dom";
import {
  addFavorites,
  deleteFavorite,
  getFavorites,
} from "../../../services/FavoritesService";
import { AuthenticationContext } from "../../../services/Authentication.context";

const PreReproMovie = () => {
  const { user } = useContext(AuthenticationContext);
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [related, setRelated] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [showInformation, setShowInformation] = useState(true);
  const [showRelated, setShowRelated] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const result = await getMovieById(movieId);
        setMovie(result);
        console.log(result);
      } catch (error) {
        setError(error);
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchMovie();
  }, [movieId]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const result = await getFavorites();
        setFavorites(result);
        console.log("favorites", result);
      } catch (error) {
        setError(error);
        console.error("There was a problem with the fetch operation:", error);
      }
    };
    fetchFavorites();
  }, []);

  const addToMyList = async (movie) => {
    try {
      const request = {
        id: movie.id,
        type: 0,
      };
      const response = await addFavorites(request);
      console.log("Película agregada a la lista:", response);

      setFavorites((prevFavorites) => [...prevFavorites, movie]);
    } catch (error) {
      console.error(
        "No se pudo agregar la película a la lista:",
        error.message
      );
    }
  };

  const deletefromMyList = async (movieId) => {
    try {
      const response = await deleteFavorite(movieId, 0);
      console.log("Película eliminada a la lista:", response);
      setFavorites((prevFavorites) =>
        prevFavorites.filter((fav) => fav.id !== movieId)
      );
    } catch (error) {
      console.error(
        "No se pudo eliminar la película a la lista:",
        error.message
      );
    }
  };

  const fetchMoviesByAllGenres = async (genres) => {
    try {
      const promises = genres.map((genre) => getMovieByGenre(genre));
      // Esperamos a que todas las promesas se resuelvan
      const results = await Promise.all(promises);

      const peliculas = [
        ...new Map(
          results.flat().map((movie1) => [movie1.id, movie1])
        ).values(),
      ];

      setRelated(peliculas);
    } catch (error) {
      setError(error);
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const handleWatchMovie = (movieId) => {
    navigate(`/watch/${movieId}`);
  };

  const handleShowInformation = () => {
    setShowRelated(false);
    setShowInformation(true);
  };

  const handleShowRelated = () => {
    setShowInformation(false);
    setShowRelated(true);
    fetchMoviesByAllGenres(movie.genres);
  };

  return (
    <div>
      <div className="pre-repro-container">
        <div className="pre-repro-data">
          <div>
            <h3 className="pre-repro-title">{movie.title}</h3>
            {movie.year == new Date().getFullYear && <p>Nuevo</p>}
          </div>
          <p className="sinopsis">{movie.synopsis}</p>
          <div className="buttons">
            <button
              className="see-button"
              onClick={() => handleWatchMovie(movie.id)}
            >
              Ver Ahora
            </button>

            {user &&
              (favorites.find((fav) => fav.title == movie.title) ? (
                <button
                  className="add-list-button"
                  onClick={() => deletefromMyList(movie.id)}
                >
                  Eliminar de mi lista
                </button>
              ) : (
                <button
                  className="add-list-button"
                  onClick={() => addToMyList(movie)}
                >
                  Agregar a mi lista
                </button>
              ))}
          </div>
        </div>
        <img
          className="pre-repro-image"
          src={movie.movieCoverUrl}
          alt={movie.title}
          onError={(e) => (e.target.src = "/no-image.png")}
        />
      </div>
      <div className="extra-container">
        <button
          onClick={handleShowInformation}
          className={showInformation ? "active" : ""}
        >
          Información
        </button>
        <button
          onClick={handleShowRelated}
          className={showRelated ? "active" : ""}
        >
          Relacionados
        </button>
      </div>
      <div className="separator"></div>
      {showRelated && (
        <div>
          <MediaList movies={related} />
        </div>
      )}
      {showInformation && (
        <div className="info-container">
          <p>
            Título: <strong>{movie.title}</strong>
          </p>
          <p>
            Año: <strong>{movie.year}</strong>
          </p>
          <p>
            Duración: <strong>{movie.duration}</strong>
          </p>
          <p>
            Géneros: <strong>{movie.genres?.join(", ")}</strong>
          </p>
          <p>
            Director: <strong>{movie.director}</strong>
          </p>
          <p>
            Idiomas: <strong>{movie.language}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default PreReproMovie;
