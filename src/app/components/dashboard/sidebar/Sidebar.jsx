import { Link } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";
import { sidebarItems } from "../../../../../../common/utils";
import './sidebar.css';

export const SidebarDash = () => {
  const { isAuthenticated, rol } = useAuthContext();

  return (
    <div className="sidebar">
      <a className="navbar-brand" href="/"><img className="img-logo-emotiva-1" src="../assets/Emotiva_Logo.png" alt="Ligero"/></a>
      {isAuthenticated ? (
        <ul>
          {sidebarItems.map((item, index) => ((rol === item.role || rol === "Administrador") && (
              <li key={index} className="dash-item">
                <img src="../assets/Icono.png" alt="Logo de la empresa" className="logo-dash"/>
                <div className="text-side"><Link to={item.link} className="title-text">{item.text}</Link></div>
              </li>
            )
          ))}
        </ul>
      ) : (<div><p>Debe iniciar sesión para acceder a esta página.</p></div>)}
    </div>
  );
};
