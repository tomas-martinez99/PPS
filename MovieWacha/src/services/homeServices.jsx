const API_URL = "https://localhost:7289/api/movies";

export const getMoviesShowCase = async () => {
  try {
    const response = await fetch(`${API_URL}/with-showcase-images`, {
      method: "GET",
      mode: "cors",
    });
    if (!response.ok) {
      throw new Error("No se encontraron las peliculas");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getMovieById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/get/${id}`, {
      method: "GET",
      mode: "cors",
    });
    if (!response.ok) {
      throw new Error("No se ha encontrado la pelicula");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getAllMovies = async () => {
  try {
    const response = await fetch(`${API_URL}/get-all`, {
      method: "GET",
      mode: "cors",
    });
    if (!response.ok) {
      throw new Error("No se encontraron las peliculas");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
