import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { url } from '../../../../../../common/utils';
import './entertainmentDash.css';

export const EntertainmentfDash = () => {
  const navigate = useNavigate ();
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [lifeEditing, setLifeEditing] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/entertainment/getEntertainment`);
        if (!response.ok) throw new Error('Error al obtener los datos');
        const data = await response.json();
        setNews(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  const handleUpdate = (n) => {
    setLifeEditing(n);
    setIsEditModalOpen(true);
  };

  const handleCancelUpdate = () => {
    setLifeEditing(null);
    setImageFile(null);
    setIsEditModalOpen(false);
  };

  const handleSaveUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('_id', lifeEditing._id);
      formData.append('title', lifeEditing.title);
      formData.append('subtitle', lifeEditing.subtitle);
      formData.append('description', lifeEditing.description);

      if (imageFile) formData.append('fotoFileNewsPath', imageFile);
      const response = await fetch(`${url}/entertainment/${lifeEditing._id}`, { method: 'PUT', body: formData });

      if (!response.ok) throw new Error('Error al actualizar los datos');

      // Actualizar el estado del slider después de la edición
      setNews((prevNews) => prevNews.map((n) => n._id === lifeEditing._id ? { ...n, ...lifeEditing } : n));

      // Limpiar el estado de edición
      setLifeEditing(null);
      setImageFile(null);
      setIsEditModalOpen(false);
    } catch (error) { console.error('Error al guardar los cambios:', error.message) }
  };

  const handleDelete = async (_id) => {
    try {
      const response = await fetch(`${url}/entertainment/${_id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error al eliminar la celebridad');
      const updatedNews = news.filter((n) => n._id !== _id);
      setNews(updatedNews);
    } catch (error) { setError(error.message) }
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength)}...`; // Truncar el texto y agregar puntos suspensivos
    }
    return text;
  };

  const addEntertainment = () => {
    navigate("/dashboard/add-entertainment")
  }

  return (
    <div className='st-tab-sli'>
      <h2>Entretenimiento</h2>
      <button className='btn-add-staff' onClick={addEntertainment}>Agregar Nota</button>
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
            {Array.isArray(news) && news.length > 0 ? (
              news.map((n) => (
                <tr key={n._id}>
                  <td>{n._id}</td>
                  <td>{n.title}</td>
                  <td>{n.subtitle}</td>
                  <td>
                    <div dangerouslySetInnerHTML={{ __html: truncateText(n.description, 100) }} />
                  </td>
                  <td>
                    <button className="edit" onClick={() => handleUpdate(n)}>
                      <FontAwesomeIcon icon={faEdit} size="1x" />
                    </button>
                    <button className="trash" onClick={() => handleDelete(n._id)}>
                      <FontAwesomeIcon icon={faTrashAlt} size="1x" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No hay noticias disponibles</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={handleCancelUpdate}
        contentLabel="Editar Noticia"
        className="custom-modal"
        overlayClassName="custom-overlay"
      >
        {lifeEditing && (
          <div className="form-ent">
            <h3>Editar Noticia</h3>
            <div className="col-md-12">
              <form>
                <div className="mb-3">
                  <label htmlFor="_id" className="form-label">ID</label>
                  <input
                    type="text"
                    value={lifeEditing._id}
                    onChange={(e) =>
                      setLifeEditing({ ...lifeEditing, _id: e.target.value })
                    }
                    className="form-control"
                    disabled
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Título</label>
                  <input
                    type="text"
                    value={lifeEditing.title}
                    onChange={(e) =>
                      setLifeEditing({ ...lifeEditing, title: e.target.value })
                    }
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="subtitle" className="form-label">Subtítulo</label>
                  <input
                    type="text"
                    value={lifeEditing.subtitle}
                    onChange={(e) =>
                      setLifeEditing({ ...lifeEditing, subtitle: e.target.value })
                    }
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Descripción</label>
                  <textarea
                    type="text"
                    value={new DOMParser().parseFromString(lifeEditing.description, 'text/html').body.textContent}
                    onChange={(e) =>
                      setLifeEditing({
                        ...lifeEditing,
                        description: e.target.value,
                      })
                    }
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="image" className="form-label">Imagen</label>
                  <input type="file" onChange={(e) => setImageFile(e.target.files[0])} className="form-control" />
                </div>

                <div className="slide d-flex justify-content-end">
                  <button type="button" onClick={handleCancelUpdate} className="btn-cancel-ent">
                    Cancelar
                  </button>
                  <button type="button" onClick={handleSaveUpdate} className="btn-update-ent">
                    Guardar Cambios
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
