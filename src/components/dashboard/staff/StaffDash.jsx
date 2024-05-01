import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { url } from '../../../../../common/utils';
import './staffDash.css';

export const StaffDash = () => {
  const navigate = useNavigate();
  const [celebrities, setCelebrities] = useState([]);
  const [error, setError] = useState(null);
  const [editingCelebrity, setEditingCelebrity] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/celebrities/consulta`);
        if (!response.ok) throw new Error('Error al obtener los datos');
        const data = await response.json();
        setCelebrities(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  const handleUpdate = (celebrity) => {
    setEditingCelebrity(celebrity);
    setIsEditModalOpen(true);
  };

  const handleCancelUpdate = () => {
    setEditingCelebrity(null);
    setIsEditModalOpen(false);
  };
  
  const handleSaveUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('identi', editingCelebrity.identi);
      formData.append('nombre', editingCelebrity.nombre);
      formData.append('apellido', editingCelebrity.apelli);
      formData.append('nom_cat', editingCelebrity.nom_cat);
      formData.append('nom_ciu', editingCelebrity.nom_ciu);
      formData.append('fec_nac', editingCelebrity.fec_nac);
      formData.append('biograf', editingCelebrity.biograf);
      formData.append('red_soc', editingCelebrity.red_soc);

      // Si hay una nueva foto, adjúntala al FormData
      // if (editingCelebrity.fot_fam instanceof File) {
      //   formData.append('foto', editingCelebrity.fot_fam);
      // }

      const response = await fetch(`${url}/celebrities/updatePersonas`, { method: 'PUT', body: formData });
      if (!response.ok) throw new Error('Error al actualizar la celebridad');
      const updatedCelebrityData = await response.json();

      // Actualiza el estado con los datos actualizados del servidor
      const updatedCelebrities = celebrities.map((celebrity) => celebrity.identi === updatedCelebrityData.identi ?
        updatedCelebrityData : celebrity);
      setCelebrities(updatedCelebrities);
      setEditingCelebrity(null);
      setIsEditModalOpen(false);
    } catch (error) { console.error('Error al actualizar la celebridad:', error) }
  };

  const handleDelete = async (identi) => {
    try {
      const response = await fetch(`${url}/celebrities/deletePersonas/${identi}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error al eliminar la celebridad');
      const updatedCelebrities = celebrities.filter((celebrity) => celebrity.identi !== identi);
      setCelebrities(updatedCelebrities);
    } catch (error) { setError(error.message) }
  };

  const addStaff = () => {
    navigate("/dashboard/add-staff");
  }

  return (
    <div className='st-tab-cont'>
      <h2>Staff EMOTIVA 2024</h2>
      <button className='btn-add-staff' onClick={addStaff}>Agregar Staff</button>
      {error ? (
        <p className='text-err'>Error: {error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {celebrities.map((celebrity) => (
              <tr key={celebrity.identi}>
                <td>{celebrity.identi}</td>
                <td>{celebrity.nombre}</td>
                <td>{celebrity.apelli}</td>
                <td>{celebrity.nom_cat}</td>
                <td>
                  <button className="edit" onClick={() => handleUpdate(celebrity)}>
                    <FontAwesomeIcon icon={faEdit} size="1x" />
                  </button>
                  <button className="trash" onClick={() => handleDelete(celebrity.identi)}>
                    <FontAwesomeIcon icon={faTrashAlt} size="1x" />
                  </button>
                </td>
              </tr>
            ))}
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
        {editingCelebrity && (
          <div className="edit-form">
            <h3>Editar Celebridad</h3>
            <div className="col-md-12">
              <form>
                <div className="mb-3">
                  <label htmlFor="_id" className="form-label">ID</label>
                  <input type="text" value={editingCelebrity.identi} onChange={(e) => setEditingCelebrity({ ...editingCelebrity, identi: e.target.value })}
                    className="form-control"
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Nombre</label>
                  <input type="text" value={editingCelebrity.nombre} onChange={(e) => setEditingCelebrity({ ...editingCelebrity, nombre: e.target.value })}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastname" className="form-label">Apellido</label>
                  <input type="text" value={editingCelebrity.apelli} onChange={(e) => setEditingCelebrity({ ...editingCelebrity, apelli: e.target.value })}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">Categoría</label>
                  <input type="text" value={editingCelebrity.nom_cat} onChange={(e) => setEditingCelebrity({ ...editingCelebrity, nom_cat: e.target.value })}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="city" className="form-label">Ciudad</label>
                  <input type="text" value={editingCelebrity.nom_ciu} onChange={(e) => setEditingCelebrity({ ...editingCelebrity, nom_ciu: e.target.value })}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="biography" className="form-label">Biografía</label>
                  <textarea type="text" value={new DOMParser().parseFromString(editingCelebrity.biograf, 'text/html').body.textContent} onChange={(e) => setEditingCelebrity({ ...editingCelebrity, biograf: e.target.value })}
                    className="form-control"
                  />
                </div>
                {/* <input type="file" onChange={(e) => { const file = e.target.files[0]; if (file) setEditingCelebrity({ ...editingCelebrity, fot_fam: file }) }} />             */}
                <div className="slide d-flex justify-content-end">
                  <button type="button" onClick={handleCancelUpdate} className="btn-cancel-st"> Cancelar </button>
                  <button type="button" onClick={handleSaveUpdate} className="btn-update-st"> Guardar Cambios </button>
                </div>
              </form>
            </div>

          </div>
        )}
      </Modal>
    </div>
  );
};
