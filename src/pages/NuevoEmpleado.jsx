import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NuevoEmpleado = () => {
  const navigate = useNavigate();
  const [distritos, setDistritos] = useState([]);
  const [roles, setRoles] = useState([]);
  const [formulario, setFormulario] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    dni: '',
    fechaNacimiento: '',
    sexo: '',
    celular: '',
    correo: '',
    direccion: '',
    userName: '',
    password: '',
    distritoId: '',
    rolId: ''
  });

  const auth = {
    username: localStorage.getItem('usuario'),
    password: localStorage.getItem('contraseña')
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resDistritos, resRoles] = await Promise.all([
          axios.get('http://localhost:8898/medlab/distrito', { auth }),
          axios.get('http://localhost:8898/medlab/rol', { auth })
        ]);
        setDistritos(resDistritos.data);
        setRoles(resRoles.data);
      } catch (error) {
        console.error('Error cargando distritos o roles:', error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      nombre: formulario.nombre,
      apellidoPaterno: formulario.apellidoPaterno,
      apellidoMaterno: formulario.apellidoMaterno,
      dni: formulario.dni,
      fechaNacimiento: formulario.fechaNacimiento,
      sexo: formulario.sexo,
      celular: formulario.celular,
      correo: formulario.correo,
      direccion: formulario.direccion,
      userName: formulario.userName,
      password: formulario.password,
      distrito: { codigo: parseInt(formulario.distritoId) },
      rol: { codigo: parseInt(formulario.rolId) }
    };

    try {
      await axios.post('http://localhost:8898/medlab/empleado', payload, { auth });
      alert('Empleado registrado con éxito');
      navigate('/empleados');
    } catch (error) {
      console.error('Error al registrar empleado:', error);
      alert('Error al registrar empleado');
    }
  };

  return (
    <div className="nuevo-empleado-container">
      <h2 className="nuevo-empleado-title">Registrar Nuevo Empleado</h2>
      <form onSubmit={handleSubmit}>
        <input 
          name="nombre" 
          placeholder="Nombre" 
          value={formulario.nombre} 
          onChange={handleChange} 
          required 
          className="nuevo-empleado-input"
        />
        <input 
          name="apellidoPaterno" 
          placeholder="Apellido Paterno" 
          value={formulario.apellidoPaterno} 
          onChange={handleChange} 
          required 
          className="nuevo-empleado-input"
        />
        <input 
          name="apellidoMaterno" 
          placeholder="Apellido Materno" 
          value={formulario.apellidoMaterno} 
          onChange={handleChange} 
          required 
          className="nuevo-empleado-input"
        />
        <input 
          name="dni" 
          placeholder="DNI" 
          value={formulario.dni} 
          onChange={handleChange} 
          required 
          className="nuevo-empleado-input"
        />
        <input 
          name="fechaNacimiento" 
          type="date" 
          value={formulario.fechaNacimiento} 
          onChange={handleChange} 
          required 
          className="nuevo-empleado-input"
        />
        <select 
          name="sexo" 
          value={formulario.sexo} 
          onChange={handleChange} 
          required 
          className="nuevo-empleado-select"
        >
          <option value="">Seleccione sexo</option>
          <option value="MASCULINO">Masculino</option>
          <option value="FEMENINO">Femenino</option>
        </select>
        <input 
          name="celular" 
          placeholder="Celular" 
          value={formulario.celular} 
          onChange={handleChange} 
          className="nuevo-empleado-input"
        />
        <input 
          name="correo" 
          placeholder="Correo" 
          value={formulario.correo} 
          onChange={handleChange} 
          className="nuevo-empleado-input"
        />
        <input 
          name="direccion" 
          placeholder="Dirección" 
          value={formulario.direccion} 
          onChange={handleChange} 
          className="nuevo-empleado-input"
        />
        <input 
          name="userName" 
          placeholder="Usuario" 
          value={formulario.userName} 
          onChange={handleChange} 
          required 
          className="nuevo-empleado-input"
        />
        <input 
          name="password" 
          placeholder="Contraseña" 
          type="password" 
          value={formulario.password} 
          onChange={handleChange} 
          required 
          className="nuevo-empleado-input"
        />
        <select 
          name="distritoId" 
          value={formulario.distritoId} 
          onChange={handleChange} 
          required 
          className="nuevo-empleado-select"
        >
          <option value="">Seleccione distrito</option>
          {distritos.map((d) => (
            <option key={d.codigo} value={d.codigo}>{d.nombre}</option>
          ))}
        </select>
        <select 
          name="rolId" 
          value={formulario.rolId} 
          onChange={handleChange} 
          required 
          className="nuevo-empleado-select"
        >
          <option value="">Seleccione rol</option>
          {roles.map((r) => (
            <option key={r.codigo} value={r.codigo}>{r.nombre}</option>
          ))}
        </select>
        <button type="submit" className="nuevo-empleado-button">Registrar Empleado</button>
      </form>
    </div>
  );
};

export default NuevoEmpleado;
