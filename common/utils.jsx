/**
 * Constantes de rutas para la aplicación.
 */
export const url = "http://localhost:3000";
export const apiKey = '40782e1025818ed5c01e33ca63b97baf'; // Tu clave de API
// export const apiKey = 'OPENWEATHERMAP_API_KEY'; // Tu clave de API
export const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Fusagasugá&appid=${apiKey}&units=metric`;

/**
 * Realiza una solicitud de inicio de sesión con las credenciales proporcionadas.
 * @param {string} username - El nombre de usuario o correo electrónico del usuario.
 * @param {string} password - La contraseña del usuario.
 * @param {string} selectedRole - El rol seleccionado por el usuario.
 * @returns {Promise<{success: boolean, role?: string, message?: string}>} - Un objeto que indica el éxito de la solicitud.
 */
export const loginRequest = async (username, password, selectedRole) => {
  try {
    const response = await fetch(`${url}/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: username, contraseña: password, rol: selectedRole })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('authToken', data.token);
      return { success: true, role: selectedRole };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.error('Error:', error);
    return { success: false, message: 'Error al realizar la solicitud de inicio de sesión' };
  }
};

/**
 * Realiza una solicitud para obtener la lista de usuarios.
 *
 * @param {string} token - Token de autenticación.
 * @returns {Promise<Array>} - Promise que se resuelve con la lista de usuarios o null si hay un error.
 */
