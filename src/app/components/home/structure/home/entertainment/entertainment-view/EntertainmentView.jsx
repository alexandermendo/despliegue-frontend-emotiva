import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchEntertainmentData, url } from "../../../../../../../../common/utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import './entertainmentView.css';

// Componente RelevanteView con varias tarjetas de noticias
export const EntertainmentView = () => {
  const navigate = useNavigate();
  const noticiasRef = useRef();
  const [entertainmentData, setEntertainmentData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => { await fetchEntertainmentData(setEntertainmentData, setError) };
    fetchNews();
  }, []);

  const goToHome = () => { navigate("/"); }

  return (
    <div ref={noticiasRef} id="noticias">
      <div className="custom-relev-container">
        <div className="relevante-title">
          <img src="../assets/Icono.png" alt="Logo de la empresa" className="custom-logo" />
          <h2>Cultura y Entretenimiento</h2>
        </div>

        <div className="card-container">
          {entertainmentData && entertainmentData.length > 0 ? (
            entertainmentData.map((noticia, index) => (
              <Link to={`/entertainment/${noticia._id}`} key={index} className="custom-link">
                <div className="card custom-card-main">
                  <div className="row no-gutters">
                    <div className="col-md-4">
                      <img className="custom-card-img-4" src={`${url}/${noticia.image}`} alt="Ligero" />
                    </div>
                    <div className="col-md-8">
                      <div className="custom-card-body">
                        <h5 className="custom-card-title-ent">{noticia.title}</h5>
                        <p className="custom-card-text-ent">{noticia.subtitle}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))) : ( <p>{error && <p>Error: {error}</p>}</p> )}
        </div>
        <button className="custom-btn-ver-mas" onClick={goToHome}>Volver al Inicio <FontAwesomeIcon icon={faHouse} /></button>
      </div>
    </div>
  );
};
