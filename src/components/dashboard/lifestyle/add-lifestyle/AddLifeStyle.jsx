import { useState } from 'react';
import { Message, url } from '../../../../../../common/utils';
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";
import './addLifeStyle.css';

export const AddLifeStyle = () => {
  const [formData, setFormData] = useState({ title: "", subtitle: "", description: "", fotoFileNewsPath: null });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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
    if (!formData.title || !formData.subtitle || !formData.description || !formData.fotoFileNewsPath) {
      setError('Faltan datos requeridos');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("subtitle", formData.subtitle);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("fotoFileNewsPath", formData.fotoFileNewsPath);

    try {
      const response = await fetch(`${url}/lifestyle/createLifestyle`, { method: "POST", body: formDataToSend });
      const data = await response.json();
      if (response.ok) { setSuccess('Noticia de Entretenimiento creada con éxito.'); setError(null); } 
      else console.error(data.error || "Error al agregar contenido");
    } catch (error) { console.error("Error al agregar contenido:", error); setError("Error al agregar contenido"); }
  };

  return (
    <div className="container">
      <h2>Ingresar Contenido</h2>
      {error && <Message type="error">{error}</Message>}
      {success && <Message type="success">Contenido agregado con éxito</Message>}
      <p>Estilo de Vida</p>
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label-1">Título</label>
              <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleChange}/>
            </div>
            <div className="mb-3">
              <label htmlFor="apellido" className="form-label-1">Subtítulo</label>
              <input type="text" className="form-control" id="subtitle" name="subtitle" value={formData.subtitle} onChange={handleChange}/>
            </div>
            <div className="mb-3">
              <label htmlFor="categoria" className="form-label-1">Descripción</label>
              <ReactQuill type="text" className="quill-editor" id="description" name="description" value={formData.description}
                onChange={(value) => setFormData({ ...formData, description: value })}
              />
            </div>
            <button type="submit" className="btn-add-cel">Ingresar Contenido</button>
          </form>
        </div>

        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="foto" className="form-label-1">Foto</label>
            <input type="file" className="form-control" id="image" name="image" accept="image/*" onChange={handleFileChange}/>
          </div>
        </div>
      </div>
    </div>
  )
}