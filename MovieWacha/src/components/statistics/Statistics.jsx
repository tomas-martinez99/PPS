import React, { useEffect, useState } from "react";
import { Table, Spinner, Alert } from 'react-bootstrap';
import { getStatisticsPorcentaje, getStatisticsSevenDaysAgo } from '../../services/statisticsServices';

const Statistics = () => {
    const [error, setError] = useState(null);
    const [statistics, setStatistics] = useState([]);
    const [statisticsPorcentaje, setStatisticsPorcentaje] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllSevenDaysAgo = async () => {
            try {
                const result = await getStatisticsSevenDaysAgo();
                setStatistics(result);
            } catch (error) {
                setError("Hubo un error al obtener las estadísticas de los últimos 7 días.");
                console.error("Error fetching statistics:", error);
            }
        };

        const fetchAllPorcentaje = async () => {
            try {
                const result = await getStatisticsPorcentaje();
                setStatisticsPorcentaje(result);
            } catch (error) {
                setError("Hubo un error al obtener las estadísticas de porcentaje.");
                console.error("Error fetching percentage statistics:", error);
            }
        };

        Promise.all([fetchAllSevenDaysAgo(), fetchAllPorcentaje()]).finally(() => {
          setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center mt-5">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    return (
        <div>
            <h3>Usuarios registrados en los ultimos 7 dias.</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Fecha de Registro</th>
                    </tr>
                </thead>
                <tbody>
                    {statistics.length > 0 ? (
                        statistics.map((statistic, index) => (
                            <tr key={index}>
                                <td>{statistic.name}</td>
                                <td>{statistic.dateRegistered}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2">No hay estadísticas disponibles.</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <h3>Porcentaje de usuarios registrados en los ultimos 30 dias.</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Porcentaje</th>
                    </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{statisticsPorcentaje}</td>
                  </tr>
                </tbody>
            </Table>
        </div>
    );
};

export default Statistics;