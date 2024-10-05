import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { AuthenticationContext } from '../../services/Authentication.context'
import MoviesList from '../films/moviesList/MoviesList';
const MOVIES = [
  {
    id: 1,
    title: "Inception",
    director: "Christopher Nolan",
    year: 2010,
    img:"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg",
    duration: 148,
    genre: "Sci-Fi",
    type: 0
  },
  {
    id: 2,
    title: "The Godfather",
    director: "Francis Ford Coppola",
    year: 1972,
    img:"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    duration: 175,
    genre: "Crime",
    type: 0
  },
  {
    id: 3,
    title: "The Dark Knight",
    director: "Christopher Nolan",
    year: 2008,
    img:"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    duration: 152,
    genre: "Action",
    type: 0
  },
  {
    id: 4,
    title: "Deadpool & Wolverine",
    director: "Shawn Levy",
    year: 2024,
    img:"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/jbwYaoYWZwxtPP76AZnfYKQjCEB.jpg",
    duration: 128,
    genre: "Action",
    type: 0
  },
  {
    id: 5,
    title: "The Matrix",
    director: "The Wachowskis",
    year: 1999,
    img:"https://image.tmdb.org/t/p/original/53McB8R9RUBxfINRxWaPwUMtL5Q.jpg",
    duration: 136,
    genre: "Sci-Fi",
    type: 0
  },
  {
    id: 6,
    title: "Avengers: Infinity War",
    director: "Joe Russo",
    year: 2018,
    img:"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
    duration: 149,
    genre: "Sci-Fi",
    type: 0
  },
  {
    id: 7,
    title: "Avengers: Infinity War",
    director: "Joe Russo",
    year: 2018,
    img:"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
    duration: 149,
    genre: "Sci-Fi",
    type: 0
  },
  {
    id: 8,
    title: "Avengers: Infinity War",
    director: "Joe Russo",
    year: 2018,
    img:"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
    duration: 149,
    genre: "Sci-Fi",
    type: 0
  }
];


const Dashboard = () => {
  
  const [movies, setMovies] = useState(MOVIES)
  const {user} = useContext(AuthenticationContext)
  return (
    <div >
      
      <MoviesList movies={movies}/>
      {user && user.rol === 0 &&
        <div>Soy admin</div>
      } 
       {user && user.rol === 2 &&
        <div >
          <h1 className="text-3xl font-bold">¡Hola con Tailwind CSS!</h1>
          </div>
      } 
      

    </div>
  )
}

Dashboard.propTypes = {}

export default Dashboard