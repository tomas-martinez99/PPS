const API_URL = "https://localhost:7289/api/favorites";

//Series

export const getFavorites = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/get-all`, {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      if (response.status == 404) {
        console.log("No hay favoritos");
      } else {
        throw new Error("No tiene favoritos agregados");
      }
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const addFavorites = async (favoritesData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token no disponible. Por favor, inicia sesión.");
      throw new Error("Token no disponible");
    }
    const response = await fetch(`${API_URL}/add`, {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(favoritesData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error del servidor:", errorData);
      throw new Error("Error al agregar la serie");
    }

    // Verifica si hay contenido en la respuesta antes de intentar leer JSON
    if (response.status !== 204) {
      //   return await response.json();
    }
  } catch (error) {
    console.error("Error al agregar la serie:", error.message);
    throw error;
  }
};

export const deleteFavorite = async (id, type) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/remove/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: type,
  });
  if (!response.ok) {
    throw new Error("Error al eliminar de la lista");
  }
};
