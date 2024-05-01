import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './navbar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export const Navbar = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('http://localhost:3000/users/listaUsuarios', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.ok) {
            const userData = await response.json();
            setUsuario(userData);
            console.log(userData);
          } else {
            console.error('Error al obtener información del usuario');
          }
        } catch (error) {
          console.error('Error al obtener información del usuario:', error);
        }
      }
    };

    fetchUserInfo();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    if (!localStorage.getItem('token')) console.log('Token eliminado con éxito.');
    else console.log('Error al eliminar el token.');
    navigate("/private/logout");
  }

  return (
    <nav className="navbar-1">
      <ul className="nav-list">
        {usuario ? (
          <div className="text-user">
            <h1>{usuario.nombre}</h1>
            <p>{usuario.rol}</p>
          </div>
        ) : null}

        <li className="nav-item">
          <button className="btn-cer-ses mobile-menu-btn" type="button" onClick={logout}><FontAwesomeIcon icon={faRightFromBracket}/></button>
        </li>
      </ul>
    </nav>
  );
};
