import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../../../../contexts/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./navbar.css";

export const Navbar = () => {
  const value = useAuthContext();
  const navigate = useNavigate();
  const noticiasRef = useRef();
  const deportesRef = useRef();
  const entertainmentRef = useRef();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) setIsScrolled(true);
    else setIsScrolled(false);
  };

  const toggleMobileMenu = () => { setIsMobileMenuOpen(!isMobileMenuOpen); };

  useEffect(() => {window.addEventListener("scroll", handleScroll);
    return () => { window.removeEventListener("scroll", handleScroll); };
  }, []);

  const login = () => { navigate("/login")}
  const goToNews = () => { if (noticiasRef.current) noticiasRef.current.scrollIntoView({ behavior: "smooth" })};
  const goToSports = () => { if (deportesRef.current) { deportesRef.current.scrollIntoView({ behavior: "smooth" })}};
  const goToEntertainment = () => { if (entertainmentRef.current) { entertainmentRef.current.scrollIntoView({ behavior: "smooth" })}};
  
  return (
    <>
      <nav className={`navbar navbar-expand-lg ligero-container-navbar ${isScrolled ? "scrolled fixed-top" : ""}`}>
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={toggleMobileMenu}>
            <div className="menu-bar"></div>
            <div className="menu-bar"></div>
            <div className="menu-bar"></div>
          </button>
          <a className="navbar-brand" href="/"><img className="img-logo-emotiva" src="../assets/Emotiva_Logo.png" alt="Ligero" /></a>

          <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`} id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><a className="nav-link" href="#noticias" onClick={goToNews}>Noticias</a></li>
              <li className="nav-item"><a className="nav-link" href="#deportes" onClick={goToSports}>Deportes</a></li>
              <li className="nav-item"><a className="nav-link" href="#entretenimiento" onClick={goToEntertainment}>Entretenimiento</a></li>
            </ul>
            <form className="d-flex" role="search">
              <h1 className="home-auth">Página de Inicio: {value.isAuthenticated ? 'SI' : 'NO'} </h1>
              <button className="btn-cer-ses mobile-menu-btn" type="button" onClick={login}><FontAwesomeIcon icon={faRightToBracket} /></button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};
