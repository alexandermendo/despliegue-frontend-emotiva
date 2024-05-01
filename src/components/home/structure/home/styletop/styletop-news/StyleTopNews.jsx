import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchStyleDetails, fetchUsuarios, formatFechaHora, url } from "../../../../../../../../common/utils";
import './styleTopNews.css';

export const StyleTopNews = () => {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [styleDetails, setStyleDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const usuariosData = await fetchUsuarios(localStorage.getItem("token"));
      setUsuario(usuariosData);
      await fetchStyleDetails(id, setStyleDetails, setLoading);  // Llamada a la función fetchSportsDetails desde utils.js
    };
    fetchData();
  }, [])

  if (loading) return <p>Cargando datos...</p>;
  const formatDate = formatFechaHora(styleDetails.data.publishDate);

  return (
    <>
      <div className='cont-style'>
        <p>Estilo de Vida</p>
        <h1>{styleDetails.data.title}</h1>
      </div>

      <div className='cont-pub'>
        {usuario && usuario.length > 0 && (
          <div className="pub-dat"><p>Publicado por: {usuario[0].nombre}{' '} - {formatDate}</p></div>
        )}
      </div>

      <div className='cont-img'>
        <img src={`${url}/${styleDetails.data.image}`} alt="Foto 1" className="foto-style" />
      </div>

      <div className='cont-texto'>
        <div dangerouslySetInnerHTML={{ __html: styleDetails.data.description }} />
      </div>
    </>
  )
}