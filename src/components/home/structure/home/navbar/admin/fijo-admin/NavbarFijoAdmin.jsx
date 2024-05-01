import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../../../../../contexts/AuthContext";
import { url } from "../../../../../../../../../common/utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessBoard, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./navbarFijoAdmin.css";

export const NavbarFijoAdmin = () => {
  const value = useAuthContext();
  const navigate = useNavigate();
  const [imageData, setImageData] = useState([{ fotoFileLogoPath: "" }]);
  const [setError] = useState(null);

  useEffect(() => {
    async function fetchLogoData() {
      try {
        const response = await fetch(`${url}/logo/getLogo`);
        if (!response.ok) throw new Error('No se pudo obtener el slider');
        const data = await response.json();
        setImageData(data.data);
      } catch (err) { setError(err.message); }
    }
    fetchLogoData();
  }, [])

  const logout = () => {
    localStorage.removeItem('authToken');
    if (!localStorage.getItem('authToken')) console.log('Token eliminado con éxito.');
    else console.log('Error al eliminar el token.');
    navigate("/private/logout");
  }

  const gotoDashboard = () => { navigate("/dashboard"); }

  return (
    <>
      <nav className={`emotiva-navbar navbar navbar-light justify-content-between`} >
        <div className="container-fluid">
          <a className="navbar-brand" href="/"><img className="img-logo-emotiva" src={`${url}/${imageData[0].fotoFileLogoPath}`}
            alt="Ligero" /></a>
          <form className="form-inline d-flex">
            <h1 className="home-auth">Página de Inicio: {value.isAuthenticated ? 'SI' : 'NO'} </h1>
              <button className="btn-cre-usu mobile-menu-btn" type="button" onClick={gotoDashboard}><FontAwesomeIcon icon={faChessBoard} /></button>
              <button className="btn-cer-ses mobile-menu-btn" type="button" onClick={logout}><FontAwesomeIcon icon={faRightFromBracket} /></button>
          </form>
        </div>
      </nav>
    </>
  );
};
