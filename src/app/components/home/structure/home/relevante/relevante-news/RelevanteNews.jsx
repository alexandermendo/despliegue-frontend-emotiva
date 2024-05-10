import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { url, fetchUsuarios, fetchRelevanteDetails, formatDateTime } from "../../../../../../../../../common/utils";
import './relevanteNews.css';

export const RelevanteNews = () => {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [relevanteDetails, setRelevanteDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usuariosData = await fetchUsuarios(localStorage.getItem("token"));
        console.log("Usuarios obtenidos:", usuariosData);
        setUsuario(usuariosData);
        const relevanteDetailsData = await fetchRelevanteDetails(id, setRelevanteDetails, setLoading);  // Llamada a la función fetchRelevanteDetails desde utils.js
        console.log("Detalles relevantes obtenidos:", relevanteDetailsData); // Imprimir detalles relevantes
      } catch (error) {
        console.error("Error al obtener datos:", error);
      } finally {
        setLoading(false);
      }

    };
    fetchData();
  }, [id]);

  if (loading) return <p>Cargando datos...</p>;
  return (
    <>
      <div className='cont-news-1'>
        <p>Lo + Relevante</p>
        <h1>{relevanteDetails.data.title}</h1>
      </div>

      <div className='cont-pub'>
        {usuario && usuario.length > 0 && (
          <div className="pub-dat"><p>Publicado por: {usuario[0].nombre}{' '} - {formatDateTime(relevanteDetails.data.publishDate)} </p></div>
        )}
      </div>


      <div className='cont-img'>
        <img src={`${url}/${relevanteDetails.data.image}`} alt="Foto 1" className="relevante-foto" />
      </div>

      <div className='cont-texto'>
        <div dangerouslySetInnerHTML={{ __html: relevanteDetails.data.description }} className="cont-texto-p" />
      </div>
    </>
  )
}