const API_URL = "https://localhost:7289/api";

export const getMovies = async () => {
  try {
    const response = await fetch(`${API_URL}/movies/get-all`, {
      method: "GET",
      mode: "cors",
    });
    console.log(response);
    if (!response.ok) {
      throw new Error("No se encontraron peliculas");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const deleteMovie = async (id) => {
  const response = await fetch(`${API_URL}/MOVIES/${id}`, { method: "DELETE" });
  if (!response.ok) {
    throw new Error("Error al eliminar la pelicula");
  }
};

export const getMovieByGenre = async (genre) => {
  try {
    console.log(genre);
    const response = await fetch(
      `${API_URL}/movies/get-movies-by-genre/${genre}`,
      {
        method: "GET",
        mode: "cors",
      }
    );
    if (!response.ok) {
      throw new Error("No se han encontrado peliculas con el genero");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const search = async (title) => {
  try {
    const response = await fetch(`${API_URL}/search/by-title?Title=${title}`, {
      method: "GET",
      mode: "cors",
    });
    if (!response.ok) {
      throw new Error("No hay resultados");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
