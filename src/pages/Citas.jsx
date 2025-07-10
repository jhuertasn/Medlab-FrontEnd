import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axiosInstance';
import { useNavigate } from 'react-router-dom';

const Citas = () => {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const deshabilitarCita = async (codigo) => {
    if (!window.confirm('¿Deseas eliminar esta cita?')) return;

    try {
      await axiosInstance.delete(`/citas/${codigo}`);
      alert('Cita eliminada correctamente');
      setCitas(prev => prev.filter(c => c.codigo !== codigo));
    } catch (error) {
      console.error('Error al cancelar cita:', error);
      alert('No se pudo cancelar la cita');
    }
  };

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const token = btoa(`${localStorage.getItem('usuario')}:${localStorage.getItem('contraseña')}`);
        const response = await axiosInstance.get('/citas/custom');
        setCitas(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error al cargar las citas:', err);
        setError('Error al cargar las citas');
        setLoading(false);
      }
    };

    fetchCitas();
  }, []);

  if (loading) return <p>Cargando citas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="citas-container">
      <h2 className="citas-title">Lista de Citas Médicas</h2>

      <button
        onClick={() => navigate('/citas/nueva')}
        className="nueva-cita-button"
      >
        + Nueva Cita
      </button>

      <table className="citas-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Paciente</th>
            <th>Médico</th>
            <th>Precio</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(citas) ? (
            citas.map((cita) => (
              <tr key={cita.codigo}>
                <td>{cita.fecha}</td>
                <td>{cita.hora}</td>
                <td>{cita.paciente?.nombre} {cita.paciente?.apellidoPaterno}</td>
                <td>{cita.medico?.nombre} {cita.medico?.apellidoPaterno}</td>
                <td>{cita.servicioMedico?.precio?.toFixed(2)}</td>
                <td>{cita.estadoCita?.nombre}</td>
                <td>
                  <button
                    onClick={() => navigate(`/citas/editar/${cita.codigo}`)}
                    className="edit-button"
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => deshabilitarCita(cita.codigo)} 
                    className="delete-button" 
                    style={{ marginLeft: '10px' }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No se pudieron cargar las citas (respuesta inválida)</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Citas;
