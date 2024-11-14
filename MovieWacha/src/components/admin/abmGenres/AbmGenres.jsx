import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import "./AbmGenres.css"
import useGetGenres from '../../../hooks/genres/useGetGenres';
import ModalAddGenre from '../modalAdd-Edit/genres-modals/ModalAddGenre';
import ModalDeleteGenre from '../modalAdd-Edit/genres-modals/ModalDeleteGenre';
import ModalUpdateGenre from '../modalAdd-Edit/genres-modals/ModalUpdateGenre';

const AbmGenres = () => {
    const [genres, isGenresLoading, isGenresLoadingError, setGenres] = useGetGenres();

    const [searchTerm, setSearchTerm] = useState('');//Estado buscador
    const [expandedSeries, setExpandedSeries] = useState({})//Estados Mostrar temporadas
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });// Estado orden
    const [isModalAddOpen, setModalAddOpen] = useState(false); // Estado ModalAdd
    const [selectedSerieId, setSelectedSerieId] = useState(null);

    const [isModalRemoveOpen, setModalRemoveOpen] = useState(false);
    const [isModalUpdateOpen, setModalUpdateOpen] = useState(false);
    
    useEffect(() => {
    }, []);

    //CreateGenre Modal
    const handleOpenModalAdd = () => { 
        setModalAddOpen(true);
    }
    const handleCloseModalAdd = () => { 
        setModalAddOpen(false);
    }


    //RemoveGenre Modal
    const handleOpenModalRemoveGenre = (id) => {
        setSelectedSerieId(id);
        setModalRemoveOpen(true);
    }

    const handleCloseModalRemoveGenre = () => {
        setModalRemoveOpen(false);
    }

    //UpdateGenre Modal
    const handleOpenModalUpdateGenre = (id) => {
        setSelectedSerieId(id);
        setModalUpdateOpen(true);
    }
    const handleCloseModalUpdateGenre = () => {
        setModalUpdateOpen(false);
    }


    //Actions handlers
    const handleDeleteGenre = (idToDelete) => {
        setGenres((prevGenres) => prevGenres.filter((genre) => genre.id !== idToDelete));
    };

    const handleCreateGenre = (id, name) => {
        console.log(id);
        const newGenre = {
            id: id,
            name: name,
        };
    
        setGenres((prevGenres) => [...prevGenres, newGenre]);
    };

    const handleUpdateGenre = (id, name) => {
        setGenres((prevGenres) =>
            prevGenres.map((genre) =>
                genre.id === id ? { ...genre, name } : genre
            )
        );
    };




    //Manejo estado BUSCADOR
    const handleSearchChange = (e) => setSearchTerm(e.target.value);

    // Filtrado de generos BUSCADOR
    const filteredGenres = genres.filter((genres) =>
        genres.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Orden Con botones id genero o titulo
    const sortedGenres = [...filteredGenres].sort((a, b) => {
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
            {isModalRemoveOpen ? <ModalDeleteGenre id={selectedSerieId} onClose={handleCloseModalRemoveGenre}  onDelete={handleDeleteGenre}/> : ""}
            {isModalUpdateOpen ? <ModalUpdateGenre id={selectedSerieId} onClose={handleCloseModalUpdateGenre} onUpdate={handleUpdateGenre}/> : ""}
            {isModalAddOpen ? <ModalAddGenre onClose={handleCloseModalAdd} onCreate={handleCreateGenre}  /> : ''}
            <button className="add-button" onClick={handleOpenModalAdd}>Agregar Géneros</button>
                    <div className="table-header">
                        <h2>Géneros</h2>
                        <input
                            type="text"
                            placeholder="Buscar generos..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="search-input"
                        />
                    </div>
                    <table className="series-table">
                        <thead>
                            <tr>
                                <th onClick={() => requestSort('id')}>ID</th>
                                <th onClick={() => requestSort('title')}>Nombre</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedGenres.map((genre) => (
                                <React.Fragment key={genre.id}>
                                    <tr className="row-series">
                                        <td>{genre.id}</td>
                                        <td>{genre.name}</td>
                                        <td className="action-buttons">
                                            <button className="edit-btn" onClick={() => handleOpenModalUpdateGenre(genre.id)}><i className="fa-solid fa-pen"></i></button>
                                            <button className="delete-btn" onClick={() => handleOpenModalRemoveGenre(genre.id)}><i className="fa-solid fa-trash"></i></button>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                
        </div>

    );
};
AbmGenres.propTypes = {}

export default AbmGenres;