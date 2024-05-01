import { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { fetchStaffData, settingsStaff, url } from "../../../../../../../../common/utils";
import './staff.css';

export const Staff = () => {
  const staffRef = useRef();
  const [staffData, setStaffData] = useState([]);
  const [loading, setLoading] = useState(true);

  const settings = settingsStaff;

  useEffect(() => {
    const fetchData = async () => { await fetchStaffData(setStaffData, setLoading) };
    fetchData();
  }, []);

  const items = staffData.map((staffMember, index) => (
    <Link to={`/staff/detalle/${staffMember.identi}`} key={index} className="slider-card">
      <div className="card">
        <img src={`${url}/${staffMember.fot_fam}`} className="card-img-top-1" alt={staffMember.nombre} />
        <div className="card-body-staff">
          <p className="card-name-staff">{staffMember.nombre}</p>
          <h5 className="card-lastname-staff">{staffMember.apelli}</h5>
        </div>
        <div className="card-body-st">
          <p className="card-name-st">{staffMember.nom_cat}</p>
        </div>
      </div>
    </Link>
  ));

  if (loading) return <p>Cargando datos...</p>;

  return (
    <div ref={staffRef} id="staff">
      <div className="slider-container staff-cont">
        <div className="header">
          <img src="../assets/Icono.png" alt="Logo de la empresa" className="logo" />
          <h2>Nuestro Staff</h2>
        </div>
        <Slider {...settings} className="slider">
          {items}
        </Slider>
      </div>
    </div>
  );
};
