import  { useState } from 'react'
const API_URL = "https://localhost:7289/api";

const useUpdateEpisode = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateMovie = async (id,episodeData) => {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    
    try{
        const response = await fetch(API_URL + "/series/update-episode/" + id, {
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${token}` 
            },
            body: episodeData,
        });

        
        if(response.status === 401 || response.status === 403){
            throw new Error("Usted no esta autorizado para hacer esta accion");
        }

        if(response.status === 400){
            throw new Error("Un error ha ocurrido al modificar el episodio, revisa la consola");
        }

        if(response.status === 404){
            throw new Error("No se ha encontrado el episodio a modificar");
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
  return [data, isLoading, error, updateMovie];
}

export default useUpdateEpisode;