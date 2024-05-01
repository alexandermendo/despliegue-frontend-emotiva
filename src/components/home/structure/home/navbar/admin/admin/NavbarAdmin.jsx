import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../../../../../contexts/AuthContext";
import { fetchLogoData, url } from "../../../../../../../../../common/utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessBoard, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./navbarAdmin.css";

export const NavbarAdmin = () => {
  const value = useAuthContext();
  const navigate = useNavigate();
  const noticiasRef = useRef();
  const deportesRef = useRef();
  const entertainmentRef = useRef();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [imageData, setImageData] = useState([{ fotoFileLogoPath: "" } ]);
  const [setError] = useState(null);

  const handleScroll = () => {
    if (window.scrollY > 0) setIsScrolled(true);
    else setIsScrolled(false);
  };

  const toggleMobileMenu = () => { setIsMobileMenuOpen(!isMobileMenuOpen); };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => { window.removeEventListener("scroll", handleScroll); };
  }, []);

  useEffect(() => {
    const fetchLogo = async () => { await fetchLogoData(setImageData, setError)};
    fetchLogo();
  }, [])

  const logout = () => {
    localStorage.removeItem('authToken');
    if (!localStorage.getItem('authToken')) console.log('Token eliminado con éxito.');
    else console.log('Error al eliminar el token.');
    navigate("/private/logout");
  }

  const gotoDashboard = () => { navigate("/dashboard/"); }
  const goToNews = () => { if (noticiasRef.current) { noticiasRef.current.scrollIntoView({ behavior: "smooth" })}};
  const goToSports = () => { if (deportesRef.current) { deportesRef.current.scrollIntoView({ behavior: "smooth" })}};
  const goToEntertainment = () => { if (entertainmentRef.current) { entertainmentRef.current.scrollIntoView({ behavior: "smooth" })}};

  return (
    <>
      <nav className={`navbar navbar-expand-lg ligero-container-navbar ${isScrolled ? "scrolled fixed-top" : ""}`} >
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" 
           aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={toggleMobileMenu}>
            <div className="menu-bar"></div>
            <div className="menu-bar"></div>
            <div className="menu-bar"></div>
          </button>
          <a className="navbar-brand" href="/"><img className="img-logo-emotiva" src={`${url}/${imageData[0].fotoFileLogoPath}`}
            alt="Ligero"/></a>
          <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`} id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><a className="nav-link" href="#noticias" onClick={goToNews}>Noticias</a></li>
              <li className="nav-item"><a className="nav-link" href="#deportes" onClick={goToSports}>Deportes</a></li>
              <li className="nav-item"><a className="nav-link" href="#entretenimiento" onClick={goToEntertainment}>Entretenimiento</a></li>
            </ul>
            <form className="d-flex" role="search">
              <h1 className="home-auth">Página de Inicio: {value.isAuthenticated ? 'SI' : 'NO'} </h1>
              <button className="btn-cre-usu mobile-menu-btn" type="button" onClick={gotoDashboard}><FontAwesomeIcon icon={faChessBoard} /></button>
              <button className="btn-cer-ses mobile-menu-btn" type="button" onClick={logout}><FontAwesomeIcon icon={faRightFromBracket} /></button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};
