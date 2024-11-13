import React, { useState } from 'react'
const API_URL = "https://localhost:7289/api";

const useResetPassword = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const resetPassword = async (resetPasswordData) => {
    setIsLoading(true);
    try{
        const token = localStorage.getItem('token');
        const response = await fetch(API_URL + "/auth/reset-password", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            },
            body: JSON.stringify(resetPasswordData),
        });

        setError(null);
        
        if(response.status === 401 || response.status === 403){
            throw new Error("Usted no esta autorizado para hacer esta accion");
        }

        if(response.status === 400){
            throw new Error("Token invalido o expirado, solicite nuevamente el cambio de contraseña");
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
  return [data, isLoading, error, resetPassword];
}

export default useResetPassword;