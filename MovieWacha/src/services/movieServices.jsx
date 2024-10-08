const API_URL= "http://localhost:8000"

export const getMovies = async () =>{
    try {
        const response = await fetch(`${API_URL}/MOVIES`,{
            method:"GET",
            mode: "cors"
        });
        if (!response.ok) {
            throw new Error('No se encontraron peliculas');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const getSeries = async () =>{
    try {
        const response = await fetch(`${API_URL}/series`,{
            method:"GET",
            mode: "cors"
        });
        if (!response.ok) {
            throw new Error('No se encontraron Las series');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}