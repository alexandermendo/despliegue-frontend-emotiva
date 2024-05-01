import { useState } from 'react';
import { useNavigate } from "react-router";
import { NavbarAccount } from '../navbar/admin/account/NavbarAccount';
import { url } from '../../../../../../../../common/utils';
import './formAccount.css';

export const FormAccount = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [pais, setPais] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [rol, setRol] = useState('');
  const [nombreError, setNombreError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [paisError, setPaisError] = useState('');
  const [departamentoError, setDepartamentoError] = useState('');
  const [ciudadError, setCiudadError] = useState('');
  const [contraseñaError, setContraseñaError] = useState('');
  const [rolError, setRolError] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [formSubmitted] = useState(false); 
  const [setError] = useState(''); 
  let [hasErrors] = useState(false);
  let navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setNombre(event.target.value);
    if (event.target.value) setNombreError(''); 
  };

  const handleEmailChange = (event) => {
    const enteredEmail = event.target.value;
    setEmail(enteredEmail);
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(enteredEmail)) setEmailError('Campo o correo inválido');  
    else setEmailError(''); 
  };

  const handleCountryChange = (event) => {
    setPais(event.target.value);
    if (event.target.value) setPaisError('');
  };

  const handlePasswordChange = (event) => {
    setContraseña(event.target.value);
    if (event.target.value) setContraseñaError('');
  };

  const handleCityChange = (event) => {
    setCiudad(event.target.value);
    if (event.target.value) setCiudadError('');
  };

  const handleDepartmentChange = (event) => {
    setDepartamento(event.target.value);
    if (event.target.value) setDepartamentoError('');
  };

  const handleRoleChange = (event) => {
    setRol(event.target.value);
    if (event.target.value) setRolError('');
  };

  // Función para manejar el envío del formulario
  const addUser = async (e) => {
    e.preventDefault();
    if (!isChecked) { alert('Debe aceptar términos y condiciones');  hasErrors = true} else setError('');
    if (!nombre) { setNombreError('Por favor, ingresa tu nombre.');  hasErrors = true}
    if (!contraseña) { setContraseñaError('Por favor, ingresa tu contraseña.'); hasErrors = true }
    if (!email) { setEmailError('Por favor, ingresa tu email.'); hasErrors = true }
    if (!pais) { setPaisError('Por favor, ingresa tu país.'); hasErrors = true }
    if (!departamento) { setDepartamentoError('Por favor, ingresa tu departamento.'); hasErrors = true }
    if (!ciudad) { setCiudadError('Por favor, ingresa tu ciudad.'); hasErrors = true }
    if (!rol) { setRolError('Por favor, ingresa tu rol.'); hasErrors = true }
    if (hasErrors) return

    const userData = { nombre, email, país: pais, departamento, ciudad, contraseña, rol: 'usuario' };     // Crear un objeto con los datos del formulario

    try {  // Realizar la solicitud POST a la API
      const response = await fetch(`${url}/users/agregarUsuario`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(userData)});
      const responseData = await response.json();
      if (response.status === 201) { localStorage.setItem('token', responseData.token); navigate('/')} 
      else if (response.status === 400) alert(responseData.message);
      else console.error('Error interno del servidor');
    } catch (error) { console.error('Error al enviar la solicitud:', error) }
  };

  return (
    <>
      <div>
        <NavbarAccount />
        <div className="account-container">
          <div className="account-form">
            <h1>Crea tu cuenta EMOTIVA</h1>
            <hr />

            <div className='row'>
              <div className='col-md-6'>
                <div className="form-group">
                  <input type="text" id="name" value={nombre} onChange={handleUsernameChange} className="form-control" placeholder='Nombre completo'/>
                  {nombreError && <p className="error-message">{nombreError}</p>}
                </div>
              </div>

              <div className='col-md-6'>
                <div className="form-group">
                  <input type="email" id="email" value={email} onChange={handleEmailChange} className="form-control" placeholder='Email' />
                  {emailError && <p className="error-message">{emailError}</p>}
                </div>
              </div>
            </div>

            <div className='row'>
              <div className='col-md-6'>
                <div className="form-group">
                  <input type="text" id="pais" value={pais} onChange={handleCountryChange} className="form-control" placeholder='País'/>
                  {paisError && <p className="error-message">{paisError}</p>}
                </div>
              </div>

              <div className='col-md-6'>
                <div className="form-group">
                  <input type="text" id="estado" value={departamento} onChange={handleDepartmentChange} className="form-control" placeholder='Departamento/Estado'/>
                  {departamentoError && <p className="error-message">{departamentoError}</p>}
                </div>
              </div>
            </div>

            <div className='row'>
              <div className='col-md-6'>
                <div className="form-group">
                  <input type="text" id="ciudad" value={ciudad} onChange={handleCityChange} className="form-control"  placeholder='Ciudad'/>
                  {ciudadError && <p className="error-message">{ciudadError}</p>}
                </div>
              </div>

              <div className='col-md-6'>
                <div className="form-group">
                  <input type="password" id="password" value={contraseña}onChange={handlePasswordChange} className="form-control"
                    placeholder='Password'/>
                  {contraseñaError && <p className="error-message">{contraseñaError}</p>}
                </div>
              </div>
            </div>

            <div className='row'>
              <div className='col-md-6'>
                <div className="form-group">
                  <input type="text" id="rol" value={rol} onChange={handleRoleChange} className="form-control" placeholder='Rol'/>
                  {rolError && <p className="error-message">{rolError}</p>}
                </div>
              </div>
            </div>

            <label>
              <input type="checkbox" id="cbox1" value="first_checkbox" onChange={(e) => setIsChecked(e.target.checked)} />
              Al proceder, aceptas nuestros Términos y Condiciones. Tu conformidad es esencial para usar nuestros servicios.
            </label>
            {formSubmitted && !isChecked && ( <div className="error-message">Debe aceptar términos y condiciones</div>)}
            <div className="form-group">
              <button type="submit" className="btn-login" onClick={addUser}> Continuar </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}