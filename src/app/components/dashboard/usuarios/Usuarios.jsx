import { useState } from 'react';
import { Message, url } from '../../../../../../common/utils';
import './usuarios.css';

export const Usuarios = () => {
  const [formData, setFormData] = useState({ nombre: "", artista: "", album: "", genero: "", anio: "", puntuacion: "", fotoFileNewsPath: null });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [canciones, setCanciones] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, fotoFileNewsPath: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.artista || !formData.album || !formData.genero || !formData.anio || !formData.puntuacion || !formData.fotoFileNewsPath) {
      setError('Faltan datos requeridos');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("nombre", formData.nombre);
    formDataToSend.append("artista", formData.artista);
    formDataToSend.append("album", formData.album);
    formDataToSend.append("genero", formData.genero);
    formDataToSend.append("anio", formData.anio);
    formDataToSend.append("puntuacion", formData.puntuacion);
    formDataToSend.append("fotoFileNewsPath", formData.fotoFileNewsPath);


    try {
      const response = await fetch(`${url}/ranking/createRanking`, { method: "POST", body: formDataToSend });
      const data = await response.json();
      if (response.ok) {
        setSuccess('Contenido creado con éxito.');
        setError(null);

        // Agregar la nueva canción al estado de canciones
        setCanciones(prevCanciones => [...prevCanciones, formData]);

        // Ordenar las canciones por puntuación
        const cancionesOrdenadas = [...canciones, formData].sort((a, b) => b.puntuacion - a.puntuacion);
        setCanciones(cancionesOrdenadas);
      }
      else console.error(data.error || "Error al agregar contenido");
    } catch (error) { console.error("Error al agregar contenido:", error); setError("Error al agregar contenido"); }
  };

  return (
    <div className="container">
      <h2>Ingresar Contenido</h2>
      {error && <Message type="error">{error}</Message>}
      {success && <Message type="success">Contenido agregado con éxito</Message>}
      <p>Top 10</p>
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label-1">Nombre</label>
              <input type="text" className="form-control" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="artista" className="form-label-1">Artista</label>
              <input type="text" className="form-control" id="artista" name="artista" value={formData.artista} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="album" className="form-label-1">Album</label>
              <input type="text" className="form-control" id="album" name="album" value={formData.album} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="genero" className="form-label-1">Genero</label>
              <input type="text" className="form-control" id="genero" name="genero" value={formData.genero} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="anio" className="form-label-1">Año</label>
              <input type="text" className="form-control" id="anio" name="anio" value={formData.anio} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="puntuacion" className="form-label-1">Puntuación</label>
              <input type="text" className="form-control" id="puntuacion" name="puntuacion" value={formData.puntuacion} onChange={handleChange} />
            </div>
            <button type="submit" className="btn-add-cel">Ingresar Contenido</button>
          </form>
        </div>

        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="foto" className="form-label-1">Foto</label>
            <input type="file" className="form-control" id="image" name="image" accept="image/*" onChange={handleFileChange} />
          </div>
        </div>

        {/* Mostrar las canciones */}
        <div>
          <div className='cont-can'>
            <h3>Canciones:</h3>
            <ul className="list-group">
              {canciones.map((cancion, index) => (<li key={index} className="list-group-item">{cancion.nombre}: {cancion.puntuacion}</li>))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};




// const listaOrdenada = nuevaCancionData.sort((a, b) => b.puntuacion - a.puntuacion); // Ordenar de mayor a menor calificación
// setCanciones(listaOrdenada);



{/* <div className='cont-can'>
        <h3>Canciones:</h3>
        <ul className="list-group">
          {canciones.map((cancion, index) => (<li key={index} className="list-group-item">{cancion.nombre}: {cancion.puntuacion}</li>))}
        </ul>
      </div> */}