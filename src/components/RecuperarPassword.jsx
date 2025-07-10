import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';

const RecuperarPassword = () => {
  const [username, setUsername] = useState('');
  const [nuevaPassword, setNuevaPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [exito, setExito] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = { username, nuevaPassword };
      await axios.post('http://localhost:8898/medlab/recuperar', payload);
      setMensaje('✅ Contraseña actualizada correctamente.');
      setExito(true);

      // Esperar 3 segundos antes de redirigir al login
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      if (error.response?.status === 404) {
        setMensaje("❌ Usuario no encontrado.");
      } else {
        setMensaje("❌ Error al restablecer la contraseña.");
      }
      setExito(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Recuperar Contraseña</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Nombre de Usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Ingrese su usuario"
              disabled={exito}
            />
          </div>
          <div className="input-group">
            <label>Nueva Contraseña</label>
            <input
              type="password"
              value={nuevaPassword}
              onChange={(e) => setNuevaPassword(e.target.value)}
              required
              placeholder="Ingrese nueva contraseña"
              disabled={exito}
            />
          </div>
          <button type="submit" className="login-button" disabled={exito}>
            {exito ? 'Redirigiendo...' : 'Actualizar Contraseña'}
          </button>
        </form>
        {mensaje && <p className="login-subtitle">{mensaje}</p>}
      </div>
    </div>
  );
};

export default RecuperarPassword;
