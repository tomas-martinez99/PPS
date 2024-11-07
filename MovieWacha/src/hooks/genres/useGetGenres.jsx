import { useEffect, useState } from 'react';
const API_URL = "https://localhost:7289/api";

const useGetGenres = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        try{
          const response = await fetch(API_URL + '/genre/get-all', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
          if (!response.ok) {
            throw new Error('Error al obtener los generos');
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
    

    return [data, isLoading, error, setData];
  };
  
  export default useGetGenres;