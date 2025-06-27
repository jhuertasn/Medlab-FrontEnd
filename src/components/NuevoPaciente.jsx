import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PacienteForm from './PacienteForm';

const NuevoPaciente = () => {
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

  useEffect(() => {
    const fetchDistritos = async () => {
      const token = btoa(`${localStorage.getItem('usuario')}:${localStorage.getItem('contraseña')}`);
      try {
        const res = await axios.get('http://localhost:8898/medlab/distrito', {
          headers: { Authorization: `Basic ${token}` }
        });
        setDistritos(res.data);
      } catch (err) {
        console.error('Error al cargar distritos:', err);
      }
    };

    fetchDistritos();
  }, []);

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formulario,
      distrito: { codigo: parseInt(formulario.distritoId) }
    };

    const token = btoa(`${localStorage.getItem('usuario')}:${localStorage.getItem('contraseña')}`);

    try {
      await axios.post('http://localhost:8898/medlab/paciente', payload, {
        headers: {
          Authorization: `Basic ${token}`
        }
      });
      alert('Paciente registrado correctamente');
      navigate('/pacientes');
    } catch (error) {
      console.error('Error al registrar paciente:', error);
      alert('No se pudo registrar el paciente');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Registrar Nuevo Paciente</h2>
      <PacienteForm
        formulario={formulario}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        distritos={distritos}
      />
    </div>
  );
};

export default NuevoPaciente;