export const fetchUsuarios = async (token) => {
  try {
    const response = await fetch(`${url}/users/listaUsuarios`, {
      method: "GET",
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      console.error("Error al obtener los datos del usuario");
      return null;
    }
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
    return null;
  }
};

/**
 * Realiza una solicitud para obtener los detalles de una noticia relevante.
 *
 * @param {string} id - ID de la noticia relevante.
 * @param {function} setRelevanteDetails - Función para establecer los detalles de la noticia.
 * @param {function} setLoading - Función para cambiar el estado de carga.
 */
export const fetchRelevanteDetails = async (id, setRelevanteDetails, setLoading) => {
  try {
    const response = await fetch(`${url}/news/${id}`);
    if (response.ok) {
      const data = await response.json();
      setRelevanteDetails(data);
    } else { console.error("Error al obtener los detalles del personal.") }
  } catch (error) { console.error("Error al realizar la solicitud:", error) }
  finally { setLoading(false) }
};

/**
 * Realiza una solicitud para obtener los detalles de una noticia relevante.
 *
 * @param {string} id - ID de la noticia relevante.
 * @param {function} setSportsDetails - Función para establecer los detalles de la noticia.
 * @param {function} setLoading - Función para cambiar el estado de carga.
 */
export const fetchSportsDetails = async (id, setSportsDetails, setLoading) => {
  try {
    const response = await fetch(`${url}/sports/${id}`);
    if (response.ok) {
      const data = await response.json();
      setSportsDetails(data);
    } else { console.error("Error al obtener los detalles del personal.") }
  } catch (error) { console.error("Error al realizar la solicitud:", error) }
  finally { setLoading(false) }
};

/**
 * Realiza una solicitud para obtener los detalles de una noticia relevante.
 *
 * @param {string} id - ID de la noticia relevante.
 * @param {function} setStyleDetails - Función para establecer los detalles de la noticia.
 * @param {function} setLoading - Función para cambiar el estado de carga.
 */
export const fetchStyleDetails = async (id, setStyleDetails, setLoading) => {
  try {
    const response = await fetch(`${url}/lifestyle/${id}`);
    if (response.ok) {
      const data = await response.json();
      setStyleDetails(data);
    } else { console.error("Error al obtener los detalles del personal.") }
  } catch (error) { console.error("Error al realizar la solicitud:", error) }
  finally { setLoading(false) }
};

/**
 * Realiza una solicitud para obtener los detalles de una noticia relevante.
 *
 * @param {string} id - ID de la noticia relevante.
 * @param {function} setEntertainmentDetails - Función para establecer los detalles de la noticia.
 * @param {function} setLoading - Función para cambiar el estado de carga.
 */
export const fetchEntertainmentDetails = async (id, setEntertainmentDetails, setLoading) => {
  try {
    const response = await fetch(`${url}/entertainment/${id}`);
    if (response.ok) {
      const data = await response.json();
      setEntertainmentDetails(data);
    } else console.error("Error al obtener los detalles del personal.")
  } catch (error) { console.error("Error al realizar la solicitud:", error) }
  finally { setLoading(false) }
};

/**
 * Realiza una solicitud para obtener datos de entretenimiento desde el servidor.
 *
 * @param {function} setEntertainmentData - Función para establecer los datos de entretenimiento en el estado.
 * @throws {Error} - Lanza un error si la solicitud no es exitosa o si hay un problema al obtener los datos.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando se obtienen y establecen correctamente los datos de entretenimiento.
 */
export const fetchEntertainmentData = async (setEntertainmentData, setError) => {
  try {
    const response = await fetch(`${url}/entertainment/getEntertainment`);
    if (!response.ok) throw new Error("Error al obtener los datos de entretenimiento");
    const data = await response.json();
    setEntertainmentData(data);
  } catch (error) {
    console.error(error)
    setError(error.message);
  }
};

/**
 * Realiza una solicitud para obtener datos de entretenimiento desde el servidor.
 *
 * @param {function} setSliderDetails - Función para establecer los datos de entretenimiento en el estado.
 * @throws {Error} - Lanza un error si la solicitud no es exitosa o si hay un problema al obtener los datos.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando se obtienen y establecen correctamente los datos de entretenimiento.
 */
export const fetchSliderDetails = async (id, setSliderDetails, setLoading) => {
  try {
    const response = await fetch(`${url}/news/${id}`);
    if (response.ok) {
      const data = await response.json();
      setSliderDetails(data);
    } else console.error("Error al obtener los detalles del personal.");
  } catch (error) { console.error("Error al realizar la solicitud:", error) }
  finally { setLoading(false) }
};

/**
 * Función asíncrona para obtener noticias desde el servidor.
 *
 * @param {function} setNoticias - Función para establecer el estado de las noticias.
 * @param {function} setError - Función para establecer el estado de error en caso de fallo.
 *
 * @throws {Error} Lanza un error si la respuesta del servidor no es exitosa o no tiene la estructura esperada.
 *
 * @returns {Promise<void>} Una Promesa que se resuelve una vez que las noticias se han obtenido y establecido correctamente.
 */
export const obtenerNoticias = async (setNoticias, setError) => {
  try {
    const response = await fetch(`${url}/news/getNews`);
    if (!response.ok) throw new Error('Error al obtener las noticias');
    const data = await response.json();
    console.log(data);
    // Verificar si la propiedad 'data' está presente en la respuesta
    if (!data || !data.length) throw new Error('La respuesta del servidor no tiene la estructura esperada.');
    setNoticias(data);
  } catch (error) {
    console.error(error);
    setError(error.message);
  }
};

/**
 * Función asíncrona para obtener noticias desde el servidor.
 *
 * @param {function} setSliderData - Función para establecer el estado de las noticias.
 * @param {function} setError - Función para establecer el estado de error en caso de fallo.
 *
 * @throws {Error} Lanza un error si la respuesta del servidor no es exitosa o no tiene la estructura esperada.
 *
 * @returns {Promise<void>} Una Promesa que se resuelve una vez que las noticias se han obtenido y establecido correctamente.
 */
export const fetchSliderData = async (setSliderData, setError) => {
  try {
    const response = await fetch(`${url}/news/getNews`);
    if (!response.ok) throw new Error('No se pudo obtener el slider');
    const data = await response.json();
    if (data) setSliderData(data);
    else throw new Error('Datos de slider no válidos');
  } catch (err) {
    console.error('Error al obtener datos del slider:', err);
    setError('No se pudo obtener el slider. Consulta la consola para más detalles.');
  }
}

/**
 * Función asíncrona para obtener noticias desde el servidor.
 *
 * @param {function} setSports - Función para establecer el estado de las noticias.
 *
 * @throws {Error} Lanza un error si la respuesta del servidor no es exitosa o no tiene la estructura esperada.
 *
 * @returns {Promise<void>} Una Promesa que se resuelve una vez que las noticias se han obtenido y establecido correctamente.
 */
export const getSportsData = async (setSports, setError) => {
  try {
    const response = await fetch(`${url}/sports/getSports`);
    if (!response.ok) throw new Error("No se pudo obtener la lista de deportes");
    const sportsData = await response.json();
    setSports(sportsData);
  } catch (error) {
    console.error(error);
    setError('No se pudo obtener la noticia. Consulta la consola para más detalles.');
  }
};

/**
 * Realiza una solicitud para obtener datos del servidor sobre celebridades.
 * @param {Function} setStaffData - La función para establecer los datos del personal obtenidos.
 * @param {Function} setLoading - La función para establecer el estado de carga durante la solicitud.
 * @returns {Promise<void>} - Una promesa que se resuelve después de procesar la solicitud y actualizar los datos.
 */
export const fetchStaffData = async (setStaffData, setLoading) => {
  try {
    const response = await fetch(`${url}/celebrities/consulta`);
    if (response.ok) {
      const data = await response.json();
      setStaffData(data);
    } else console.error("Error al obtener los datos del servidor.");
  } catch (error) { console.error("Error al realizar la solicitud:", error) }
  finally { setLoading(false) }
}

/**
 * Realiza una solicitud para obtener los detalles de un miembro del personal.
 *
 * @param {string} id - El identificador único del miembro del personal.
 * @param {function} setStaffDetails - Función para actualizar el estado con los detalles del personal.
 * @param {function} setLoading - Función para actualizar el estado de carga.
 * @returns {void}
 * @throws {Error} Si hay un error al realizar la solicitud o al obtener los detalles del personal.
 */
export const fetchStaffDetails = async (id, setStaffDetails, setLoading) => {
  try {
    const response = await fetch(`${url}/celebrities/${id}`);
    if (response.ok) {
      const data = await response.json();
      setStaffDetails(data);
    } else console.error("Error al obtener los detalles del personal.");
  } catch (error) { console.error("Error al realizar la solicitud:", error) }
  finally { setLoading(false) }
};

/**
 * Obtiene los datos de estilo de vida mediante una solicitud asincrónica a la API.
 * @param {function} setLifestyleData - Función que actualiza el estado con los datos de estilo de vida obtenidos.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando se han obtenido y actualizado los datos correctamente, o se rechaza si hay un error.
 */
export const getLifestyleData = async (setLifestyleData) => {
  try {
    const response = await fetch(`${url}/lifestyle/getLifeStyle`);
    const data = await response.json();
    setLifestyleData(data);
  } catch (error) {
    console.error('Error al obtener datos de estilo de vida:', error);
  }
};

/**
 * Realiza una solicitud para obtener datos del logo desde la URL proporcionada.
 *
 * @param {Function} setImageData - Función que se utilizará para establecer los datos de la imagen del logo en el componente.
 * @param {Function} setError - Función que se utilizará para establecer un mensaje de error en caso de fallo en la solicitud.
 * @returns {Promise<void>} - Una promesa que se resuelve una vez que se han procesado los datos del logo o se ha gestionado el error.
 * @throws {Error} - Se lanza un error si la solicitud para obtener el logo no tiene éxito.
 */
export const fetchLogoData = async (setImageData, setError) => {
  try {
    const response = await fetch(`${url}/logo/getLogo`);
    if (!response.ok) { throw new Error('No se pudo obtener el slider'); }
    const data = await response.json();
    setImageData(data.data);
  } catch (err) { setError(err.message); }
}

/**
 * Inicia un intervalo que actualiza continuamente la fecha y hora actual y llama a la función
 * proporcionada para actualizar el estado con la nueva fecha y hora.
 *
 * @param {function} setCurrentDateTime - Función para actualizar el estado con la fecha y hora actual.
 * @returns {function} - Función de limpieza que detiene el intervalo al desmontar el componente.
 */
export const startDateTimeInterval = (setCurrentDateTime) => {
  const intervalId = setInterval(() => { setCurrentDateTime(new Date()) }, 1000);
  return () => clearInterval(intervalId); // Limpieza del intervalo al desmontar el componente
};

/**
 * Formatea la fecha y hora proporcionada según las opciones especificadas.
 *
 * @param {Date} date - Objeto de tipo Date que representa la fecha y hora a formatear.
 * @returns {string} - Cadena de texto que representa la fecha y hora formateada según las opciones.
 */
// utils.jsx

export const formatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: 'numeric', 
    minute: 'numeric', 
    second: 'numeric',
    timeZone: 'UTC' // Cambia según la zona horaria deseada
  };
  return date.toLocaleString('es-CO', options);
};

