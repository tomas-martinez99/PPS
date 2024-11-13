import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import ExampleCarouselImage from "../../ExampleCarouselImage";
import "./home.css";
import {
  getAllMovies,
  getMoviesShowCase,
} from "../../../services/homeServices";
import { useNavigate } from "react-router-dom";
import MediaList from "../../shared/MediaList";
import { getSeries } from "../../../services/seriesServices";
import {
  addFavorites,
  deleteFavorite,
  getFavorites,
} from "../../../services/FavoritesService";

const Home = () => {
  const [error, setError] = useState(null);
  const [movieShowcase, setMovieShowcase] = useState([]);
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  const [url, setUrl] = useState(window.location.pathname);

  console.log(url);

  useEffect(() => {
    const fetchShowCaseMovies = async () => {
      try {
        const result = await getMoviesShowCase();
        setMovieShowcase(result);
        console.log("Peliculas Cargada en home", result);
      } catch (error) {
        setError(error);
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    const fetchAllMovies = async () => {
      try {
        const result = await getAllMovies();
        setMovies(result);
        console.log(result);
      } catch (error) {
        setError(error);
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    const fetchAllSeries = async () => {
      try {
        const result = await getSeries();
        setSeries(result);
        console.log(result);
      } catch (error) {
        setError(error);
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchShowCaseMovies();
    fetchAllMovies();
    fetchAllSeries();
  }, []);

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

  const handleWatchMovie = (movieId) => {
    navigate(`/watch/${movieId}`);
  };

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

  return (
    <div>
      {url.includes("movies") ||
        (url == "/" && (
          <div className="carousel-container">
            <Carousel>
              {movieShowcase.map((movie, index) => (
                <Carousel.Item key={index}>
                  <ExampleCarouselImage text={movie.showCaseImageUrl} />
                  <Carousel.Caption className="caption-center-left">
                    <h3>{movie.title}</h3>
                    <p className="sinopsis">{movie.synopsis}</p>
                    <div className="buttons">
                      <button
                        className="see-button"
                        onClick={() => handleWatchMovie(movie.id)}
                      >
                        Ver pelicula
                      </button>
                      {favorites.find((fav) => fav.title == movie.title) ? (
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
                      )}
                    </div>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        ))}
      {error && <div>Error: {error.message}</div>}
      <div className="media-container">
        <MediaList
          movies={url.includes("movies") || url == "/" ? movies : []}
          series={url.includes("series") || url == "/" ? series : []}
        ></MediaList>
      </div>
    </div>
  );
};
export default Home;
