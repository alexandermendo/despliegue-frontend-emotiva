import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { fetchTop10, getLifestyleData, url } from '../../../../../../../common/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './styleTop.css';

export const StyleTop = () => {
  const navigate = useNavigate();
  const styleRef = useRef();
  const [lifestyleData, setLifestyleData] = useState([]);
  const [top10, setTop10] = useState([]);

  useEffect(() => {
    const fetchData = async () => { await getLifestyleData(setLifestyleData) };
    const fetchRanking = async () => { await fetchTop10( setTop10 )};
    fetchData();
    fetchRanking();
  }, []);

  const goToNews = () => { navigate("/lifestyle"); }
  const goToTop10 = () => { navigate("/top-10"); }

  return (
    <div ref={styleRef} id="lifestyle">
      <div className="styletop-container st-cont-2">
        <div className="row align-items-start">
          <div className="col-md-6">
            <div className="header">
              <img src="../assets/Icono.png" alt="Logo de la empresa" className="logo" />
              <h2>Estilo de Vida</h2>
            </div>

            <div className="row">
              {lifestyleData.slice(0, 4).map((item, index) => (
                <Link to={`/lifestyle/${item._id}`} key={index} className="col-12 col-sm-6">
                  <div className="card estilo-card">
                    <img className="foto-card-2 img-fluid" src={`${url}/${item.image}`} alt={item.title} />
                    <div className="card-body">
                      <p>{item.subtitle}</p>
                      <h5 className="card-title">{item.title}</h5>
                    </div>
                  </div>
                </Link>
              ))}
              <button className="btn-ver-mas" onClick={goToNews}>Ver Más <FontAwesomeIcon icon={faPlus} /></button>
            </div>
          </div>

          <div className="col-md-6">
            <div className='top-10'>
              <div className="header">
                <img src="../assets/Icono.png" alt="Logo de la empresa" className="logo-e" />
                <h1>EMOTIVA Top 10</h1>
              </div>

              <ol>
                {top10.map((item, index) => (
                  <li key={index}>
                    <img src={`${url}/${item.foto}`} className="img-top-10" alt={`Portada Canción ${index + 1}`} />
                    <div className='text-top'>
                      <h1>{item.nombre}</h1>
                      <p>{item.artista}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <button className='btn-top-list' onClick={goToTop10}>Ver la Lista Completa</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
