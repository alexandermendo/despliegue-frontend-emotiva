import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { fetchStaffDetails, url } from "../../../../../../../../common/utils";
import './detalleStaff.css';

export const DetalleStaff = () => {
  const { id } = useParams(); // Obtiene el valor del parámetro de la URL
  const [staffDetails, setStaffDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => { await fetchStaffDetails(id, setStaffDetails, setLoading) };
    fetchData();
  }, []);

  if (loading) return <p>Cargando detalles del personal...</p>;
  if (!staffDetails) return <p>No se encontraron detalles para el personal con ID {id}</p>;
  
  return (
    <div className="cont-staff-1">
      <div className="row">
        <div className="col-md-6">
          <div className="details-staff">
            <div className="body-staff">
              <p className="name-staff">{staffDetails.nombre}</p>
              <h5 className="lastname-staff">{staffDetails.apelli}</h5>
              <div>
                <a href={`https://www.instagram.com/${staffDetails.red_soc}`} target="_blank" rel="noopener noreferrer" className="insta-logo">
                  <FontAwesomeIcon icon={faInstagram} size="2x" />
                </a>
              </div>
            </div>
            <div className="staff-details">
              <div className="social-m">
                <h2>Categoría: </h2>
                <p>{staffDetails.nom_cat}</p>
              </div>
              <div className="social-m">
                <h2>Ciudad: </h2>
                <p>{staffDetails.nom_ciu}</p>
              </div>
              <div className="social-m">
                <h2>País: </h2>
                <p>{staffDetails.nom_pai}</p>
              </div>
              <div className="biograf">
                <p dangerouslySetInnerHTML={{ __html: staffDetails.biograf }} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <img src={`${url}/${staffDetails.fot_fam}`} className="card-img-st" alt={staffDetails.nombre} />
        </div>
      </div>
    </div>
  );
};
