import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getLifestyleData, url } from "../../../../../../../../../common/utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import './styleTopView.css';

// Componente RelevanteView con varias tarjetas de noticias
export const StyleTopView = () => {
  const navigate = useNavigate();
  const noticiasRef = useRef();
  const [lifeStyleData, setLifestyleData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => { const fetchNews = async () => { await getLifestyleData(setLifestyleData) };
    fetchNews();
  }, []);

  const goToHome = () => { navigate("/"); }

  return (
    <div ref={noticiasRef} id="noticias">
      <div className="custom-relev-container">
        <div className="relevante-title">
          <img src="../assets/Icono.png" alt="Logo de la empresa" className="custom-logo" />
          <h2>Estilo de Vida</h2>
        </div>

        <div className="card-container">
          {lifeStyleData && lifeStyleData.length > 0 ? (
            lifeStyleData.map(({ _id, image, title, subtitle }, index) => (
              <Link to={`/lifestyle/${_id}`} key={index} className="custom-link">
                <div className="card custom-card-main">
                  <div className="row no-gutters">
                    <div className="col-md-4"><img className="custom-card-img-2" src={`${url}/${image}`} alt="Ligero" /></div>
                    <div className="col-md-8">
                      <div className="custom-card-body">
                        <h5 className="custom-card-title">{title}</h5>
                        <p className="custom-card-text">{subtitle}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : ( <p>{error && <p>Error: {error}</p>}</p> )}
        </div>
        <button className="custom-btn-ver-mas" onClick={goToHome}>Volver al Inicio <FontAwesomeIcon icon={faHouse} /></button>
      </div>
    </div>
  );
};
