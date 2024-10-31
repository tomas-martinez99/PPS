import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import "./AbmSeries.css"
import ModalAdd from '../modalAdd-Edit/ModalAdd';
import { getSeries } from '../../../services/seriesServices';
import AbmSeason from '../abmSeason/AbmSeason';

const AbmSeries = () => {
    const [searchTerm, setSearchTerm] = useState('');//Estado buscador
    const [expandedSeries, setExpandedSeries] = useState({})//Estados Mostrar temporadas
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });// Estado orden
    const [isModalAddOpen, setModalAddOpen] = useState(false); // Estado ModalAdd
    const [editData, setEditData] = useState(null); // Estado para datos de edición
    const [series, setSeries] = useState([])

    
    //LLamado a la api
    useEffect(() => {
        // Función para cargar los datos
        const fetchData = async () => {
            try {
                const result = await getSeries();
                setSeries(result); // Guardar datos en el estado
                console.log(result)
            } catch (err) {
                console.log(err.message)
            }
        };

        fetchData();
    }, []);

    //Funciones Abrir/Cerrar Modal
    const handleOpenModalAdd = (data = null) => {
        setEditData(data);
        setModalAddOpen(true);
    }
    const handleCloseModalAdd = () => {
        setEditData(null);
        setModalAddOpen(false);
    }

    //Mostrar las temporadas
    const toggleSeries = (seriesId) => {
        setExpandedSeries((prev) => ({
            ...prev,
            [seriesId]: !prev[seriesId],
        }));
    };

    

    //Manejo estado BUSCADOR
    const handleSearchChange = (e) => setSearchTerm(e.target.value);

    // Filtrado de series BUSCADOR
    const filteredSeries = series.filter((series) =>
        series.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Orden Con botones id genero o titulo
    const sortedSeries = [...filteredSeries].sort((a, b) => {
        if (sortConfig.key) {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];

            if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    // Cambio de orden acendete o decendente
    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    
    return (
        <div className="table-container">
            <button className="add-button" onClick={handleOpenModalAdd}>Agregar</button>
            {isModalAddOpen ?
                <ModalAdd onClose={handleCloseModalAdd} editData={editData} />
                :
                <>
                    <div className="table-header">
                        <h2>Series</h2>
                        <input
                            type="text"
                            placeholder="Buscar series..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="search-input"
                        />
                    </div>
                    <table className="series-table">
                        <thead>
                            <tr>
                                <th onClick={() => requestSort('id')}>ID</th>
                                <th onClick={() => requestSort('title')}>Título</th>
                                <th onClick={() => requestSort('genre')}>Género</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedSeries.map((series) => (
                                <React.Fragment key={series.id}>
                                    {/* Series Row */}
                                    <tr className="row-series">
                                        <td>{series.id}</td>
                                        <td>{series.title}</td>
                                        <td>{series.genre}</td>
                                        <td className="action-buttons">
                                            <button onClick={() => toggleSeries(series.id)}>
                                                {expandedSeries[series.id] ? '▲' : '▼'}
                                            </button>
                                            <button className="edit-btn" onClick={() => handleOpenModalAdd(series)}>✏️</button>
                                            <button className="delete-btn">🗑️</button>
                                        </td>
                                    </tr>
                                    {/* Seasons Rows */}
                                    {expandedSeries[series.id] &&
                                        series.seasons.map((season) => (
                                                <AbmSeason key={season.id} season={season}/>
                                              
                                        ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </>
            }
        </div>

    );
};
AbmSeries.propTypes = {}

export default AbmSeries