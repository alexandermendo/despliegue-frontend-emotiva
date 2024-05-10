import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getSportsData, url } from "../../../../../../../../../common/utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import './sportView.css';

// Componente RelevanteView con varias tarjetas de noticias
export const SportView = () => {
  const navigate = useNavigate();
  const noticiasRef = useRef();
  const [sports, setSports] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => { await getSportsData(setSports, setError) };
    fetchNews();
  }, []);

  const goToHome = () => { navigate("/"); }

  return (
    <div ref={noticiasRef} id="noticias">
      <div className="custom-relev-container">
        <div className="relevante-title">
          <img src="../assets/Icono.png" alt="Logo de la empresa" className="custom-logo" />
          <h2>Deportes</h2>
        </div>

        <div className="card-container">
          {sports && sports.length > 0 ? (
            sports.map((noticia, index) => (
              <Link to={`/sports/${noticia._id}`} key={index} className="custom-link">
                <div className="card custom-card-main">
                  <div className="row no-gutters">
                    <div className="col-md-4">
                      <img className="custom-card-img-3" src={`${url}/${noticia.image}`} alt="Ligero" />
                    </div>
                    <div className="col-md-8">
                      <div className="custom-card-body">
                        <h5 className="custom-card-title">{noticia.title}</h5>
                        <p className="custom-card-text">{noticia.subtitle}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>{error && <p>Error: {error}</p>}</p>
          )}
        </div>

        <button className="custom-btn-ver-mas" onClick={goToHome}>
          Volver al Inicio <FontAwesomeIcon icon={faHouse} />
        </button>
      </div>
    </div>
  );
};
