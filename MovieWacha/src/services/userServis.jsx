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
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
    if (!response.ok) {
      throw new Error("Error al eliminar la serie");
    }
  };