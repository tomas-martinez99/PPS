const API_URL = "https://localhost:7289/api/user";

export const getAllUser = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${API_URL}/get-all`, {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${token}`,
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
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/delete/${name}`, {
    method: "DELETE",
    mode: "cors",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Error al eliminar el usuario");
  }
};

export const deleteMyAccount = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/delete-my-account`, {
    method: "DELETE",
    mode: "cors",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status != 204) {
    throw new Error("Error al eliminar el usuario");
  }
};

export const updateUser = async (userData, name) => {
  try {
    console.log("Actualizando usuario:", userData);
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/update/${name}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (response.status === 401 || response.status === 403) {
      throw new Error("Usted no esta autorizado para hacer esta accion");
    }

    if (response.status === 400) {
      throw new Error(
        "Un error ha ocurrido al modificar la pelicula, revisa la consola"
      );
    }

    if (response.status === 404) {
      throw new Error("No se ha encontrado la pelicula a modificar");
    }

    const data = await response.json();
    console.log("Serie Actualizada", data);
    return data;
  } catch (error) {
    console.error("Error al agregar la serie:", error.message);
    throw error;
  }
};

export const changePassword = async (passwordData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/change-password`, {
      method: "PUT",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(passwordData),
    });
    if (response.status === 401 || response.status === 403) {
      throw new Error("Usted no esta autorizado para hacer esta accion");
    }

    if (response.status === 400) {
      throw new Error("La contraseña actual es incorrecta");
    }

    if (response.status != 204) {
      throw new Error("Ha ocurrido un error");
    }
  } catch (error) {
    console.error("Error al agregar la serie:", error.message);
    throw error;
  }
};
