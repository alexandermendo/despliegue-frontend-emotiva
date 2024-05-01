import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { url } from '../../../../../../common/utils';
import './users.css';

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [userEditing, setUserEditing] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/users/listaUsuarios`);
        if (!response.ok) throw new Error('Error al obtener los datos');
        const data = await response.json();
        console.log(data); // Verifica los datos en la consola
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          throw new Error('Los datos no son un array');
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);


  const handleUpdate = (u) => {
    setUserEditing(u);
    setIsEditModalOpen(true);
  };

  const handleCancelUpdate = () => {
    setUserEditing(null);
    setIsEditModalOpen(false);
  };

  const handleSaveUpdate = async () => {
    try {
      const response = await fetch(`${url}/users/actualizarUsuario/${userEditing._id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ nombre: userEditing.nombre,  email: userEditing.email,
          país: userEditing.país, departamento: userEditing.departamento,
          ciudad: userEditing.ciudad, contraseña: userEditing.contraseña,
          rol: userEditing.rol,
        }),
      });
      if (!response.ok) throw new Error('Error al actualizar el usuario');
      const updatedUsers = users.map((user) => user._id === userEditing._id ? userEditing : user );
      setUsers(updatedUsers);
      setIsEditModalOpen(false);
      setUserEditing(null);
    } catch (error) { console.error(error.message)}
  };

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`${url}/users/eliminarUsuario/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el usuario');
      }

      // Actualizar la lista de usuarios después de eliminar
      const updatedUsers = users.filter((user) => user._id !== userId);
      setUsers(updatedUsers);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className='st-tab-sli'>
      <h2>Administrador de Usuarios</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>País</th>
              <th>Departamento</th>
              <th>Ciudad</th>
              <th>Contraseña</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.nombre}</td>
                <td>{user.email}</td>
                <td>{user.país}</td>
                <td>{user.departamento}</td>
                <td>{user.ciudad}</td>
                <td>{user.contraseña}</td>
                <td>{user.rol}</td>
                <td>
                  <button className="edit" onClick={() => handleUpdate(user)}>
                    <FontAwesomeIcon icon={faEdit} size="1x" />
                  </button>
                  <button className="trash" onClick={() => handleDelete(user._id)}>
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
        contentLabel="Editar Usuario"
        className="custom-modal"
        overlayClassName="custom-overlay"
      >
        {userEditing && (
          <div className='form-slider'>
            <h3>Editar Usuario</h3>
            <div className="col-md-12">
              <form>
                <div className="mb-3">
                  <label htmlFor="_id" className="form-label">ID</label>
                  <input
                    type="text"
                    id="_id"
                    value={userEditing._id}
                    onChange={(e) =>
                      setUserEditing({ ...userEditing, _id: e.target.value })
                    }
                    className="form-control"
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Nombre</label>
                  <input
                    type="text"
                    id="title"
                    value={userEditing.nombre}
                    onChange={(e) =>
                      setUserEditing({ ...userEditing, nombre: e.target.value })
                    }
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="subtitle" className="form-label">Email</label>
                  <input
                    type="text"
                    id="subtitle"
                    value={userEditing.email}
                    onChange={(e) =>
                      setUserEditing({ ...userEditing, email: e.target.value })
                    }
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">País</label>
                  <input
                    type="text"
                    id="description"
                    value={userEditing.país}
                    onChange={(e) =>
                      setUserEditing({
                        ...userEditing,
                        país: e.target.value,
                      })
                    }
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Departamento</label>
                  <input
                    type="text"
                    id="description"
                    value={userEditing.departamento}
                    onChange={(e) =>
                      setUserEditing({
                        ...userEditing,
                        departamento: e.target.value,
                      })
                    }
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Ciudad</label>
                  <input
                    type="text"
                    id="description"
                    value={userEditing.ciudad}
                    onChange={(e) =>
                      setUserEditing({
                        ...userEditing,
                        ciudad: e.target.value,
                      })
                    }
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Contraseña</label>
                  <input
                    type="text"
                    id="description"
                    value={userEditing.contraseña}
                    onChange={(e) =>
                      setUserEditing({
                        ...userEditing,
                        contraseña: e.target.value,
                      })
                    }
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Rol</label>
                  <input
                    type="text"
                    id="description"
                    value={userEditing.rol}
                    onChange={(e) =>
                      setUserEditing({
                        ...userEditing,
                        rol: e.target.value,
                      })
                    }
                    className="form-control"
                  />
                </div>

                <div className="slide d-flex justify-content-end">
                  <button type="button" onClick={handleCancelUpdate} className="btn-cancel-sli">
                    Cancelar
                  </button>
                  <button type="button" onClick={handleSaveUpdate} className="btn-update-sli">
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
