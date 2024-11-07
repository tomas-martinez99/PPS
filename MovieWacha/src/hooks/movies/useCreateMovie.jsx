import React, { useState } from 'react'
const API_URL = "https://localhost:7289/api";

const useCreateMovie = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createMovie = async (movieData) => {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    
    try{
        const response = await fetch(API_URL + "/movies/create", {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}` 
            },
            body: movieData,
        });

        if(!response.ok){
            throw new Error("Un error ha ocurrido al crear la pelicula");
        }
        
        const dataResult = await response.text();

        setData(dataResult);
        setIsLoading(false);
        setError(null);
    }
    catch(error){
        setError(error.message);
        setData(null);
        setIsLoading(false);
    }
  };
  return [data, isLoading, error, createMovie];
}

export default useCreateMovie;