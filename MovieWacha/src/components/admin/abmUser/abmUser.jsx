import React from 'react'
import PropTypes from 'prop-types'

const abmUser = props => {
    return (
        <div className="table-container">
            <button className="add-button" onClick={handleOpenModalAdd}>Agregar Usuario</button>
            {isModalAddOpen ?
                <ModalAddUser onClose={handleCloseModaladd} /> :
                <>
                    <div className="table-header">
                        <h2>Usuarios</h2>
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
                                <th onClick={() => requestSort('title')}>Usuario</th>
                                <th onClick={() => requestSort('genre')}>Estado de suscripcion</th>
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
                                            <button className="edit-btn" onClick={() => handleEditSerie(series)} ><i className="fa-solid fa-pen"></i></button>
                                            <button className="delete-btn" onClick={() => handleDeletSerie(series.id)}><i className="fa-solid fa-trash"></i></button>
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
  )
}

abmUser.propTypes = {}

export default abmUser