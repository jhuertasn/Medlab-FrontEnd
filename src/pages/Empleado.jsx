import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css'; // Asegúrate de importar el archivo CSS
import axiosInstance from '../services/axiosInstance';

const Empleado = () => {
  const [empleados, setEmpleados] = useState([]);
  const navigate = useNavigate();

  const auth = {
    username: localStorage.getItem('usuario'),
    password: localStorage.getItem('contraseña')
  };

const cargarEmpleados = async () => {
  try {
    const response = await axiosInstance.get('/empleado/custom');
    setEmpleados(response.data);
  } catch (error) {
    console.error('Error al cargar empleados:', error);
  }
};

  const eliminarEmpleado = async (id) => {
    if (!window.confirm('¿Deseas eliminar este empleado?')) return;
    try {
      console.log("Eliminando empleado con ID:", id);
      await axiosInstance.delete(`/empleado/${id}`);
      alert("Empleado eliminado");
      cargarEmpleados(); // asegúrate de que solo carga los activos
    } catch (error) {
      console.error('Error al eliminar empleado:', error);
      alert("Error al eliminar empleado");
    }
  };

  useEffect(() => {
    cargarEmpleados();
  }, []);

  return (
    <div className="empleado-container">
      <h2 className="empleado-title">Gestión de Empleados</h2>
      <button className="nuevo-empleado-button" onClick={() => navigate('/empleado/nuevo')}>+ Nuevo Empleado</button>
      <table className="empleado-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>DNI</th>
            <th>Correo</th>
            <th>Usuario</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map(e => (
            <tr key={e.codigo}>
              <td>{e.nombre} {e.apellidoPaterno}</td>
              <td>{e.dni}</td>
              <td>{e.correo}</td>
              <td>{e.userName}</td>
              <td>{e.rol?.nombre}</td> 
              <td>
                <button className="edit-button" onClick={() => navigate(`/empleado/editar/${e.codigo}`)}>Editar</button>
                <button className="delete-button" onClick={() => eliminarEmpleado(e.codigo)} style={{ marginLeft: '10px' }}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Empleado;
