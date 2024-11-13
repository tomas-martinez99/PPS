import React, { useState } from 'react'
const API_URL = "https://localhost:7289/api";

const useCreateEpisode = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createEpisode = async (episodeData) => {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    
    try{
        const response = await fetch(API_URL + "/series/add-episode", {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                
            },
            body: episodeData,
        });

        
        if(response.status === 401 || response.status === 403){
            throw new Error("Usted no esta autorizado para hacer esta accion");
        }

        if(response.status === 400){
            throw new Error("Un error ha ocurrido al crear el episodio, revisa la consola");
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
  return [data, isLoading, error, createEpisode];
}
export default useCreateEpisode