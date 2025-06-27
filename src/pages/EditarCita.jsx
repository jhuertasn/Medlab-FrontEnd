import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditarCita = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formulario, setFormulario] = useState({
    fecha: '',
    hora: '',
    pacienteId: '',
    medicoId: '',
    empleadoId: '',
    servicioMedicoId: '',
    estadoCitaId: '',
    consultorioId: '',
    horarioMedicoId: ''
  });

  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [estados, setEstados] = useState([]);
  const [consultorios, setConsultorios] = useState([]);
  const [horarios, setHorarios] = useState([]);

  const auth = {
    username: localStorage.getItem('usuario'),
    password: localStorage.getItem('contraseña')
  };

  // Cargar cita actual
  useEffect(() => {
    const cargarCita = async () => {
      try {
        const token = btoa(`${auth.username}:${auth.password}`);
        const res = await axios.get(`http://localhost:8898/medlab/citas/${id}`, {
          headers: {
            Authorization: `Basic ${token}`
          }
        });
        const cita = res.data;
        setFormulario({
          fecha: cita.fecha,
          hora: cita.hora,
          pacienteId: cita.paciente.codigo,
          medicoId: cita.medico.codigo,
          empleadoId: cita.empleado.codigo,
          servicioMedicoId: cita.servicioMedico.codigo,
          estadoCitaId: cita.estadoCita.codigo,
          consultorioId: cita.consultorio.codigo,
          horarioMedicoId: cita.horarioMedico.codigo
        });
      } catch (error) {
        console.error('Error cargando cita:', error);
      }
    };
    cargarCita();
  }, [id]);

  // Cargar data general (igual que en nueva cita)
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const urls = [
          ['paciente', setPacientes],
          ['medico', setMedicos],
          ['empleado', setEmpleados],
          ['servicios', setServicios],
          ['estado-cita', setEstados],
          ['consultorio', setConsultorios],
          ['horarios', setHorarios]
        ];

        for (let [endpoint, setter] of urls) {
          const res = await axios.get(`http://localhost:8898/medlab/${endpoint}`, { auth });
          setter(res.data);
        }
      } catch (error) {
        console.error('Error cargando opciones:', error);
      }
    };
    cargarDatos();
  }, []);

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      codigo: parseInt(id), // ✅ este campo es obligatorio
      fecha: formulario.fecha,
      hora: formulario.hora,
      paciente: { codigo: parseInt(formulario.pacienteId) },
      medico: { codigo: parseInt(formulario.medicoId) },
      empleado: { codigo: parseInt(formulario.empleadoId) },
      servicioMedico: { codigo: parseInt(formulario.servicioMedicoId) },
      estadoCita: { codigo: parseInt(formulario.estadoCitaId) },
      consultorio: { codigo: parseInt(formulario.consultorioId) },
      horarioMedico: { codigo: parseInt(formulario.horarioMedicoId) },
      estado: true // ⚠️ Esto es necesario
    };

    try {
      const token = btoa(`${auth.username}:${auth.password}`);
      await axios.put(`http://localhost:8898/medlab/citas/${id}`, payload, {
        headers: {
          Authorization: `Basic ${token}`
        }
      });
      alert('Cita actualizada con éxito');
      navigate('/citas');
    } catch (error) {
      console.error('Error actualizando cita:', error);
      alert('Error al actualizar cita');
    }
  };

  return (
    <div className="editar-cita-container">
      <h2 className="editar-cita-title">Editar Cita</h2>
      <form onSubmit={handleSubmit}>
        <label className="editar-cita-label">Fecha:</label>
        <input 
          type="date" 
          name="fecha" 
          value={formulario.fecha} 
          onChange={handleChange} 
          required 
          className="editar-cita-input"
        />

        <label className="editar-cita-label">Hora:</label>
        <input 
          type="time" 
          name="hora" 
          value={formulario.hora} 
          onChange={handleChange} 
          required 
          className="editar-cita-input"
        />

        <label className="editar-cita-label">Paciente:</label>
        <select 
          name="pacienteId" 
          value={formulario.pacienteId} 
          onChange={handleChange} 
          required 
          className="editar-cita-select"
        >
          <option value="">Seleccione</option>
          {pacientes.map(p => (
            <option key={p.codigo} value={p.codigo}>{p.nombre} {p.apellidoPaterno}</option>
          ))}
        </select>

        <label className="editar-cita-label">Médico:</label>
        <select 
          name="medicoId" 
          value={formulario.medicoId} 
          onChange={handleChange} 
          required 
          className="editar-cita-select"
        >
          <option value="">Seleccione</option>
          {medicos.map(m => (
            <option key={m.codigo} value={m.codigo}>{m.nombre} {m.apellidoPaterno}</option>
          ))}
        </select>

        <label className="editar-cita-label">Empleado:</label>
        <select 
          name="empleadoId" 
          value={formulario.empleadoId} 
          onChange={handleChange} 
          required 
          className="editar-cita-select"
        >
          <option value="">Seleccione</option>
          {empleados.map(e => (
            <option key={e.codigo} value={e.codigo}>{e.nombre} {e.apellidoPaterno}</option>
          ))}
        </select>

        <label className="editar-cita-label">Servicio:</label>
        <select 
          name="servicioMedicoId" 
          value={formulario.servicioMedicoId} 
          onChange={handleChange} 
          required 
          className="editar-cita-select"
        >
          <option value="">Seleccione</option>
          {servicios.map(s => (
            <option key={s.codigo} value={s.codigo}>{s.nombre}</option>
          ))}
        </select>

        <label className="editar-cita-label">Estado:</label>
        <select 
          name="estadoCitaId" 
          value={formulario.estadoCitaId} 
          onChange={handleChange} 
          required 
          className="editar-cita-select"
        >
          <option value="">Seleccione</option>
          {estados.map(es => (
            <option key={es.codigo} value={es.codigo}>{es.nombre}</option>
          ))}
        </select>

        <label className="editar-cita-label">Consultorio:</label>
        <select 
          name="consultorioId" 
          value={formulario.consultorioId} 
          onChange={handleChange} 
          required 
          className="editar-cita-select"
        >
          <option value="">Seleccione</option>
          {consultorios.map(c => (
            <option key={c.codigo} value={c.codigo}>{c.nombre}</option>
          ))}
        </select>

        <label className="editar-cita-label">Horario:</label>
        <select 
          name="horarioMedicoId" 
          value={formulario.horarioMedicoId} 
          onChange={handleChange} 
          required 
          className="editar-cita-select"
        >
          <option value="">Seleccione</option>
          {horarios.map(h => (
            <option key={h.codigo} value={h.codigo}>{h.diaSemana} {h.horaInicio} - {h.horaFin}</option>
          ))}
        </select>

        <button type="submit" className="editar-cita-button">Actualizar Cita</button>
      </form>
    </div>
  );
};

export default EditarCita;
