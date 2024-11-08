import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../../../services/homeServices";
import "./preReproMovie.css"; // Importar los estilos
import MediaList from "../../shared/MediaList";
import { getMovieByGenre } from "../../../services/movieServices";
import { getSerieById } from "../../../services/seriesServices";

const PreReproSerie = () => {
  const { serieId } = useParams();
  const [serie, setSerie] = useState({});
  const [related, setRelated] = useState([]);
  const [error, setError] = useState(null);

  const [showInformation, setShowInformation] = useState(true);
  const [showRelated, setShowRelated] = useState(false);

  useEffect(() => {
    const fetchSerie = async () => {
      try {
        const result = await getSerieById(serieId);
        setSerie(result);
        console.log(result);
      } catch (error) {
        setError(error);
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    const fetchEpisodeFromSerie = async () => {
      try{
        const result = await getEpisodeFromSeason(serieEpisode)
      } catch (error) {
        setError(error);
        console.error("There was a problem with the fetch operation:", error);
      }
    }

    fetchSerie();
    fetchEpisodeFromSerie();
  }, [serieId]);

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

  const handleShowInformation = () => {
    setShowRelated(false);
    setShowInformation(true);
  };

  const handleShowRelated = () => {
    setShowInformation(false);
    setShowRelated(true);
    // FALTA SERIES POR GENERO

    //fetchMoviesByAllGenres(movie.genres);
  };
  console.log(serie);

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
              Ver Ahora
            </button>

            <button
              className="add-list-button"
              onClick={() => addToMyList(serie.id)}
            >
              Agregar a mi lista
            </button>
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
    </div>
  );
};

export default PreReproSerie;
