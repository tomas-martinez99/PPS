import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import "./AbmMovies.css"
import ModalAddMovie from '../modalAdd-Edit/movies-modals/ModalAddMovie';
import ModalAddSeason from '../modalAdd-Edit/ModalAddSeason';
import useGetMovies from '../../../hooks/movies/useGetMovies';
import ModalRemoveMovie from '../modalAdd-Edit/movies-modals/ModalRemoveMovie';

const AbmMovies = () => {
    const [movies, isMoviesLoading, moviesError] = useGetMovies(); // Get Movies

    const [searchTerm, setSearchTerm] = useState('');//Estado buscador
    const [expandedSeries, setExpandedSeries] = useState({})//Estados Mostrar temporadas
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });// Estado orden
    const [isModalAddOpen, setModalAddOpen] = useState(false); // Estado ModalAdd
    const [isModalAddSeason, setModalAddSeason] = useState(false)
    const [selectedSerieId, setSelectedSerieId] = useState(null);

    const [isModalRemoveOpen, setModalRemoveOpen] = useState(false);
    
    useEffect(() => {
    }, []);

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


    //RemoveMovie Modal
    const handleOpenModalRemoveMovie = (id) => {
        setSelectedSerieId(id);
        setModalRemoveOpen(true);
    }

    const handleCloseModalRemoveMovie = () => {
        setModalRemoveOpen(false);
        console.log("Cerrar")

    }

    //Mostrar las temporadas
    const toggleMovies = (seriesId) => {
        setExpandedSeries((prev) => ({
            ...prev,
            [seriesId]: !prev[seriesId],
        }));
        console.log(seriesId)
    };

    

    //Manejo estado BUSCADOR
    const handleSearchChange = (e) => setSearchTerm(e.target.value);

    // Filtrado de series BUSCADOR
    const filteredMovies = movies.filter((movies) =>
        movies.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Orden Con botones id genero o titulo
    const sortedMovies = [...filteredMovies].sort((a, b) => {
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
            {isModalAddSeason ? <ModalAddSeason onClose={handleCloseModalAddSeason} id={selectedSerieId}/>: ""}
            {isModalRemoveOpen ? <ModalRemoveMovie onClose={handleCloseModalRemoveMovie} id={selectedSerieId}/> : ""}
            <button className="add-button" onClick={handleOpenModalAdd}>Agregar Peliculas</button>
            {isModalAddOpen ?
                <ModalAddMovie onClose={handleCloseModalAdd}  /> :
                <>
                    <div className="table-header">
                        <h2>Movies</h2>
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
                            </tr>
                        </thead>
                        <tbody>
                            {sortedMovies.map((movies) => (
                                <React.Fragment key={movies.id}>
                                    <tr className="row-series">
                                        <td>{movies.id}</td>
                                        <td>{movies.title}</td>
                                        <td>{movies.genre}</td>
                                        <td className="action-buttons">
                                            <button onClick={() => toggleMovies(movies.id)}>
                                                {expandedSeries[movies.id] ? '▲' : '▼'}
                                            </button>
                                            <button className="edit-btn" >✏️</button>
                                            <button className="delete-btn" onClick={() => handleOpenModalRemoveMovie(movies.id)}>🗑️</button>
                                            <button className='add-btn' onClick={() => handleOpenModalAddSeason(movies.id)}>+</button>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </>
                }
        </div>

    );
};
AbmMovies.propTypes = {}

export default AbmMovies;