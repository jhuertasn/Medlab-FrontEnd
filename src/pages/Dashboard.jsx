import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css'; // Asegúrate de que la ruta sea correcta
import axiosInstance from '../services/axiosInstance';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const Dashboard = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username'); // no 'usuario'

  const [datos, setDatos] = useState({
    totalPacientes: 0,
    totalMedicos: 0,
    totalCitasHoy: 0,
    ultimaCita: null
  });

  const [datosGrafico, setDatosGrafico] = useState([]);

  useEffect(() => {
    const fetchDatosDashboard = async () => {
      try {
        const [resPac, resMed, resCitasHoy, resUltCita] = await Promise.all([
          axiosInstance.get('/dashboard/total-pacientes'),
          axiosInstance.get('/dashboard/total-medicos'),
          axiosInstance.get('/dashboard/total-citas-hoy'),
          axiosInstance.get('/dashboard/ultima-cita')
        ]);

        setDatos({
          totalPacientes: resPac.data,
          totalMedicos: resMed.data,
          totalCitasHoy: resCitasHoy.data,
          ultimaCita: resUltCita.data
        });
      } catch (error) {
        console.error('Error al cargar datos del dashboard: ', error);
      }
    };

    fetchDatosDashboard();
  }, []);

  useEffect(() => {
    axiosInstance.get('/dashboard/citas-por-dia')
      .then(res => setDatosGrafico(res.data))
      .catch(err => console.error('Error al cargar gráfico:', err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('usuario'); // 🔐 Elimina usuario logueado
    navigate('/'); // 🔁 Redirige al login
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Bienvenido a MedLab</h1>
      <p className="dashboard-subtitle">Usuario autenticado: <strong>{username}</strong></p>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Total de Pacientes</h3>
          <p>{datos.totalPacientes}</p>
        </div>
        <div className="dashboard-card">
          <h3>Total de Médicos</h3>
          <p>{datos.totalMedicos}</p>
        </div>
        <div className="dashboard-card">
          <h3>Citas para Hoy</h3>
          <p>{datos.totalCitasHoy}</p>
        </div>
        <div className="dashboard-card">
          <h3>Última Cita</h3>
          {datos.ultimaCita ? (
            <p>
              {datos.ultimaCita.pacienteNombre} con {datos.ultimaCita.medicoNombre}<br />
              Fecha: {datos.ultimaCita.fecha} a las {datos.ultimaCita.hora}
            </p>
          ) : (
            <p>No hay citas registradas.</p>
          )}
        </div>
      </div>

      <div className="dashboard-chart">
        <h3>Citas por Día</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={datosGrafico}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="fecha" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="cantidad" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="dashboard-section">
        <h2>Misión</h2>
        <p>Brindar servicios de salud confiables, eficientes y personalizados, enfocados en el bienestar integral de nuestros pacientes.</p>

        <h2>Visión</h2>
        <p>Ser el laboratorio clínico líder en innovación, calidad y atención médica en el país.</p>
      </div>

      {/* Botones de navegación y cierre de sesión */}
      <div className="dashboard-buttons">
        <button
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
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