/**
 * Divide un array en bloques más pequeños de un tamaño específico.
 *
 * @param {Array} array - El array que se va a dividir.
 * @param {number} size - El tamaño de cada bloque.
 * @returns {Array} - Un nuevo array que contiene bloques del array original.
 *
 * @example
 * const arrayOriginal = [1, 2, 3, 4, 5, 6, 7, 8];
 * const tamañoDelBloque = 3;
 * const resultado = chunk(arrayOriginal, tamañoDelBloque);
 * // resultado: [[1, 2, 3], [4, 5, 6], [7, 8]]
 *
 * @throws {TypeError} - Si el primer argumento no es un array o el segundo argumento no es un número positivo.
 */
export const chunk = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) { result.push(array.slice(i, i + size)) }
  return result;
};

/**
 * Configuración del slider para el personal.
 * @typedef {Object} SettingsStaff
 * @property {boolean} dots - Indica si se deben mostrar puntos de navegación en el slider.
 * @property {boolean} infinite - Indica si el slider debe ser infinito (bucle) o no.
 * @property {number} speed - Velocidad de transición en milisegundos entre diapositivas.
 * @property {number} slidesToShow - Número de diapositivas que se mostrarán a la vez.
 * @property {number} slidesToScroll - Número de diapositivas que se desplazarán en cada transición.
 * @property {number} initialSlide - Índice de la diapositiva inicial al cargar el slider.
 * @property {string} centerPadding - Espaciado adicional en los lados de las diapositivas centrales.
 * @property {Object[]} responsive - Configuración responsive para diferentes tamaños de pantalla.
 * @property {number} responsive[].breakpoint - Punto de quiebre en el que se aplicarán las configuraciones.
 * @property {Object} responsive[].settings - Configuración específica para el punto de quiebre.
 * @property {number} responsive[].settings.slidesToShow - Número de diapositivas a mostrar en este punto de quiebre.
 * @property {number} responsive[].settings.slidesToScroll - Número de diapositivas a desplazar en cada transición en este punto de quiebre.
 * @property {boolean} responsive[].settings.infinite - Indica si el slider debe ser infinito en este punto de quiebre.
 * @property {boolean} responsive[].settings.dots - Indica si se deben mostrar puntos de navegación en este punto de quiebre.
 */

