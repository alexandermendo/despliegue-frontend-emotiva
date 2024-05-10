import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchEntertainmentDetails, fetchUsuarios, formatDateTime, url } from "../../../../../../../../../common/utils";
import './entertainmentNews.css';

export const EntertainmentNews = () => {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [entertainmentDetails, setEntertainmentDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const usuariosData = await fetchUsuarios(localStorage.getItem("token"));
      setUsuario(usuariosData);
      await fetchEntertainmentDetails(id, setEntertainmentDetails, setLoading);  // Llamada a la función fetchSportsDetails desde utils.js
    };
    fetchData();
  }, [id])

  if (loading) return <p>Cargando datos...</p>;

  return (
    <>
      <div className='cont-ent'>
        <p>Entretenimiento</p>
        <h1>{entertainmentDetails.data.title}</h1>
      </div>

      <div className='cont-pub'>
        {usuario && usuario.length > 0 && (
          <div className="pub-dat"><p>Publicado por: {usuario[0].nombre}{' '}- {formatDateTime(entertainmentDetails.data.publishDate)}</p></div>
        )}
      </div>

      <div className='cont-img'>
        <img src={`${url}/${entertainmentDetails.data.image}`} alt="Foto 1" className="foto-sport" />
      </div>

      <div className='cont-texto'>
        <div dangerouslySetInnerHTML={{ __html: entertainmentDetails.data.description }} />
      </div>
    </>
  )
}