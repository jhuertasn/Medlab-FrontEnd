import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Pacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const navigate = useNavigate();

  const token = btoa(`${localStorage.getItem('usuario')}:${localStorage.getItem('contraseña')}`);

  const cargarPacientes = async () => {
    try {
      const response = await axios.get('http://localhost:8898/medlab/paciente/custom', {
        headers: {
          Authorization: `Basic ${token}`
        }
      });
      setPacientes(response.data);
    } catch (error) {
      console.error('Error cargando pacientes', error);
    }
  };

  const eliminarPaciente = async (id) => {
    if (!window.confirm('¿Eliminar paciente?')) return;
    try {
      await axios.delete(`http://localhost:8898/medlab/paciente/${id}`, {
        headers: {
          Authorization: `Basic ${token}`
        }
      });
      alert('Paciente eliminado');
      cargarPacientes();
    } catch (error) {
      console.error('Error al eliminar', error);
    }
  };

  useEffect(() => {
    cargarPacientes();
  }, []);

  return (
    <div className="pacientes-container">
      <h2 className="pacientes-title">Gestión de Pacientes</h2>
      <button 
        onClick={() => navigate('/paciente/nuevo')} 
        className="nuevo-paciente-button"
      >
        + Nuevo Paciente
      </button>
      <table className="pacientes-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>DNI</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map(p => (
            <tr key={p.codigo}>
              <td>{p.nombre}</td>
              <td>{p.apellidoPaterno}</td>
              <td>{p.dni}</td>
              <td>{p.correo}</td>
              <td>
                <button 
                  onClick={() => navigate(`/pacientes/editar/${p.codigo}`)} 
                  className="edit-button"
                >
                  Editar
                </button>
                <button 
                  onClick={() => eliminarPaciente(p.codigo)} 
                  className="delete-button" 
                  style={{ marginLeft: '10px' }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Pacientes;
