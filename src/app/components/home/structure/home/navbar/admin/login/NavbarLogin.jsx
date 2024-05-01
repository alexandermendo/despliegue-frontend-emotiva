import { useNavigate } from "react-router";
import './navbarLogin.css';
import "bootstrap/dist/css/bootstrap.min.css";

export const NavbarLogin = () => {
  let navigate = useNavigate();

  const createAccount = (event) => {
    event.preventDefault();
    navigate('/create-account');
  }

  return (
    <>
      <nav className={`navbar navbar-expand-lg emotiva-container-navbar`}>
        <div className="container-fluid">
          <a className="navbar-brand" href="/"><img
            className="img-logo-emotiva"
            src="../assets/Emotiva_Logo.png"
            alt="Ligero"
          /></a>
          <div className="navbar-search-2">
            <button className="btn-cre-cue btn" type="submit" onClick={createAccount}>Crear Cuenta</button>
          </div>
        </div>
      </nav>
    </>
  );
};
