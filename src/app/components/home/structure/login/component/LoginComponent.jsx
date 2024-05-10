import { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { useAuthContext } from '../../../../../contexts/AuthContext';
import { fetchUsuarios, loginRequest } from '../../../../../../../common/utils';
import './loginComponent.css';

export const LoginComponent = () => {
  const { login } = useAuthContext();
  const [alert, setAlert] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('Por favor, ingresa tu nombre de usuario.');
  const [passwordError, setPasswordError] = useState('Por favor, ingresa tu contraseña.');
  const [selectedRole, setSelectedRole] = useState('Por favor, selecciona un rol.');
  const [roleError] = useState('Por favor, selecciona un rol.');
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await fetchUsuarios('token');
        if (data) { const uniqueRoles = [...new Set(data.map(user => user.rol))];
          setRoles(uniqueRoles);
        } else console.error('Error al obtener la lista de usuarios');
      } catch (error) { console.error('Error al obtener roles:', error) }
    };
    fetchRoles();
  }, []);

  const handleUsernameChange = (event) => { setUsername(event.target.value) };
  const handlePasswordChange = (event) => { setPassword(event.target.value) };
  const handleRoleChange = (event) => { setSelectedRole(event.target.value) };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username) { setUsernameError('Por favor, ingresa tu email.');
      setAlert(<Alert variant="warning">{usernameError}</Alert>);
      return;
    }
    if (!password) { setPasswordError('Por favor, ingresa tu contraseña.');
      setAlert(<Alert variant="warning">{passwordError}</Alert>);
      return;
    }
    if (!selectedRole) { setAlert(<Alert variant="warning">{roleError}</Alert>);
      return;
    }
    const { success, role, message } = await loginRequest(username, password, selectedRole);
    if (success) login(role)
    else setAlert(<Alert variant="danger" style={{ width: "42rem" }}>{message}</Alert>);
    };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Iniciar sesión</h1>
        <hr />
        {alert}
        <div className="form-group">
          <input type="text" id="username" value={username} onChange={handleUsernameChange} className="form-control" placeholder='Nombre' />
        </div>

        <div className="form-group">
          <input type="password" id="password" value={password} onChange={handlePasswordChange} className="form-control" placeholder='Password' />
        </div>

        <div className="form-group">
          <select value={selectedRole} onChange={handleRoleChange} className='sel-rol'>
            <option value="">-- Seleccionar Rol --</option>
            {roles.map(role => (<option key={role} value={role}>{role}</option>))}
          </select>
        </div>

        <div className="form-group">
          <button type="submit" onClick={handleSubmit} className="btn-login">Continuar</button>
        </div>
      </div>
    </div>
  );
}
