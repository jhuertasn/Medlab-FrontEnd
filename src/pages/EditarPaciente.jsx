import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditarPaciente = () => {
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
    distritoId: ''
  });

  const [distritos, setDistritos] = useState([]);

  const auth = {
    username: localStorage.getItem('usuario'),
    password: localStorage.getItem('contraseña')
  };

  // Cargar datos del paciente
  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const token = btoa(`${auth.username}:${auth.password}`);
        const res = await axios.get(`http://localhost:8898/medlab/paciente/${id}`, {
          headers: {
            Authorization: `Basic ${token}`
          }
        });

        const paciente = res.data;
        setFormulario({
          nombre: paciente.nombre,
          apellidoPaterno: paciente.apellidoPaterno,
          apellidoMaterno: paciente.apellidoMaterno,
          dni: paciente.dni,
          fechaNacimiento: paciente.fechaNacimiento,
          sexo: paciente.sexo,
          celular: paciente.celular,
          correo: paciente.correo,
          direccion: paciente.direccion,
          distritoId: paciente.distrito.codigo
        });
      } catch (error) {
        console.error('Error al cargar paciente:', error);
      }
    };

    const fetchDistritos = async () => {
      try {
        const res = await axios.get('http://localhost:8898/medlab/distrito', { auth });
        setDistritos(res.data);
      } catch (error) {
        console.error('Error al cargar distritos:', error);
      }
    };

    fetchPaciente();
    fetchDistritos();
  }, [id]);

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      codigo: parseInt(id), // muy importante si lo necesita
      nombre: formulario.nombre,
      apellidoPaterno: formulario.apellidoPaterno,
      apellidoMaterno: formulario.apellidoMaterno,
      dni: formulario.dni,
      fechaNacimiento: formulario.fechaNacimiento,
      sexo: formulario.sexo,
      celular: formulario.celular,
      correo: formulario.correo,
      direccion: formulario.direccion,
      distrito: { codigo: parseInt(formulario.distritoId) },
      estado: true // ✅ fuerza el estado a true
    };

    console.log('Payload enviado:', payload); // 👀 mira el contenido en consola

    try {
      const token = btoa(`${localStorage.getItem('usuario')}:${localStorage.getItem('contraseña')}`);
      await axios.put(`http://localhost:8898/medlab/paciente/${id}`, payload, {
        headers: {
          Authorization: `Basic ${token}`
        }
      });
      alert('Paciente actualizado con éxito');
      navigate('/pacientes');
    } catch (error) {
      console.error('Error al actualizar paciente:', error);
      alert('Error al actualizar paciente');
    }
  };

  return (
    <div className="editar-paciente-container">
      <h2 className="editar-paciente-title">Editar Paciente</h2>
      <form onSubmit={handleSubmit}>
        <input 
          name="nombre" 
          placeholder="Nombre" 
          value={formulario.nombre} 
          onChange={handleChange} 
          required 
          className="editar-paciente-input"
        />
        <input 
          name="apellidoPaterno" 
          placeholder="Apellido Paterno" 
          value={formulario.apellidoPaterno} 
          onChange={handleChange} 
          required 
          className="editar-paciente-input"
        />
        <input 
          name="apellidoMaterno" 
          placeholder="Apellido Materno" 
          value={formulario.apellidoMaterno} 
          onChange={handleChange} 
          required 
          className="editar-paciente-input"
        />
        <input 
          name="dni" 
          placeholder="DNI" 
          value={formulario.dni} 
          onChange={handleChange} 
          required 
          className="editar-paciente-input"
        />
        <input 
          name="fechaNacimiento" 
          type="date" 
          value={formulario.fechaNacimiento} 
          onChange={handleChange} 
          required 
          className="editar-paciente-input"
        />
        <select 
          name="sexo" 
          value={formulario.sexo} 
          onChange={handleChange} 
          required 
          className="editar-paciente-select"
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
          className="editar-paciente-input"
        />
        <input 
          name="correo" 
          placeholder="Correo" 
          value={formulario.correo} 
          onChange={handleChange} 
          className="editar-paciente-input"
        />
        <input 
          name="direccion" 
          placeholder="Dirección" 
          value={formulario.direccion} 
          onChange={handleChange} 
          className="editar-paciente-input"
        />
        <select 
          name="distritoId" 
          value={formulario.distritoId} 
          onChange={handleChange} 
          required 
          className="editar-paciente-select"
        >
          <option value="">Seleccione distrito</option>
          {distritos.map((d) => (
            <option key={d.codigo} value={d.codigo}>{d.nombre}</option>
          ))}
        </select>
        <button type="submit" className="editar-paciente-button">Actualizar Paciente</button>
      </form>
    </div>
  );
};

export default EditarPaciente;
