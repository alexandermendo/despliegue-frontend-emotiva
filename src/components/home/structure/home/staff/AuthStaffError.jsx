import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import './authStaffError.css';

export const AuthStaffError = () => {
  const navigate = useNavigate();

  const goToHomeBack = () => { navigate("/") }

  return (
    <div className="auth-error-container">
      <div className="error-icon">
        <FontAwesomeIcon icon={faTimes} />
      </div>
      <h2>¡Lo sentimos!</h2>
      <p className="error-paragraph">
        Usted no puede ver este contenido si no está autenticado. Por favor
        inicie sesión para ver este contenido. De lo contrario, lo invito para
        que haga clic en el siguiente botón:
      </p>
      <button className="btn-back-error" onClick={goToHomeBack}>
        Regresar
      </button>
    </div>
  );
}