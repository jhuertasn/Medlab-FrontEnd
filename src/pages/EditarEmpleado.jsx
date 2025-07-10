import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axiosInstance';
import { useParams, useNavigate } from 'react-router-dom';

const EditarEmpleado = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
    distritoId: '',
    rolId: ''
  });

  const [distritos, setDistritos] = useState([]);
  const [roles, setRoles] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resEmpleado, resDistritos, resRoles] = await Promise.all([
          axiosInstance.get(`/empleado/${id}`),
          axiosInstance.get('/distrito'),
          axiosInstance.get('/rol')
        ]);

        const e = resEmpleado.data;
        setFormulario({
          nombre: e.nombre,
          apellidoPaterno: e.apellidoPaterno,
          apellidoMaterno: e.apellidoMaterno,
          dni: e.dni,
          fechaNacimiento: e.fechaNacimiento,
          sexo: e.sexo,
          celular: e.celular,
          correo: e.correo,
          direccion: e.direccion,
          userName: e.userName,
          distritoId: e.distrito.codigo,
          rolId: e.rol.codigo
        });

        setDistritos(resDistritos.data);
        setRoles(resRoles.data);
      } catch (error) {
        console.error('Error cargando empleado:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      codigo: parseInt(id),
      nombre: formulario.nombre,
      apellidoPaterno: formulario.apellidoPaterno,
      apellidoMaterno: formulario.apellidoMaterno,
      dni: formulario.dni,
      fechaNacimiento: formulario.fechaNacimiento,
      sexo: formulario.sexo,
      celular: formulario.celular,
      correo: formulario.correo,
      direccion: formulario.direccion,
      estado: true,
      userName: formulario.userName,
      distrito: { codigo: parseInt(formulario.distritoId) },
      rol: { codigo: parseInt(formulario.rolId) },
    };

    console.log("Payload que se envía desde React:", JSON.stringify(payload, null, 2));

    try {
      await axiosInstance.put(`/empleado/${id}`, payload);
      alert('Empleado actualizado correctamente');
      navigate('/empleados');
    } catch (error) {
      console.error('Error al actualizar empleado:', error);
      alert('Error al actualizar empleado');
    }
  };

  return (
    <div className="editar-empleado-container">
      <h2 className="editar-empleado-title">Editar Empleado</h2>
      <form onSubmit={handleSubmit}>

        <input 
          name="nombre" 
          placeholder="Nombre" 
          value={formulario.nombre} 
          onChange={handleChange} 
          required
            minLength={2}
            maxLength={50} 
          className="editar-empleado-input"
        />
        <input 
          name="apellidoPaterno" 
          placeholder="Apellido Paterno" 
          value={formulario.apellidoPaterno} 
          onChange={handleChange} 
          required
            minLength={2}
            maxLength={50} 
          className="editar-empleado-input"
        />
        <input 
          name="apellidoMaterno" 
          placeholder="Apellido Materno" 
          value={formulario.apellidoMaterno} 
          onChange={handleChange} 
          required
            minLength={2}
  maxLength={50} 
          className="editar-empleado-input"
        />
        <input 
          name="dni" 
          placeholder="DNI" 
          value={formulario.dni} 
          onChange={handleChange} 
          required
            pattern="\d{8}"
  title="El DNI debe contener 8 dígitos" 
          className="editar-empleado-input"
        />
        <input 
          name="fechaNacimiento" 
          type="date" 
          value={formulario.fechaNacimiento} 
          onChange={handleChange} 
          required 
          className="editar-empleado-input"
        />
        <select 
          name="sexo" 
          value={formulario.sexo} 
          onChange={handleChange} 
          required 
          className="editar-empleado-select"
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
            required
  pattern="\d{9}"
  title="El número de celular debe tener 9 dígitos" 
          className="editar-empleado-input"
        />
        <input 
          name="correo"
          type="email" 
          placeholder="Correo" 
          value={formulario.correo} 
          onChange={handleChange}
          required 
          className="editar-empleado-input"
        />
        <input 
          name="direccion" 
          placeholder="Dirección" 
          value={formulario.direccion} 
          onChange={handleChange}
            required
  maxLength={100} 
          className="editar-empleado-input"
        />
        <input 
          name="userName" 
          placeholder="Nombre de usuario" 
          value={formulario.userName} 
          onChange={handleChange} 
          required
            minLength={4}
  maxLength={30} 
          className="editar-empleado-input"
        />
        <select 
          name="distritoId" 
          value={formulario.distritoId} 
          onChange={handleChange} 
          required 
          className="editar-empleado-select"
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
          className="editar-empleado-select"
        >
          <option value="">Seleccione rol</option>
          {roles.map((r) => (
            <option key={r.codigo} value={r.codigo}>{r.nombre}</option>
          ))}
        </select>

        <button type="submit" className="editar-empleado-button">Actualizar Empleado</button>
      </form>
    </div>
  );
};

export default EditarEmpleado;
