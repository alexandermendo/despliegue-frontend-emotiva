import { useState } from 'react';
import './contacto.css';

export const Contacto = () => {
  const [formData, setFormData] = useState({ nombre: '', apellido: '', email: '', ciudad: '', telefono: '', archivo: null });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArchivoChange = (e) => { setFormData({ ...formData, archivo: e.target.files[0] }) };
  const handleSubmit = (e) => { e.preventDefault(); console.log(formData) };

  return (
    <div className="container-contact">
      <h2>Trabaja con Nosotros</h2>
      <div className="row">
        <form onSubmit={handleSubmit}>
          <div>
            <div className='col-md-6'>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre:</label>
                <input type="text" className="form-control" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} />
              </div>
            </div>
            <div className='col-md-6'>
              <div className="mb-3">
                <label htmlFor="apellido" className="form-label">Apellido:</label>
                <input type="text" className="form-control" id="apellido" name="apellido" value={formData.apellido} onChange={handleChange} />
              </div>
            </div>
          </div>

          <div>
            <div className='col-md-6'>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} />
              </div>
            </div>
            <div className='col-md-6'>
              <div className="mb-3">
                <label htmlFor="telefono" className="form-label">Teléfono:</label>
                <input type="tel" className="form-control" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="ciudad" className="form-label">Ciudad:</label>
            <input type="text" className="form-control" id="ciudad" name="ciudad" value={formData.ciudad} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label htmlFor="archivo" className="form-label">Archivo:</label>
            <input type="file" className="form-control" id="archivo" name="archivo" onChange={handleArchivoChange} />
          </div>
          <button className="btn-sen">Enviar</button>
        </form>
      </div>
    </div>
  );
};

