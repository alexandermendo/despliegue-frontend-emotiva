import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSportsDetails, fetchUsuarios, formatFechaHora, url } from "../../../../../../../../common/utils";
import './sportNews.css';

export const SportNews = () => {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [sportsDetails, setSportsDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const usuariosData = await fetchUsuarios(localStorage.getItem("token"));
      setUsuario(usuariosData);
      await fetchSportsDetails(id, setSportsDetails, setLoading);  // Llamada a la función fetchSportsDetails desde utils.js
    };
    fetchData();
  }, [])

  if (loading) return <p>Cargando datos...</p>;
  const formatDate = formatFechaHora(sportsDetails.data.publishDate);

  return (
    <>
      <div className='cont-sport'>
        <p>Deportes</p>
        <h1>{sportsDetails.data.title}</h1>
      </div>

      <div className='cont-pub'>
        {usuario && usuario.length > 0 && (
          <div className="pub-dat"><p>Publicado por: {usuario[0].nombre}{' '} - {formatDate}</p></div>
        )}
      </div>

      <div className='cont-img'>
        <img src={`${url}/${sportsDetails.data.image}`} alt="Foto 1" className="foto-sport" />
      </div>

      <div className='cont-texto'>
        <div dangerouslySetInnerHTML={{ __html: sportsDetails.data.description }} />
      </div>
    </>
  )
}