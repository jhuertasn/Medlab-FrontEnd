import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css'; // Asegúrate de que la ruta sea correcta

const Dashboard = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username'); // no 'usuario'


  const handleLogout = () => {
    localStorage.removeItem('usuario'); // 🔐 Elimina usuario logueado
    navigate('/'); // 🔁 Redirige al login
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Bienvenido a MedLab</h1>
      <p className="dashboard-subtitle">Usuario autenticado: <strong>{username}</strong></p>

      {/*<button
        onClick={() => navigate('/citas')}
        className="dashboard-button dashboard-button-primary"
      >
        Ver Citas Médicas
      </button>

      <button
        onClick={handleLogout}
        className="dashboard-button dashboard-button-danger"
      >
        Cerrar sesión
      </button>*/}
    </div>
  );
};

export default Dashboard;
