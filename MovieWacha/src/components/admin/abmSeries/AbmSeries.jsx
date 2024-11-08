import React, { useEffect, useState } from 'react'
import "./AbmSeries.css"
import ModalAddSeries from '../modalAdd-Edit/series-modals/ModalAddSeries';
import { deleteSerie, getSeries } from '../../../services/seriesServices';
import AbmSeason from '../abmSeason/AbmSeason';
import ModalAddSeason from '../modalAdd-Edit/season-modals/ModalAddSeason';
import ModalEditSerie from '../modalAdd-Edit/series-modals/ModalEditSerie';


const AbmSeries = () => {
    const [searchTerm, setSearchTerm] = useState('');//Estado buscador
    const [expandedSeries, setExpandedSeries] = useState({})//Estados Mostrar temporadas
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });// Estado orden
    const [isModalAddOpen, setModalAddOpen] = useState(false); // Estado ModalAdd
    const [series, setSeries] = useState([])//Estado para las series cargadas
    const [isModalAddSeason, setModalAddSeason] = useState(false)//Estado modal addSeason
    const [selectedSerieId, setSelectedSerieId] = useState(null);//Id de la serie pasado al componente de las temporadas
    const [isModalEditOpen, setModalEditOpen] = useState(false);//Modal de edicion de series
    

    // const refreshPage = () => {
    //     window.location.reload();
    // };
    //LLamado a la api
    useEffect(() => {
        // Función para cargar los datos
        const fetchData = async () => {
            try {
                const result = await getSeries();
                setSeries(result); // Guardar datos en el estado
                console.log("series Cargadas en el abm", result)
            } catch (err) {
                console.log(err.message)
            }
        };

        fetchData();
    }, []);

    //Borrar serie
    const handleDeletSerie = (id) => {
        deleteSerie(id)
        
    }

    //Edit serie
    const handleEditSerie = (id) => {
        console.log(id,"serie a editar")
        setSelectedSerieId(id); // Guardar la serie seleccionada en el estado
        setModalEditOpen(true);  // Abrir el modal de edición
    };

    //Funciones Abrir/Cerrar Modal
    const handleOpenModalAdd = () => {
        setModalAddOpen(true);
    }
    const handleCloseModalAdd = () => {
        setModalAddOpen(false);

    }
    const handleCloseModalAddSeason = () => {
        setModalAddSeason(false);
    }
    const handleOpenModalAddSeason = (id) => {
        setSelectedSerieId(id);
        setModalAddSeason(true);
    };

    //Mostrar las temporadas
    const toggleSeries = (seriesId) => {
        setExpandedSeries((prev) => ({
            ...prev,
            [seriesId]: !prev[seriesId],
        }));
        console.log("id serie pasado a temporada", seriesId)
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
            {isModalAddSeason && <ModalAddSeason onClose={handleCloseModalAddSeason} id={selectedSerieId} />}
            {isModalEditOpen && (<ModalEditSerie
                id={selectedSerieId}
                onClose={() => setModalEditOpen(false)}
                />)}
            <button className="add-button" onClick={handleOpenModalAdd}>Agregar Series</button>
            {isModalAddOpen ?
                <ModalAddSeries onClose={handleCloseModalAdd} /> :
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
                                    <tr className="row-series">
                                        <td>{series.id}</td>
                                        <td>{series.title}</td>
                                        <td>{series.genre}</td>
                                        <td className="action-buttons">
                                            <button onClick={() => toggleSeries(series.id)}>
                                                {expandedSeries[series.id] ? '▲' : '▼'}
                                            </button>
                                            <button className="edit-btn" onClick={() => handleEditSerie(series.id)} ><i className="fa-solid fa-pen"></i></button>
                                            <button className="delete-btn" onClick={() => handleDeletSerie(series.id)}><i className="fa-solid fa-trash"></i></button>
                                            <button className='add-btn' onClick={() => handleOpenModalAddSeason(series.id)}><i className="fa-solid fa-plus"></i></button>
                                        </td>
                                    </tr>
                                    {expandedSeries[series.id] && <AbmSeason serieId={series.id} />}
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