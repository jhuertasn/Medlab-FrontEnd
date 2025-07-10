import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axiosInstance'; // ✅ Importar axios con JWT
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css'; // Asegúrate de importar el archivo CSS

const Medicos = () => {
  const [medicos, setMedicos] = useState([]);
  const navigate = useNavigate();

const fetchMedicos = async () => {
    try {
      const res = await axiosInstance.get('/medico/custom'); // ✅ JWT incluido
      setMedicos(res.data);
    } catch (error) {
      console.error('Error cargando médicos:', error);
    }
  };

  const eliminarMedico = async (id) => {
    if (!window.confirm('¿Está seguro que desea eliminar este médico?')) return;
    try {
      await axiosInstance.delete(`/medico/${id}`); // ✅ JWT incluido
      alert('Médico eliminado correctamente');
      setMedicos(prev => prev.filter(m => m.codigo !== id));
    } catch (error) {
      console.error('Error al eliminar médico:', error);
      alert('No se pudo eliminar el médico');
    }
  };

  useEffect(() => {
    fetchMedicos();
  }, []);
  
  return (
    <div className="medicos-container">
      <h2 className="medicos-title">Lista de Médicos</h2>
      <button
        onClick={() => navigate('/medico/nuevo')}
        className="medicos-button"
      >
        + Nuevo Médico
      </button>

      <table className="medicos-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>DNI</th>
            <th>CMP</th>
            <th>Especialidad</th>
            <th>Distrito</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {medicos.map(m => (
            <tr key={m.codigo}>
              <td>{m.nombre}</td>
              <td>{m.apellidoPaterno} {m.apellidoMaterno}</td>
              <td>{m.dni}</td>
              <td>{m.cmp}</td>
              <td>{m.especialidad?.nombre}</td>
              <td>{m.distrito?.nombre}</td>
              <td>{m.correo}</td>
              <td>
                <button 
                  onClick={() => navigate(`/medico/editar/${m.codigo}`)} 
                  className="medicos-action-button medicos-edit-button"
                >
                  Editar
                </button>
                <button 
                  onClick={() => eliminarMedico(m.codigo)} 
                  className="medicos-action-button medicos-delete-button"
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

export default Medicos;
