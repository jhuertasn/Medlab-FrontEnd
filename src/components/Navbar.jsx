import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/styles.css'; // Asegúrate de que la ruta sea correcta

const Navbar = () => {
  const rol = localStorage.getItem('rol'); // 'ADMIN' o 'USER'
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/dashboard" className="navbar-link">Dashboard</Link>
        <Link to="/citas" className="navbar-link">Citas</Link>
        <Link to="/pacientes" className="navbar-link">Pacientes</Link>
        {rol === 'ADMIN' && (
          <>
        <Link to="/empleados" className="navbar-link">Empleados</Link>
        <Link to="/medicos" className="navbar-link">Medicos</Link>
        </>
         )}
      </div>
      <button onClick={cerrarSesion} className='navbar-button' style={{ marginLeft: '1rem' }}>
        Cerrar sesión
      </button>
    </nav>
  );
};

export default Navbar;
