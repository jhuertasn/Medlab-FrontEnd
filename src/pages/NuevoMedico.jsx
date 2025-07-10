import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axiosInstance';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css'; // Asegúrate de importar el archivo CSS

const NuevoMedico = () => {
  const navigate = useNavigate();
  const [distritos, setDistritos] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
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
    cmp: '',
    distritoId: '',
    especialidadId: ''
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
          const [resDistritos, resEspecialidades] = await Promise.all([
            axiosInstance.get('/distrito'),
            axiosInstance.get('/especialidad')
          ]);


        setDistritos(resDistritos.data);
        setEspecialidades(resEspecialidades.data);
      } catch (error) {
        console.error('Error cargando distritos o especialidades:', error);
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
      cmp: formulario.cmp,
      estado: true, // 👈 Esta línea es crucial
      distrito: { codigo: parseInt(formulario.distritoId) },
      especialidad: { codigo: parseInt(formulario.especialidadId) }
    };

    try {
      await axiosInstance.post('/medico', payload);
      alert('Médico registrado con éxito');
      navigate('/medicos');
      window.location.reload(); // 🔁 recarga la lista al volver
    } catch (error) {
      console.error('Error al registrar médico:', error);
      alert('Error al registrar médico');
    }
  };

  return (
    <div className="nuevo-medico-container">
      <h2 className="nuevo-medico-title">Registrar Nuevo Médico</h2>
      <form onSubmit={handleSubmit}>

        <input
  className="nuevo-medico-input"
  name="nombre"
  placeholder="Nombre"
  value={formulario.nombre}
  onChange={handleChange}
  required
  minLength={2}
  maxLength={50}
/>

<input
  className="nuevo-medico-input"
  name="apellidoPaterno"
  placeholder="Apellido Paterno"
  value={formulario.apellidoPaterno}
  onChange={handleChange}
  required
  minLength={2}
  maxLength={50}
/>

<input
  className="nuevo-medico-input"
  name="apellidoMaterno"
  placeholder="Apellido Materno"
  value={formulario.apellidoMaterno}
  onChange={handleChange}
  required
  minLength={2}
  maxLength={50}
/>

<input
  className="nuevo-medico-input"
  name="dni"
  placeholder="DNI"
  value={formulario.dni}
  onChange={handleChange}
  required
  pattern="\d{8}"
  title="El DNI debe contener 8 dígitos"
/>

<input
  className="nuevo-medico-input"
  type="date"
  name="fechaNacimiento"
  value={formulario.fechaNacimiento}
  onChange={handleChange}
  required
/>

<select
  className="nuevo-medico-select"
  name="sexo"
  value={formulario.sexo}
  onChange={handleChange}
  required
>
  <option value="">Seleccione sexo</option>
  <option value="MASCULINO">Masculino</option>
  <option value="FEMENINO">Femenino</option>
</select>

<input
  className="nuevo-medico-input"
  name="celular"
  placeholder="Celular"
  value={formulario.celular}
  onChange={handleChange}
  pattern="\d{9}"
  title="El número de celular debe tener 9 dígitos"
/>

<input
  className="nuevo-medico-input"
  name="correo"
  type="email"
  placeholder="Correo"
  value={formulario.correo}
  onChange={handleChange}
/>

<input
  className="nuevo-medico-input"
  name="direccion"
  placeholder="Dirección"
  value={formulario.direccion}
  onChange={handleChange}
  maxLength={100}
/>

<input
  className="nuevo-medico-input"
  name="cmp"
  placeholder="CMP"
  value={formulario.cmp}
  onChange={handleChange}
  required
  pattern="\d{6}"
  title="El CMP debe contener 6 dígitos"
/>
 
        <select className="nuevo-medico-select" name="distritoId" value={formulario.distritoId} onChange={handleChange} required>
          <option value="">Seleccione distrito</option>
          {distritos.map((d) => (
            <option key={d.codigo} value={d.codigo}>{d.nombre}</option>
          ))}
        </select>

        <select className="nuevo-medico-select" name="especialidadId" value={formulario.especialidadId} onChange={handleChange} required>
          <option value="">Seleccione especialidad</option>
          {especialidades.map((e) => (
            <option key={e.codigo} value={e.codigo}>{e.nombre}</option>
          ))}
        </select>

        <button type="submit" className="nuevo-medico-button">Registrar Médico</button>
      </form>
    </div>
  );
};

export default NuevoMedico;
