const API_URL = "https://localhost:7289/api/statistics";

export const getStatisticsSevenDaysAgo = async () => {
  // 7 dias antes
  try {
    const response = await fetch(`${API_URL}/statics-one-week-last`, {
      method: "GET",
      mode: "cors",
    });
    if (!response.ok) {
      throw new Error("No se encontraron las estadisticas solicitadas");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getStatisticsPorcentage = async () => {
  // porcentaje del total de registrados en los ultimos 30 dias
  try {
    const response = await fetch(`${API_URL}/statics-porcentage`, {
      method: "GET",
      mode: "cors",
    });
    if (!response.ok) {
      throw new Error("No se encontro el porcentaje solicitado");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
