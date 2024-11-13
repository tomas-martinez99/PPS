import React, { useState } from 'react'
const API_URL = "https://localhost:7289/api";

const useRequestResetPassword = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const requestResetPassword = async (email) => {
    setIsLoading(true);
    try{
        const response = await fetch(API_URL + "/auth/request-reset-password", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(email),
        });

        setError(null);
        
        if(response.status === 401 || response.status === 403){
            throw new Error("Usted no esta autorizado para hacer esta accion");
        }

        if(response.status === 400){
            throw new Error("El servicio de email no esta en funcionamiento.");
        }

        if(response.status === 404){
            throw new Error("No hay ningun usuario registrado con ese email :(");
        }

        if(!response.ok){
            console.log(response);
            throw new Error("Ha ocurrido un error desconocido, revisa la consola");
        }

        
        setData("Sucess");
        setIsLoading(false);
        setError(null);
    }
    catch(error){
        setError(error.message);
        setData(null);
        setIsLoading(false);
    }
  };
  return [data, isLoading, error, requestResetPassword];
}

export default useRequestResetPassword;