import { useEffect, useState } from 'react';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { url } from '../../../../../../common/utils';
import './slider.css';

export const Slider = () => {
  const [slider, setSlider] = useState([]);
  const [error, setError] = useState(null);
  const [sliderEditing, setSliderEditing] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/slider/getSlider`);
        if (!response.ok) throw new Error('Error al obtener los datos');
        const data = await response.json();
        setSlider(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  const handleUpdate = (sli) => {
    setSliderEditing(sli);
  };

  const handleCancelUpdate = () => {
    setSliderEditing(null);
    setImageFile(null);
  };

  const handleSaveUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('_id', sliderEditing._id);
      formData.append('title', sliderEditing.title);
      formData.append('subtitle', sliderEditing.subtitle);
      formData.append('description', sliderEditing.description);

      if (imageFile) formData.append('image', imageFile);
      const response = await fetch(`${url}/slider/${sliderEditing._id}`, { method: 'PUT', body: formData });

      if (!response.ok) throw new Error('Error al actualizar los datos');

      // Actualizar el estado del slider después de la edición
      setSlider((prevSlider) => prevSlider.map((sli) => sli._id === sliderEditing._id ? { ...sli, ...sliderEditing } : sli ));

      // Limpiar el estado de edición
      setSliderEditing(null);
      setImageFile(null);
    } catch (error) { console.error('Error al guardar los cambios:', error.message) }
  };

  const handleDelete = async (_id) => {
    try {
      const response = await fetch(`${url}/slider/${_id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error al eliminar la celebridad');
      const updatedSlider = slider.filter((sliders) => sliders._id !== _id);
      setSlider(updatedSlider);
    } catch (error) { setError(error.message) }
  };

  return (
    <div className='st-tab-sli'>
      <h2>Slider</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Título</th>
              <th>Subtítulo</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {slider.map((sli) => (
              <tr key={sli._id}>
                <td>{sli._id}</td>
                <td>{sli.title}</td>
                <td>{sli.subtitle}</td>
                <td>{sli.description}</td>
                <td>
                  <button className="edit" onClick={() => handleUpdate(sli)}> <FontAwesomeIcon icon={faEdit} size="1x" /></button>
                  <button className="trash" onClick={() => handleDelete(sli._id)}><FontAwesomeIcon icon={faTrashAlt} size="1x" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {sliderEditing && (
        <div className="edit-form">
          <h3>Editar Noticia</h3>
          <form>
            <input
              type="text"
              value={sliderEditing._id}
              onChange={(e) =>
                setSliderEditing({ ...sliderEditing, _id: e.target.value })
              }
              disabled
            />
            <input
              type="text"
              value={sliderEditing.title}
              onChange={(e) =>
                setSliderEditing({ ...sliderEditing, title: e.target.value })
              }
            />
            <input
              type="text"
              value={sliderEditing.subtitle}
              onChange={(e) =>
                setSliderEditing({ ...sliderEditing, subtitle: e.target.value })
              }
            />
            <input
              type="text"
              value={sliderEditing.description}
              onChange={(e) =>
                setSliderEditing({
                  ...sliderEditing,
                  description: e.target.value,
                })
              }
            />
            <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />
            <div>
              <button type="button" onClick={handleCancelUpdate}>
                Cancelar
              </button>
              <button type="button" onClick={handleSaveUpdate}>
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
