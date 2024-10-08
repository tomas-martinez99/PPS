import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getMovies, getSeries } from '../../services/movieServices';
import { AuthenticationContext } from '../../services/Authentication.context'
import MoviesList from '../films/moviesList/MoviesList';
const Dashboard = () => {
  
  const [movies, setMovies] = useState([])
  const [series, setSeries] = useState([])
  const [error, setError] = useState()
  const {user} = useContext(AuthenticationContext)

  useEffect(() =>{
    const fetchMovies = async () =>{
      try{
        const result = await getMovies();;
        setMovies(result)
      } catch(error){
        setError(error.message)
      }
    };
    const fetchSeries = async () =>{
      try{
        const result = await getSeries();;
        setSeries(result)
      } catch(error){
        setError(error.message)
      }
    };
    fetchMovies()
    fetchSeries()
  }, [])

  if(error) return <div>{error}</div>
  return (
    <div >
      {user && user.rol === 0 &&
        <div>Soy admin</div>
      } 
       {user?.rol === 2 || !user &&
        <div >
            <MoviesList movies={movies} series={series}/>
          </div>
      } 
    </div>
  )
}

Dashboard.propTypes = {}

export default Dashboard