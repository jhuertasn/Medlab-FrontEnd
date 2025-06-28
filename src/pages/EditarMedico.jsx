import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/styles.css'; // Asegúrate de importar el archivo CSS

const EditarMedico = () => {
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
    distritoId: '',
    especialidadId: '',
    cmp: ''
  });

  const [distritos, setDistritos] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);

  const auth = {
    username: localStorage.getItem('usuario'),
    password: localStorage.getItem('contraseña')
  };

  useEffect(() => {
    const cargarMedico = async () => {
      try {
        const res = await axios.get(`http://localhost:8898/medlab/medico/${id}`, { auth });
        const m = res.data;
        setFormulario({
          nombre: m.nombre,
          apellidoPaterno: m.apellidoPaterno,
          apellidoMaterno: m.apellidoMaterno,
          dni: m.dni,
          fechaNacimiento: m.fechaNacimiento,
          sexo: m.sexo,
          celular: m.celular,
          correo: m.correo,
          direccion: m.direccion,
          distritoId: m.distrito.codigo,
          especialidadId: m.especialidad.codigo,
          cmp: m.cmp,
          estado: m.estado // 👈 añadir esto
        });
      } catch (error) {
        console.error('Error cargando médico:', error);
      }
    };

    const cargarListas = async () => {
      try {
        const [resDistritos, resEspecialidades] = await Promise.all([
          axios.get('http://localhost:8898/medlab/distrito', { auth }),
          axios.get('http://localhost:8898/medlab/especialidad', { auth })
        ]);
        setDistritos(resDistritos.data);
        setEspecialidades(resEspecialidades.data);
      } catch (error) {
        console.error('Error cargando listas:', error);
      }
    };

    cargarMedico();
    cargarListas();
  }, [id]);

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      distritoId,
      especialidadId,
      ...resto
    } = formulario;

    const payload = {
      ...resto,
      estado: true, // 👈 Asegura que se mantenga en true al editar
      distrito: { codigo: parseInt(distritoId) },
      especialidad: { codigo: parseInt(especialidadId) }
    };

    console.log("Payload enviado:", JSON.stringify(payload, null, 2)); // 🟡

    try {
      await axios.put(`http://localhost:8898/medlab/medico/${id}`, payload, { auth });
      alert('Médico actualizado correctamente');
      navigate('/medicos');
    } catch (error) {
      console.error('Error actualizando médico:', error);
      alert('No se pudo actualizar el médico');
    }
  };

  return (
    <div className="editar-medico-container">
      <h2 className="editar-medico-title">Editar Médico</h2>
      <form onSubmit={handleSubmit}>
        <input className="editar-medico-input" name="nombre" value={formulario.nombre} onChange={handleChange} placeholder="Nombre" required />
        <input className="editar-medico-input" name="apellidoPaterno" value={formulario.apellidoPaterno} onChange={handleChange} placeholder="Apellido Paterno" required />
        <input className="editar-medico-input" name="apellidoMaterno" value={formulario.apellidoMaterno} onChange={handleChange} placeholder="Apellido Materno" required />
        <input className="editar-medico-input" name="dni" value={formulario.dni} onChange={handleChange} placeholder="DNI" required />
        <input className="editar-medico-input" type="date" name="fechaNacimiento" value={formulario.fechaNacimiento} onChange={handleChange} required />
        <select className="editar-medico-select" name="sexo" value={formulario.sexo} onChange={handleChange} required>
          <option value="">Seleccione sexo</option>
          <option value="MASCULINO">Masculino</option>
          <option value="FEMENINO">Femenino</option>
        </select>
        <input className="editar-medico-input" name="celular" value={formulario.celular} onChange={handleChange} placeholder="Celular" />
        <input className="editar-medico-input" name="correo" value={formulario.correo} onChange={handleChange} placeholder="Correo" />
        <input className="editar-medico-input" name="direccion" value={formulario.direccion} onChange={handleChange} placeholder="Dirección" />
        <select className="editar-medico-select" name="distritoId" value={formulario.distritoId} onChange={handleChange} required>
          <option value="">Seleccione distrito</option>
          {distritos.map(d => (
            <option key={d.codigo} value={d.codigo}>{d.nombre}</option>
          ))}
        </select>
        <select className="editar-medico-select" name="especialidadId" value={formulario.especialidadId} onChange={handleChange} required>
          <option value="">Seleccione especialidad</option>
          {especialidades.map(e => (
            <option key={e.codigo} value={e.codigo}>{e.nombre}</option>
          ))}
        </select>
        <input className="editar-medico-input" name="cmp" value={formulario.cmp} onChange={handleChange} placeholder="CMP" required />
        <button type="submit" className="editar-medico-button">Actualizar Médico</button>
      </form>
    </div>
  );
};

export default EditarMedico;
