import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import "./AbmMovies.css"
import ModalAddMovie from '../modalAdd-Edit/movies-modals/ModalAddMovie';
import ModalAddSeason from '../modalAdd-Edit/ModalAddSeason';
import useGetMovies from '../../../hooks/movies/useGetMovies';
import ModalRemoveMovie from '../modalAdd-Edit/movies-modals/ModalRemoveMovie';
import ModalUpdateMovie from '../modalAdd-Edit/movies-modals/ModalUpdateMovie';

const AbmMovies = () => {
    const [movies, isMoviesLoading, moviesError, setMovies] = useGetMovies(); // Get Movies

    const [searchTerm, setSearchTerm] = useState('');//Estado buscador
    const [expandedSeries, setExpandedSeries] = useState({})//Estados Mostrar temporadas
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });// Estado orden
    const [isModalAddOpen, setModalAddOpen] = useState(false); // Estado ModalAdd
    const [selectedSerieId, setSelectedSerieId] = useState(null);

    const [isModalRemoveOpen, setModalRemoveOpen] = useState(false);
    const [isModalUpdateOpen, setModalUpdateOpen] = useState(false);
    
    useEffect(() => {
    }, []);

    //CreateMovie Modal
    const handleOpenModalAdd = () => { 
        setModalAddOpen(true);
    }
    const handleCloseModalAdd = () => { 
        setModalAddOpen(false);
    }


    //RemoveMovie Modal
    const handleOpenModalRemoveMovie = (id) => {
        setSelectedSerieId(id);
        setModalRemoveOpen(true);
    }

    const handleCloseModalRemoveMovie = () => {
        setModalRemoveOpen(false);
    }

    //UpdateMovie Modal
    const handleOpenModalUpdateMovie = (id) => {
        setSelectedSerieId(id);
        setModalUpdateOpen(true);
    }
    const handleCloseModalUpdateMovie = () => {
        setModalUpdateOpen(false);
    }


    //Actions handlers
    const handleDeleteMovie = (idToDelete) => {
        setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== idToDelete));
    };

    const handleCreateMovie = (id, title, genres) => {
        console.log(id);
        const newMovie = {
            id: id,
            title: title,
            genres: genres
        };
    
        setMovies((prevMovies) => [...prevMovies, newMovie]);
    };

    const handleUpdateMovie = (id, title, genres) => {
        setMovies((prevMovies) =>
            prevMovies.map((movie) =>
                movie.id === id ? { ...movie, title, genres } : movie
            )
        );
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
            {isModalRemoveOpen ? <ModalRemoveMovie id={selectedSerieId} onClose={handleCloseModalRemoveMovie}  onDelete={handleDeleteMovie}/> : ""}
            {isModalUpdateOpen ? <ModalUpdateMovie id={selectedSerieId} onClose={handleCloseModalUpdateMovie} onUpdate={handleUpdateMovie}/> : ""}
            {isModalAddOpen ? <ModalAddMovie onClose={handleCloseModalAdd} onCreate={handleCreateMovie}  /> : ''}
            <button className="add-button" onClick={handleOpenModalAdd}>Agregar Peliculas</button>
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
                                        <td>{movies.genres.join(", ")}</td>
                                        <td className="action-buttons">
                                            <button className="edit-btn" onClick={() => handleOpenModalUpdateMovie(movies.id)}>✏️</button>
                                            <button className="delete-btn" onClick={() => handleOpenModalRemoveMovie(movies.id)}>🗑️</button>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                
        </div>

    );
};
AbmMovies.propTypes = {}

export default AbmMovies;