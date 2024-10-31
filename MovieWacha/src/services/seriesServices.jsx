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

export const  addSeries = async (serieDto) => {
    try{
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/create`,{
            method:"POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
              },
              body: JSON.stringify(serieDto),
        });
        if (!response.ok) {
            throw new Error("Error al agregar la serie");
          } else {
            console.log("Serie Agregada");
          }
          const data = await response.json();
          console.log(data, "data api");
          return data;
    }catch (error) {
        console.error("Error al agregar la serie:", error.message);
        throw error; // Lanza el error para manejarlo en el componente
    }
};
