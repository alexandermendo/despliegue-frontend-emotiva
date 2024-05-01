import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../../../../../contexts/AuthContext";
import { fetchLogoData, url } from "../../../../../../../../../common/utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./navbarFijo.css";

export const NavbarFijo = () => {
  const value = useAuthContext();
  const navigate = useNavigate();
  const [imageData, setImageData] = useState([{ fotoFileLogoPath: "" }]);
  const [setError] = useState(null);

  useEffect(() => {
    const fetchLogo = async () => { await fetchLogoData(setImageData, setError)};
    fetchLogo();
  }, [])

  const login = () => { navigate("/login")}

  return (
    <>
      <nav className={`emotiva-navbar navbar navbar-light justify-content-between`} >
        <div className="container-fluid">
          <a className="navbar-brand" href="/"><img className="img-logo-emotiva" src={`${url}/${imageData[0].fotoFileLogoPath}`}
            alt="Ligero" /></a>
          <form className="form-inline d-flex">
            <h1 className="home-auth">Página de Inicio: {value.isAuthenticated ? 'SI' : 'NO'} </h1>
            <button className="btn-cer-ses mobile-menu-btn" type="button" onClick={login}><FontAwesomeIcon icon={faRightToBracket} /></button>
          </form>
        </div>
      </nav>
    </>
  );
};
