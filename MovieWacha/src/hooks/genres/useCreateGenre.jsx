import React, { useState } from 'react'
const API_URL = "https://localhost:7289/api";

const useCreateGenre = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createGenre = async (genreData) => {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    console.warn(genreData)
    try{
        const response = await fetch(API_URL + "/genre/create", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            },
            body: JSON.stringify(genreData),
        });

        
        if(response.status === 401 || response.status === 403){
            throw new Error("Usted no esta autorizado para hacer esta accion");
        }

        if(response.status === 400){
            throw new Error("Un error ha ocurrido al crear el genero, revisa la consola");
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
  return [data, isLoading, error, createGenre];
}

export default useCreateGenre;