import React, { useEffect, useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from '../../ExampleCarouselImage';
import "./home.css";
import { getMoviesShowCase } from "../../../services/homeServices";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [movieShowcase, setMovieShowcase] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getMoviesShowCase();
        setMovieShowcase(result);
        console.log("Peliculas Cargada en home",result);
      } catch (error) {
        setError(error);
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchData();
  }, []);

  const handleWatchMovie = (movieId) => {
    navigate(`/watch/${movieId}`);
  };
  return (
    <div>
      <div className="carousel-container">
        <Carousel>
          {movieShowcase.map((movie, index) => (
            <Carousel.Item key={index}>
              <ExampleCarouselImage text={movie.showCaseImageUrl} />
              <Carousel.Caption className="caption-center-left">
                <h3>{movie.title}</h3>
                <h5>{movie.synopsis}</h5>
                <button className="see-button" onClick={() => handleWatchMovie(movie.id)}>Ver pelicula</button>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      {error && <div>Error: {error.message}</div>}
    </div>
  );
};
export default Home;