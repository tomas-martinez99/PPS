const API_URL = "https://localhost:7289/api/series";

//Series

export const getSeries = async () => {
  try {
    const response = await fetch(`${API_URL}/get-all`, {
      method: "GET",
      mode: "cors",
    });
    if (!response.ok) {
      throw new Error("No se encontraron Las series");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getSerieById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/get/${id}`, {
      method: "GET",
      mode: "cors",
    });
    if (!response.ok) {
      throw new Error("No se encontro la serie");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const addSeries = async (seriesData) => {
  try {
    const token = localStorage.getItem('token');
    console.log(seriesData, "servicio add")
    if (!token) {
      console.error("Token no disponible. Por favor, inicia sesión.");
      throw new Error("Token no disponible");
    }
    const response = await fetch(`${API_URL}/create`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(seriesData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error del servidor:", errorData);
      throw new Error("Error al agregar la serie");
    }

    const data = await response.json();
    console.log("Serie Agregada", data);
    return data;
  } catch (error) {
    console.error("Error al agregar la serie:", error.message);
    throw error;
  }
};

export const updateSeries = async (Id, seriesData) => {
  try {
    const token = localStorage.getItem('token');
    console.log(seriesData, "servicio update",Id, "id ");
    
    if (!token) {
      console.error("Token no disponible. Por favor, inicia sesión.");
      throw new Error("Token no disponible");
    }
    const response = await fetch(`${API_URL}/update/${Id}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(seriesData),

    });
    if (!response.ok) {
      const errorText = await response.text();
      const errorData = errorText ? JSON.parse(errorText) : { message: "Respuesta vacía del servidor" };
      console.error("Error del servidor:", errorData);
      throw new Error("Error al actualizar la serie");
    }

    const text = await response.text(); // Lee el cuerpo de la respuesta como texto
    const data = text ? JSON.parse(text) : {}; // Si el texto no está vacío, parsea a JSON
    console.log("Serie Actualizada", data);
    return data;
  } catch (error) {
    console.error("Error al agregar la serie:", error.message);
    throw error;
  }
};

export const deleteSerie = async (id) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/delete/${id}`,
    {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
  if (!response.ok) {
    throw new Error("Error al eliminar la serie");
  }
};

//Temporadas
export const getSeason = async (id) => {
  try {
    const response = await fetch(`${API_URL}/get-seasons-from-serie/${id}`, {
      method: "GET",
      mode: "cors",
    });
    if (!response.ok) {
      throw new Error("No se encontraron Las series");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const addSeason = async (seasonData) => {
  try {
    const token = localStorage.getItem('token');
    console.log(seasonData, "serie add")
    const response = await fetch(`${API_URL}/add-season`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(seasonData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error del servidor:", errorData);
      throw new Error("Error al agregar la temporada");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export const deleteSeason = async (id) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/delete-season-from-serie`,
    {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      },body: JSON.stringify(id),
    });
  if (!response.ok) {
    throw new Error("Error al eliminar la serie");
  }
};

export const updateSeason = async (id, seasonData) =>{
  try {
    const token = localStorage.getItem('token');
    console.log(seasonData, "serie add", id)
    const response = await fetch(`${API_URL}/update-season/${id}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(seasonData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error del servidor:", errorData);
      throw new Error("Error al agregar la temporada");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }

}
//Episodios
export const getEpisode = async (id) => {
  try {
    const response = await fetch(`${API_URL}/get-episode-from-season/${id}`, {
      method: "GET",
      mode: "cors",
    });
    if (!response.ok) {
      throw new Error("No se encontraron Las series");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const addEpisode = async (episodeData) => {
  try {
    const token = localStorage.getItem('token');
    console.log(episodeData, "episodio add")
    const response = await fetch(`${API_URL}/add-season/`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(episodeData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error del servidor:", errorData);
      throw new Error("Error al agregar la temporada");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}