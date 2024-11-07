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

        
        if(response.status === 401 || response.status === 403){
            throw new Error("Usted no esta autorizado para hacer esta accion");
        }

        if(response.status === 400){
            throw new Error("Un error ha ocurrido al crear la pelicula, revisa la consola");
        }

        if(!response.ok){
            console.log(response);
            throw new Error("Ha ocurrido un error desconocido, revise la consola");
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