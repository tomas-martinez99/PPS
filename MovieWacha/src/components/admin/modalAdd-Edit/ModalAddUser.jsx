import { useState } from "react";

const ModalAddSeason = ({ email, onClose }) => {
    const [emailUser, setEmailUser] = useState(email)
    const [userName, setUserName] = useState("")
    const [role, setRole] = useState("")
    const [password, setPassword] = useState("")
    const handleSave = async () => {

        const seasonData = {
            email: emailUser,
            userName: name,
            role: role,
            password: password
        }
        try {
            await addUser(seasonData);
            console.log("season agregada correctamente");
            setEmailUser("")
            setUserName("")
            setRole("")
            setPassword("")
            onClose()
        } catch (error) {
            console.error('Error al guardar la serie:', error);
        }
    }
    const handleChangeRol = (e) =>{
        setRole(e.target.value)
    }
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Agregar Usuario</h2>

                <label>
                    Ingrese El Email
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmailUser(e.target.value)}
                        required
                    />
                </label>
                    <select value={role} onChange={handleChangeRol}>
                        <option value="">Seleccione...</option>
                        <option value="Admin">Admin</option>
                        <option value="Employee">Empleado</option>
                        <option value="User">Usuario</option>
                    </select>
                <label>
                    Ingrese Nombre de usuario
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Ingrese La contraseña
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button onClick={handleSave} className="save-button">Agregar Usuario</button>
                <button onClick={onClose} className="cancel-button">Cancelar</button>
            </div>
        </div>
    );

}

ModalAddSeason.propTypes = {
    id: PropTypes.number,
    onClose: PropTypes.func.isRequired
}

export default ModalAddSeason