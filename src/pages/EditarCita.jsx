import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axiosInstance';
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

  const hoy = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const cargarCita = async () => {
      try {
        const res = await axiosInstance.get(`/citas/${id}`);
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
          const res = await axiosInstance.get(`/${endpoint}`);
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
      codigo: parseInt(id),
      fecha: formulario.fecha,
      hora: formulario.hora,
      paciente: { codigo: parseInt(formulario.pacienteId) },
      medico: { codigo: parseInt(formulario.medicoId) },
      empleado: { codigo: parseInt(formulario.empleadoId) },
      servicioMedico: { codigo: parseInt(formulario.servicioMedicoId) },
      estadoCita: { codigo: parseInt(formulario.estadoCitaId) },
      consultorio: { codigo: parseInt(formulario.consultorioId) },
      horarioMedico: { codigo: parseInt(formulario.horarioMedicoId) },
      estado: true
    };

    try {
      await axiosInstance.put(`/citas/${id}`, payload);
      alert('Cita actualizada con éxito');
      navigate('/citas');
    } catch (error) {
      console.error('Error actualizando cita:', error);
      alert('Error al actualizar la cita');
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
          min={hoy}
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
            <option key={p.codigo} value={p.codigo}>
              {p.nombre} {p.apellidoPaterno}
            </option>
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
            <option key={m.codigo} value={m.codigo}>
              Dr(a). {m.nombre} {m.apellidoPaterno}
            </option>
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
            <option key={e.codigo} value={e.codigo}>
              {e.nombre} {e.apellidoPaterno}
            </option>
          ))}
        </select>

        <label className="editar-cita-label">Servicio Médico:</label>
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
            <option key={h.codigo} value={h.codigo}>
              {h.diaSemana} {h.horaInicio} - {h.horaFin}
            </option>
          ))}
        </select>

        <button type="submit" className="editar-cita-button">
          Actualizar Cita
        </button>
      </form>
    </div>
  );
};

export default EditarCita;
