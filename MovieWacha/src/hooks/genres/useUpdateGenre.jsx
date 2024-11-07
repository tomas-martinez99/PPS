import React, { useState } from 'react'
const API_URL = "https://localhost:7289/api";

const useUpdateGenre = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateGenre = async (id, genreData) => {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    
    try{
        const response = await fetch(API_URL + "/genre/update/" + id, {
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${token}` 
            },
            body: JSON.stringify(genreData),
        });

        
        if(response.status === 401 || response.status === 403){
            throw new Error("Usted no esta autorizado para hacer esta accion");
        }

        if(response.status === 400){
            throw new Error("Un error ha ocurrido al modificar el genero, revisa la consola");
        }

        if(response.status === 404){
            throw new Error("No se ha encontrado el genero a modificar");
        }

        
        setData("Success");
        setIsLoading(false);
        setError(null);
    }
    catch(error){
        setError(error.message);
        setData(null);
        setIsLoading(false);
    }
  };
  return [data, isLoading, error, updateGenre];
}

export default useUpdateGenre;