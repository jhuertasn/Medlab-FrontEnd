import React from 'react';

const PacienteForm = ({ formulario, handleChange, handleSubmit, distritos = [] }) => {
  return (
    <div className="paciente-form-container">
      <h2 className="paciente-form-title">Registrar Paciente</h2>
      <form onSubmit={handleSubmit}>
        <input 
          name="nombre" 
          placeholder="Nombre" 
          value={formulario.nombre} 
          onChange={handleChange} 
          required
          minLength={2}
          maxLength={50} 
          className="paciente-form-input"
        />
        <input 
          name="apellidoPaterno" 
          placeholder="Apellido Paterno" 
          value={formulario.apellidoPaterno} 
          onChange={handleChange} 
          required
          minLength={2}
          maxLength={50} 
          className="paciente-form-input"
        />
        <input 
          name="apellidoMaterno" 
          placeholder="Apellido Materno" 
          value={formulario.apellidoMaterno} 
          onChange={handleChange} 
          required
          minLength={2}
          maxLength={50} 
          className="paciente-form-input"
        />
        <input 
          name="dni" 
          placeholder="DNI" 
          value={formulario.dni} 
          onChange={handleChange} 
          required
          pattern="\d{8}"
          title="El DNI debe tener 8 dígitos numéricos" 
          className="paciente-form-input"
        />
        <input 
          name="fechaNacimiento" 
          type="date" 
          value={formulario.fechaNacimiento} 
          onChange={handleChange} 
          required 
          className="paciente-form-input"
        />
        
        <select 
          name="sexo" 
          value={formulario.sexo} 
          onChange={handleChange} 
          required 
          className="paciente-form-select"
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
          pattern="\d{9}"
          title="El número celular debe tener 9 dígitos" 
          className="paciente-form-input"
        />
        <input 
          name="correo" 
          placeholder="Correo" 
          value={formulario.correo} 
          onChange={handleChange}
          required
          maxLength={100} 
          className="paciente-form-input"
        />
        <input 
          name="direccion" 
          placeholder="Dirección" 
          value={formulario.direccion} 
          onChange={handleChange}
          required
          maxLength={100} 
          className="paciente-form-input"
        />

        <select 
          name="distritoId" 
          value={formulario.distritoId} 
          onChange={handleChange} 
          required 
          className="paciente-form-select"
        >
          <option value="">Seleccione distrito</option>
          {distritos.map((d) => (
            <option key={d.codigo} value={d.codigo}>{d.nombre}</option>
          ))}
        </select>

        <button type="submit" className="paciente-form-button">Registrar Paciente</button>
      </form>
    </div>
  );
};

export default PacienteForm;
