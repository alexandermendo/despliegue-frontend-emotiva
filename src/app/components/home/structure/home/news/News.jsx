import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSliderDetails, fetchUsuarios, formatDateTime, url } from "../../../../../../../../common/utils";
import './news.css';

export const News = () => {
  const [usuario, setUsuario] = useState(null);
  const { id } = useParams(); // Obtiene el valor del parámetro de la URL
  const [sliderDetails, setSliderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const usuariosData = await fetchUsuarios(localStorage.getItem("token"));
      setUsuario(usuariosData);
      await fetchSliderDetails(id, setSliderDetails, setLoading);
    };
    fetchData();
  }, [id])

  if (loading) return <p>Cargando datos...</p>;

  return (
    <>
      <div className='cont-news-s'>
        <p>Noticias</p>
        <h1>{sliderDetails.data.title}</h1>
      </div>

      <div className='cont-pub'>
        {usuario && usuario.length > 0 && (
          <div className="pub-dat"><p>Publicado por: {usuario[0].nombre}{' '}- {formatDateTime(sliderDetails.data.publishDate)}</p></div>
        )}
      </div>

      <div className='cont-img'>
        <img src={`${url}/${sliderDetails.data.image}`} alt="Foto 1" className="foto-news" />
      </div>

      <div className='cont-texto'>
        <div dangerouslySetInnerHTML={{ __html: sliderDetails.data.description }} className="cont-texto-p"/>
      </div>
    </>
  )
}