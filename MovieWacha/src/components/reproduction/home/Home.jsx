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

const Home = () => {
  const [error, setError] = useState(null);
  const [movieShowcase, setMovieShowcase] = useState([]);
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const navigate = useNavigate();

  const [url, setUrl] = useState(window.location.pathname);

  console.log(url);

  useEffect(() => {
    const fetchShowCaseMovies = async () => {
      try {
        const result = await getMoviesShowCase();
        setMovieShowcase(result);
        console.log(result);
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

  const handleWatchMovie = (movieId) => {
    navigate(`/watch/${movieId}`);
  };

  const addToMyList = (movieId) => {
    // FALTA
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

                      <button
                        className="add-list-button"
                        onClick={() => addToMyList(movie.id)}
                      >
                        Agregar a mi lista
                      </button>
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
