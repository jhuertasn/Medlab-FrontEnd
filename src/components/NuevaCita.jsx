import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NuevaCita = () => {
  const navigate = useNavigate();
  const [formulario, setFormulario] = useState({
    fecha: '',
    hora: '',
    pacienteId: '',
    medicoId: '',
    empleadoId: '', // Asegúrate de que este campo esté presente
    servicioMedicoId: '',
    estadoCitaId: '', // Asegúrate de que este campo esté presente
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
  const [busqueda, setBusqueda] = useState('');
  const [sugerencias, setSugerencias] = useState([]);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);

  const auth = {
    username: localStorage.getItem('usuario'),
    password: localStorage.getItem('contraseña')
  };

  const buscarPacientes = async (texto) => {
    try {
      const token = btoa(`${localStorage.getItem('usuario')}:${localStorage.getItem('contraseña')}`);
      const response = await axios.get(`http://localhost:8898/medlab/paciente/buscar?nombre=${encodeURIComponent(texto)}`, {
        headers: {
          Authorization: `Basic ${token}`
        }
      });
      setSugerencias(response.data);
    } catch (error) {
      console.error('Error buscando pacientes', error);
    }
  };

  const handleInputChange = (e) => {
    const texto = e.target.value;
    setBusqueda(texto);
    if (texto.trim().length >= 2) {
      buscarPacientes(texto.trim());
    } else {
      setSugerencias([]);
    }
  };

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const urls = [
          ['paciente', setPacientes],
          ['medico', setMedicos],
          ['empleado', setEmpleados], // Asegúrate de cargar empleados
          ['servicios', setServicios],
          ['estado-cita', setEstados], // Asegúrate de cargar estados
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

    // Validar que todos los campos requeridos estén llenos
    if (!formulario.fecha || !formulario.hora || !formulario.pacienteId || !formulario.medicoId || !formulario.empleadoId || !formulario.servicioMedicoId || !formulario.estadoCitaId || !formulario.consultorioId || !formulario.horarioMedicoId) {
      alert('Por favor, complete todos los campos requeridos.');
      return;
    }

    const payload = {
      fecha: formulario.fecha,
      hora: formulario.hora,
      paciente: { codigo: parseInt(formulario.pacienteId) },
      medico: { codigo: parseInt(formulario.medicoId) },
      empleado: { codigo: parseInt(formulario.empleadoId) }, // Asegúrate de incluir el empleado
      servicioMedico: { codigo: parseInt(formulario.servicioMedicoId) },
      estadoCita: { codigo: parseInt(formulario.estadoCitaId) }, // Asegúrate de incluir el estado de cita
      consultorio: { codigo: parseInt(formulario.consultorioId) },
      horarioMedico: { codigo: parseInt(formulario.horarioMedicoId) }
    };

    console.log('Payload a enviar:', payload);

    try {
      await axios.post('http://localhost:8898/medlab/citas', payload, { auth });
      alert('Cita registrada correctamente');
      navigate('/citas');
      window.location.reload();
    } catch (error) {
      console.error('Error al registrar cita:', error);
      alert('Ocurrió un error al registrar la cita');
    }
  };

  return (
    <div className="nueva-cita-container">
      <h2 className="nueva-cita-title">Registrar Nueva Cita Médica</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-columns">
          {/* Columna Izquierda */}
          <div className="form-field">
            <label className="nueva-cita-label">Fecha</label>
            <input 
              type="date" 
              name="fecha"
              className="nueva-cita-input" 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label className="nueva-cita-label">Hora</label>
            <input 
              type="time" 
              name="hora" 
              className="nueva-cita-input" 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-field paciente-field">
            <label className="nueva-cita-label">Paciente</label>
            <input
              type="text"
              value={busqueda}
              onChange={handleInputChange}
              placeholder="Buscar paciente por nombre o DNI"
              className="nueva-cita-input"
            />
            {sugerencias.length > 0 && (
              <div className="nueva-cita-sugerencias">
                {sugerencias.map((p) => (
                  <div
                    key={p.codigo}
                    className="sugerencia-item"
                    onClick={() => {
                      setPacienteSeleccionado(p);
                      setBusqueda(`${p.nombre} ${p.apellidoPaterno}`);
                      setFormulario({ ...formulario, pacienteId: p.codigo });
                      setSugerencias([]);
                    }}
                  >
                    {p.nombre} {p.apellidoPaterno} - {p.dni}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Columna Derecha */}
          <div className="form-group">
            <label className="nueva-cita-label">Médico</label>
            <select name="medicoId" className="nueva-cita-select" onChange={handleChange} required>
              <option value="">Seleccione médico</option>
              {medicos.map(m => (
                <option key={m.codigo} value={m.codigo}>
                  Dr(a). {m.nombre} {m.apellidoPaterno}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="nueva-cita-label">Empleado</label>
            <select name="empleadoId" className="nueva-cita-select" onChange={handleChange} required>
              <option value="">Seleccione empleado</option>
              {empleados.map(e => (
                <option key={e.codigo} value={e.codigo}>
                  {e.nombre} {e.apellidoPaterno}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="nueva-cita-label">Servicio Médico</label>
            <select name="servicioMedicoId" className="nueva-cita-select" onChange={handleChange} required>
              <option value="">Seleccione servicio</option>
              {servicios.map(s => (
                <option key={s.codigo} value={s.codigo}>{s.nombre}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Campos secundarios */}
        <div className="form-columns">
          <div className="form-group">
            <label className="nueva-cita-label">Consultorio</label>
            <select name="consultorioId" className="nueva-cita-select" onChange={handleChange} required>
              <option value="">Seleccione consultorio</option>
              {consultorios.map(c => (
                <option key={c.codigo} value={c.codigo}>{c.nombre}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="nueva-cita-label">Horario</label>
            <select name="horarioMedicoId" className="nueva-cita-select" onChange={handleChange} required>
              <option value="">Seleccione horario</option>
              {horarios.map(h => (
                <option key={h.codigo} value={h.codigo}>
                  {h.diaSemana} {h.horaInicio} - {h.horaFin}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="nueva-cita-label">Estado de Cita</label>
            <select name="estadoCitaId" className="nueva-cita-select" onChange={handleChange} required>
              <option value="">Seleccione estado</option>
              {estados.map(es => (
                <option key={es.codigo} value={es.codigo}>{es.nombre}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="submit-container">
          <button type="submit" className="nueva-cita-button">
            Registrar Cita
          </button>
        </div>
      </form>
    </div>
  );
};

export default NuevaCita;
