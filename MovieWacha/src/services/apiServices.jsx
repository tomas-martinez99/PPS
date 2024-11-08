const API_URL = "https://localhost:7289/api/auth";

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    if (!response.ok) {
      let errorMessage = "Error en el servidor";

      // Intenta obtener el cuerpo de la respuesta en caso de error
      const errorData = await response.json().catch(() => null); // Captura errores de parsing de JSON

      if (errorData && errorData.message) {
        errorMessage = errorData.message;
      } else if (response.status === 404 || response.status === 401) {
        errorMessage = "Usuario o contraseña incorrectos";
      } else if (response.status === 400) {
        errorMessage = "Error en la solicitud";
      }
      console.error(`Error al iniciar sesión: ${errorMessage}`);
      return { success: false, message: errorMessage };
    }
    const data = await response.text();
    // localStorage.setItem("token",data );
    console.log("Inicio de sesion exitoso", data);
    return { success: true, data };
  } catch (error) {
    console.error("Error en el login:", error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error en la solicitud: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    throw error;
  }
};

export const refreshSession = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/refresh`,{
    method:"GET",
    mode:"cors",
    headers: {
      "Authorization": `Bearer ${token}` 
    },
  })
  const data = await response.text()
  if(response.ok){
    console.log(data)
  }
}


