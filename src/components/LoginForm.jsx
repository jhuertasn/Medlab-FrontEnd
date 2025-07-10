import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';
import { jwtDecode } from 'jwt-decode';

function LoginForm() {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [errores, setErrores] = useState({});
  const [autenticado, setAutenticado] = useState(false);
  const navigate = useNavigate();

  const validarCampos = () => {
    const nuevosErrores = {};
    if (!usuario.trim()) nuevosErrores.usuario = 'El usuario es obligatorio.';
    if (!contraseña.trim()) nuevosErrores.contraseña = 'La contraseña es obligatoria.';
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validarCampos()) return;

    const auth = {
      username: usuario,
      password: contraseña,
    };

    try {
      const response = await axios.post('http://localhost:8898/medlab/authenticate', auth);
      const { token } = response.data;

      const decoded = jwtDecode(token);
      const username = decoded.sub;
      const roles = decoded.ROLE || decoded.roles || [];
      const rol = Array.isArray(roles)
        ? roles[0].replace('ROLE_', '').toUpperCase()
        : roles.replace('ROLE_', '').toUpperCase();

      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      localStorage.setItem('rol', rol);

      setAutenticado(true);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error de autenticación:', error);
      alert('Credenciales incorrectas');
    }
  };

  if (autenticado) {
    return null;
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="medical-icon">⚕️</div>
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
              className={errores.usuario ? 'input-error' : ''}
            />
            {errores.usuario && <span className="error-message">{errores.usuario}</span>}
          </div>
          <div className="input-group">
            <label htmlFor="contraseña">Contraseña</label>
            <input
              type="password"
              id="contraseña"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              placeholder="Contraseña"
              className={errores.contraseña ? 'input-error' : ''}
            />
            {errores.contraseña && <span className="error-message">{errores.contraseña}</span>}
          </div>
          <p style={{ marginTop: '1rem' }}>
  <a href="/recuperar">¿Olvidaste tu contraseña?</a>
</p>
          <button type="submit" className="login-button">Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
