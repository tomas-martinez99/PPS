import React, { useState } from "react";
const API_URL = "https://localhost:7289/api";

const useDeleteMovie = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteMovie = async (id) => {
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(API_URL + "/movies/delete/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "DELETE",
      });

      if(response.status === 404){
        setData(null);
        throw new Error("No se ha encontrado la pelicula a eliminar")
      }
      if(response.status !== 204) {
        setData(null);
        throw new Error("Ha ocurrido un problema al remover la pelicula");
      }

      setData("Pelicula removida exitosamente");
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };
  return [data, isLoading, error, deleteMovie];
};

export default useDeleteMovie;
