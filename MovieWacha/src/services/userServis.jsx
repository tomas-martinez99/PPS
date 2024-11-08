const API_URL = "https://localhost:7289/api/user";

export const getAllUser = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`${API_URL}/get-all`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
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

export const deleteUser = async (name) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/delete/${name}`,
    {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
  if (!response.ok) {
    throw new Error("Error al eliminar el usuario");
  }
};

export const updateUser = async ( userData,name) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/update/${name}`,
      {
        method: "PUT",
        mode: "cors",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData),
      });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error del servidor:", errorData);
      throw new Error("Error al agregar la serie");
    }

    const data = await response.json();
    console.log("Serie Actualizada", data);
    return data;
  } catch (error) {
    console.error("Error al agregar la serie:", error.message);
    throw error;
  }
}