/**
 * Configuración predeterminada para el slider del personal.
 * @type {SettingsStaff}
 * @constant
 */
export const settingsStaff = {
  dots: true, infinite: false, speed: 500, slidesToShow: 6,
  slidesToScroll: 4, initialSlide: 0, centerPadding: '50px',
  responsive: [{ breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3, infinite: true, dots: true } },
  { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2 } },
  { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } }
  ]
};

// Definición de los elementos del menú lateral
export const sidebarItems = [
  // Elementos para usuarios comunes
  { role: "Noticias", link: "/dashboard/relevante-dash", text: "Lo + relevante" },
  { role: "Entretenimiento", link: "/dashboard/entertainment", text: "Entretenimiento" },
  { role: "Entretenimiento", link: "/dashboard/usuarios", text: "Top 10" },
  { role: "Deportes", link: "/dashboard/sports", text: "Deportes" },
  { role: "Estilo", link: "/dashboard/lifestyle", text: "Estilo de Vida" },
  // Elementos adicionales para usuarios con rol de administrador
  { role: "Administrador", link: "/dashboard/users", text: "Usuarios" },
  { role: "Administrador", link: "/dashboard/resumen", text: "Slider" },
  { role: "Administrador", link: "/dashboard/staff", text: "Staff" },
];


