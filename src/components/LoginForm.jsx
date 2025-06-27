import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css'; // Asegúrate de que la ruta sea correcta

function LoginForm() {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [autenticado, setAutenticado] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const auth = {
      username: usuario,
      password: contraseña
    };

    try {

    const response = await axios.get('http://localhost:8898/medlab/empleado/perfil', {
      auth
    });  

    const perfil = response.data; // ✅ Aquí declaras perfil recién
    console.log('Empleado:', perfil);

    localStorage.setItem('usuario', usuario);
    localStorage.setItem('contraseña', contraseña);
    localStorage.setItem('rol', perfil.rol.nombre); // Guarda el rol

    setAutenticado(true);
    navigate('/dashboard');

  } catch (error) {
  console.error('Error de autenticación:', error);
  if (error.response) {
    console.error('Error de backend:', error.response.data);
  } else if (error.request) {
    console.error('No se recibió respuesta del backend:', error.request);
  } else {
    console.error('Error al configurar la solicitud:', error.message);
  }
}
  };

  // Redirige si ya está autenticado
  if (autenticado) {
    return null; // evita renderizar el login (opcional si ya hiciste navigate)
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="medical-icon">⚕️</div> {/* Icono médico opcional */}
        <h2 className="login-title">Acceso a MedLab</h2>
        <p className="login-subtitle">Sistema de gestión médica</p>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="usuario">Usuario</label>
            <input
              type="text"
              id="usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Usuario"
            />
          </div>
          <div className="input-group">
            <label htmlFor="contraseña">Contraseña</label>
            <input
              type="password"
              id="contraseña"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              placeholder="Contraseña"
            />
          </div>
          <button type="submit" className="login-button">Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
