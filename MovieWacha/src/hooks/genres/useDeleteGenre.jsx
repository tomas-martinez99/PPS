import React, { useState } from "react";
const API_URL = "https://localhost:7289/api";

const useDeleteGenre = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteGenre = async (id) => {
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(API_URL + "/genre/delete/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "DELETE",
      });

      if(response.status === 404){
        setData(null);
        throw new Error("No se ha encontrado el genero a eliminar")
      }
      if(response.status !== 204) {
        setData(null);
        throw new Error("Ha ocurrido un problema al remover el genero");
      }

      setData("Género removida exitosamente");
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };
  return [data, isLoading, error, deleteGenre];
};

export default useDeleteGenre;
