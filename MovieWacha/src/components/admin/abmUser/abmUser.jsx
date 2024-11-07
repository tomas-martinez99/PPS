import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { deleteUser, getAllUser } from '../../../services/userServis';
import "../abmSeries/AbmSeries.css"
import "./AbmUser.css"
import { useNavigate } from 'react-router-dom';
import ModalUpdateUser from '../modalAdd-Edit/modal-user/ModalUpdateUser';

const AbmUser = () => {
    const [searchTerm, setSearchTerm] = useState('');//Estado buscador
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });// Estado orden
    const [users, setUsers] = useState([])
    const [selectedUserName, setSelectedUserName] =useState(null);
    const [selectedUserEmail, setSelectedUserEmail] =useState(null);
    const [selectedUserRole, setSelectedUserRole] =useState(null)
    const [isModalUpdateOpen, setModalUpdateOpen] = useState(false); // Estado ModalAdd
    const navigate = useNavigate();
    const refreshPage = () => {
        window.location.reload();
    };

    //LLamado a la api
    useEffect(() => {
        // Función para cargar los datos
        const fetchData = async () => {
            try {
                const result = await getAllUser();
                setUsers(result); // Guardar datos en el estado
                console.log("Usuarios Cargadas en el abm", result)
            } catch (err) {
                console.log(err.message)
            }
        };

        fetchData();
    }, []);

    const handleOpenModalUpdateUser = (user) => {
        setSelectedUserName(user.name);
        setSelectedUserEmail(user.email);
        setSelectedUserRole(user.role)
        setModalUpdateOpen(true);
    }
    const handleCloseModalUpdateUser = () => {
        setModalUpdateOpen(false);
    }

    const handleUpdateMovie = (name, email, pasword, role) => {
        setUsers((prevUser) =>
            prevUser.map((user) =>
                user.name === name ? { ...user, email, pasword, role} : user
            )
        );
    };



    //Manejo estado BUSCADOR
    const handleSearchChange = (e) => setSearchTerm(e.target.value);

     // Filtrado de series BUSCADOR
     const filteredUsers = users.filter((users) =>
        users.email.toLowerCase().includes(searchTerm.toLowerCase())||
     users.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Orden Con botones id nombre o estado
    const sortedUsers = [...filteredUsers].sort((a, b) => {
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
    }

    const handleAddUser = () => {
        navigate("/register")
    }
  
    //Delete 
    const handleDeletUser = (name) => {
        deleteUser(name)
        refreshPage()
    }

    return (
        <div className="table-container">
            {isModalUpdateOpen ? <ModalUpdateUser name={selectedUserName} email={selectedUserEmail} role={selectedUserRole} onClose={handleCloseModalUpdateUser} onUpdate={handleUpdateMovie}/> : ""}
            <button className="add-button" onClick={handleAddUser}>Agregar Usuario</button>
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
                                <th onClick={() => requestSort('name')}>Usuario</th>
                                <th onClick={() => requestSort('email')}>Email</th>
                                <th onClick={() => requestSort('role')}>Rol</th>
                                <th onClick={() => requestSort('subscriptionStatus')}>Estado de suscripcion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedUsers.map((users) => (
                                <React.Fragment key={users.name}>
                                    <tr className="row-series">
                                        <td>{users.name}</td>
                                        <td>{users.email}</td>
                                        <td>{users.role}</td>
                                        <td className={users.subscriptionStatus === "Active" ? "row-active" : "row-expire "}>
                                            {users.subscriptionStatus}</td>
                                        <td className="action-buttons">
                                            <button className="edit-btn" onClick={() => handleOpenModalUpdateUser(users)} ><i className="fa-solid fa-pen"></i></button>
                                            <button className="delete-btn"onClick={()=>(handleDeletUser(users.name))} ><i className="fa-solid fa-trash"></i></button>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </>
        </div>

    );
};
  


AbmUser.propTypes = {}

export default AbmUser