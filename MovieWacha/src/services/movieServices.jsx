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

export const deleteSerie = async (id) => {
  const response = await fetch(`${API_URL}/series/${id}`, { method: "DELETE" });
  if (!response.ok) {
    throw new Error("Error al eliminar la serie");
  }
};

export const deleteSeason = async (serieId, seasonId) => {
  const response = await fetch(
    `${API_URL}/series/${serieId}/seasons/${seasonId}`,
    { method: "DELETE" }
  );
  if (!response.ok) {
    throw new Error("Error al eliminar la temporada");
  }
};

export const deleteEpisode = async (serieId, seasonId, episodeId) => {
  const response = await fetch(
    `${API_URL}/series/${serieId}/seasons/${seasonId}/episodes/${episodeId}`,
    { method: "DELETE" }
  );
  if (!response.ok) {
    throw new Error("Error al eliminar el episodio");
  }
};
