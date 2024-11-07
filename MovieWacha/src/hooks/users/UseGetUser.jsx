mport { useEffect, useState } from 'react';
const API_URL = "https://localhost:7289/api";

const UseGetUser = (movieId) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        try{
          const response = await fetch(API_URL + '/movies/get/' + movieId, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
          if(response.status === 400){
            throw new Error('Error al modificar la pelicula')
          }
          if(response.status === 404){
            throw new Error('Pelicula no encontrada')
          }
          if (!response.ok) {
            throw new Error('Error al obtener la pelicula');
          }
  
          const dataResult = await response.json();
          setData(dataResult);
          setIsLoading(false);
          setError(null);
  
        }catch (error) {
          setError(error.message);
          setIsLoading(false);
        }
      };
  
      fetchData();
    }, []);
    

    return [data, isLoading, error];
  };
  
  export default UseGetUser;