// Estado inicial para una nueva noticia
export const initialState = {
  title: "", // Título de la noticia
  subtitle: "", // Subtítulo de la noticia
  description: "", // Descripción de la noticia
  fotoFileNewsPath: null // Ruta del archivo de imagen de la noticia (inicialmente nula)
};

/**
 * Maneja el cambio en los elementos de entrada del formulario.
 * Actualiza el estado del formulario con el nuevo valor introducido.
 *
 * @param {Object} e - Evento de cambio que desencadenó la función.
 * @param {Object} formData - Estado actual del formulario.
 * @param {Function} setFormData - Función para actualizar el estado del formulario.
 */
export const handleInputChange = (e, formData, setFormData) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};

/**
 * Maneja el cambio de archivo seleccionado en un input de tipo file.
 * @param {Event} e - El evento de cambio generado por el input de tipo file.
 * @param {Object} formData - El objeto formData actual.
 * @param {Function} setFormData - La función para actualizar el objeto formData.
 * */
export const handleFileChange = (e, formData, setFormData) => {
  const file = e.target.files[0];
  setFormData({ ...formData, fotoFileNewsPath: file });
};

/**
 * Función para manejar el envío de datos del formulario para crear una nueva noticia.
 * @param {Event} e - El evento del formulario.
 * @param {Object} formData - Los datos del formulario.
 * @param {Function} setFormData - Función para actualizar los datos del formulario.
 */
export const handleSubmit = async (e, formData, setFormData, setError, setSuccess) => {
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
    const response = await fetch(`${url}/news/createNews`, { method: "POST", body: formDataToSend });
    const data = await response.json();
    if (response.ok) { setSuccess('Noticia de Entretenimiento creada con éxito.'); setError(null); } 
    else {
      console.error(data.error || "Error al agregar contenido");
    }
  } catch (error) {
    console.error("Error al agregar contenido:", error); setError("Error al agregar contenido");
  }
};

/**
 * Función asincrónica para obtener datos del clima y actualizar el estado del componente.
 * @param {Function} setWeatherData - Función para actualizar los datos del clima en el estado del componente.
 */
export const fetchWeatherData = async (setWeatherData) => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Error al obtener los datos del clima');
    }
    const data = await response.json();
    setWeatherData(data);
  } catch (error) {
    console.error('Error al obtener datos del clima:', error);
  }
};

/**
 * Función para obtener el Top 10 de canciones más sonadas desde el servidor.
 * @param {Function} setTop10 - Función para actualizar el estado del Top 10.
 */
export const fetchTop10 = async (setTop10) => {
  try {
    const response = await fetch(`${url}/ranking/ranking`); // Realizar la solicitud HTTP al endpoint
    if (!response.ok) {
      throw new Error('Error al obtener el Top 10 de canciones'); // Manejar errores de la solicitud
    }
    const data = await response.json(); // Convertir la respuesta a formato JSON
    setTop10(data); // Establecer los datos del Top 10 en el estado
  } catch (error) {
    console.error(error); // Imprimir el error en la consola en caso de falla
  }
};

export const Message = ({ type, children }) => {
  const className = type === 'error' ? 'error-message' : 'success-message';
  return <p className={className}>{children}</p>;
};