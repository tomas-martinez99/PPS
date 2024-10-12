const API_URL= "http://localhost:8000";

export const loginUser = async (user, password) => {
    try{
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",},
            body: JSON.stringify({username: user, password: password}),
        })
        if(!response.ok){
            if (response.status === 404 || response.status === 401) {
                return { success: false, message: 'Usuario o contraseña incorrectos' };
        }
        throw new Error('Error en el servidor');
        } 
        
        const data = await response.json();
        console.log("user",data)
        return { success: true, data };
    }
        catch(error){
        console.error('Error en el login:', error);
        throw error;
    }
}

export const registerUser = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
  
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      throw error;
    }
  };