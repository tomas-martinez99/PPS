const API_URL = "https://localhost:7289/api/series";

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
    const token = localStorage.getItem("token");
    console.log(seriesData, "servicio add");
    if (!token) {
      console.error("Token no disponible. Por favor, inicia sesión.");
      throw new Error("Token no disponible");
    }
    const response = await fetch(`${API_URL}/create`, {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
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
    const token = localStorage.getItem("token");
    console.log(seasonData, "serie add");
    const response = await fetch(`${API_URL}/add-season/`, {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
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
};

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
