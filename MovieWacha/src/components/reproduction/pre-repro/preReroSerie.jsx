import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieById } from "../../../services/homeServices";
import "./preReproMovie.css"; // Importar los estilos
import MediaList from "../../shared/MediaList";
import { getMovieByGenre } from "../../../services/movieServices";
import {
  getEpisodeFromSeason,
  getSerieById,
} from "../../../services/seriesServices";
import {
  addFavorites,
  deleteFavorite,
  getFavorites,
} from "../../../services/FavoritesService";
import { AuthenticationContext } from "../../../services/Authentication.context";

const PreReproSerie = () => {
  const { user } = useContext(AuthenticationContext);

  const navigate = useNavigate();
  const { serieId } = useParams();
  const [serie, setSerie] = useState({});
  const [temporadas, setTemporadas] = useState([]);
  const [temporadaSelected, setTemporadasSelected] = useState(1);
  const [episodes, setEpisodes] = useState([]);
  const [related, setRelated] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);

  const [showInformation, setShowInformation] = useState(false);
  const [showRelated, setShowRelated] = useState(false);
  const [showTemporadas, setShowTemporadas] = useState(true);

  const fetchEpisodeFromSerie = async () => {
    try {
      const result = await getEpisodeFromSeason(temporadaSelected);
      setEpisodes(result);
    } catch (error) {
      setError(error);
      console.error("There was a problem with the fetch operation:", error);
    }
  };
  useEffect(() => {
    const fetchSerie = async () => {
      try {
        const result = await getSerieById(serieId);
        setSerie(result);
        setTemporadas(result.seasons);
      } catch (error) {
        setError(error);
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchSerie();
    fetchEpisodeFromSerie();
  }, [serieId, temporadaSelected]);

  const handleChangeTemporada = (e) => {
    setTemporadasSelected(e.target.value);

    fetchEpisodeFromSerie();
  };

  // FALTA SERIES POR GENERO

  //   const fetchMoviesByAllGenres = async (genres) => {
  //     try {
  //       const promises = genres.map((genre) => getMovieByGenre(genre));
  //       // Esperamos a que todas las promesas se resuelvan
  //       const results = await Promise.all(promises);

  //       const peliculas = [
  //         ...new Map(
  //           results.flat().map((movie1) => [movie1.id, movie1])
  //         ).values(),
  //       ];

  //       setRelated(peliculas);
  //     } catch (error) {
  //       setError(error);
  //       console.error("There was a problem with the fetch operation:", error);
  //     }
  //   };

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const result = await getFavorites();
        setFavorites(result);
      } catch (error) {
        setError(error);
        console.error("There was a problem with the fetch operation:", error);
      }
    };
    fetchFavorites();
  }, []);

  const addToMyList = async (serie) => {
    try {
      const request = {
        id: serie.id,
        type: 1,
      };
      const response = await addFavorites(request);

      setFavorites((prevFavorites) => [...prevFavorites, serie]);
    } catch (error) {
      console.error("No se pudo agregar la Serie a la lista:", error.message);
    }
  };

  const deletefromMyList = async (serieId) => {
    try {
      const response = await deleteFavorite(serieId, 1);
      setFavorites((prevFavorites) =>
        prevFavorites.filter((fav) => fav.id !== serieId)
      );
    } catch (error) {
      console.error("No se pudo eliminar la Serie a la lista:", error.message);
    }
  };

  const handleShowInformation = () => {
    setShowRelated(false);
    setShowTemporadas(false);
    setShowInformation(true);
  };

  const handleShowTemporadas = () => {
    setShowInformation(false);
    setShowRelated(false);
    setShowTemporadas(true);
  };

  const handleShowRelated = () => {
    setShowInformation(false);
    setShowTemporadas(false);
    setShowRelated(true);
    // FALTA SERIES POR GENERO

    //fetchMoviesByAllGenres(movie.genres);
  };

  const handleWatchSerie = () => {
    navigate("/watch-serie/" + serieId);
  };

  return (
    <div>
      <div className="pre-repro-container">
        <div className="pre-repro-data">
          <div>
            <h3 className="pre-repro-title">{serie.title}</h3>
            {serie.year == new Date().getFullYear && <p>Nuevo</p>}
          </div>
          <p className="sinopsis">{serie.synopsis}</p>
          <div className="buttons">
            <button
              className="see-button"
              onClick={() => handleWatchSerie(serie.id)}
            >
              Ver Ahora Cap 1
            </button>
            {user &&
              (favorites.find((fav) => fav.title == serie.title) ? (
                <button
                  className="add-list-button"
                  onClick={() => deletefromMyList(serie.id)}
                >
                  Eliminar de mi lista
                </button>
              ) : (
                <button
                  className="add-list-button"
                  onClick={() => addToMyList(serie)}
                >
                  Agregar a mi lista
                </button>
              ))}
          </div>
        </div>
        <img
          className="pre-repro-image"
          src={serie.serieCoverUrl}
          alt={serie.title}
          onError={(e) => (e.target.src = "/no-image.png")}
        />
      </div>
      <div className="extra-container">
        <button
          onClick={handleShowTemporadas}
          className={showTemporadas ? "active" : ""}
        >
          Temporadas
        </button>
        <button
          onClick={handleShowInformation}
          className={showInformation ? "active" : ""}
        >
          Información
        </button>
        {/* <button
          onClick={handleShowRelated}
          className={showRelated ? "active" : ""}
        >
          Relacionados
        </button> */}
      </div>
      <div className="separator"></div>
      {showRelated && (
        <div>
          <MediaList serie={related} />
        </div>
      )}
      {showInformation && (
        <div className="info-container">
          <p>
            Título: <strong>{serie.title}</strong>
          </p>
          <p>
            Temporadas: <strong>{serie.seasons?.length}</strong>
          </p>
          <p>
            Géneros: <strong>{serie.genres?.join(", ")}</strong>
          </p>
          <p>
            Director: <strong>{serie.director}</strong>
          </p>
          <p>
            Idiomas: <strong>{serie.language}</strong>
          </p>
        </div>
      )}
      {showTemporadas && (
        <div className="container my-3">
          <div className="row">
            <div className="col-md-1">
              <div className="tempo-container">
                <h5 className="mb-2">Temporadas:</h5>
                <select
                  className="form-select"
                  name=""
                  id=""
                  onChange={(e) => handleChangeTemporada(e)}
                >
                  {temporadas.map((tempo) => (
                    <option key={tempo.id} value={tempo.id}>
                      {tempo.seasonNumber}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-12 mt-4">
              <div className="ep-container">
                <MediaList key={episodes.length} ep={episodes}></MediaList>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreReproSerie;
