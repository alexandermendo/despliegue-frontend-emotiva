import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { fetchTop10, url } from '../../../../../../../../common/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faEquals, faHouse } from '@fortawesome/free-solid-svg-icons';
import './top10View.css';

export const Top10View = () => {
  const navigate = useNavigate();
  const [top10, setTop10] = useState([]);

  useEffect(() => {
    const fetchRanking = async () => { await fetchTop10(setTop10) };
    fetchRanking();
  }, []);

  const goToHome = () => { navigate("/"); }

  return (
    <div className='top-10-container'>
      <div className="header">
        <img src="../assets/Icono.png" alt="Logo de la empresa" className="logo-e" />
        <h1>EMOTIVA Top 10</h1>
      </div>

      <ol>
        {top10.map((item, index) => (
          <li key={index}>
            <div className='ranking-info'>
              <span className='ranking-number'>{index + 1}</span> {/* Muestra el número de ranking */}
              <img src={`${url}/${item.foto}`} className="img-top-10" alt={`Portada Canción ${index + 1}`} />
            </div>
            <div className='text-top'>
              <h2>{item.nombre}</h2> {/* Cambiado de h1 a h2 para mejor semántica */}
              <p>{item.artista}</p>
            </div>
            <div className='ranking-change'>
              {index === 0 ? <FontAwesomeIcon icon={faArrowUp} className="arrow-up" /> : null} {/* Muestra el ícono de subida solo para el primer elemento */}
              {index === top10.length - 1 ? <FontAwesomeIcon icon={faArrowDown} className="arrow-down" /> : null} {/* Muestra el ícono de bajada solo para el último elemento */}
              {index > 0 && index < top10.length - 1 ? <FontAwesomeIcon icon={faEquals} className="arrow-equal" /> : null} {/* Muestra el ícono de igual para los elementos intermedios */}
            </div>
          </li>
        ))}
      </ol>
      <button className="custom-btn-top-10" onClick={goToHome}>Volver al Inicio <FontAwesomeIcon icon={faHouse} /></button>
    </div>
  )
}