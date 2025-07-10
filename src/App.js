// src/App.js
import React from 'react';
import { Routes, Route, useLocation} from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Dashboard from './pages/Dashboard';
import Citas from './pages/Citas'; // ✅ importa el componente
import Navbar from './components/Navbar';
import NuevaCita from './components/NuevaCita';
import NuevoPaciente from './components/NuevoPaciente';
import EditarCita from './pages/EditarCita';
import Pacientes from './pages/Pacientes'; // Asegúrate que la ruta sea correcta
import EditarPaciente from './pages/EditarPaciente';
import Empleado from './pages/Empleado';
import NuevoEmpleado from './pages/NuevoEmpleado';
import EditarEmpleado from './pages/EditarEmpleado';
import Medicos from './pages/Medicos'; // importa el componente
import NuevoMedico from './pages/NuevoMedico';
import EditarMedico from './pages/EditarMedico';
import RecuperarPassword from './components/RecuperarPassword';

function App() {

  const location = useLocation();
  const isAuthenticated = localStorage.getItem('usuario') && localStorage.getItem('contraseña');
  const isLoginPage = location.pathname === "/";

  return (
    <>
     {localStorage.getItem('token') && <Navbar />} {/* ✅ Mostrar solo si está logueado */}
     <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/citas" element={<Citas />} />
        <Route path="/citas/nueva" element={<NuevaCita />} />
        <Route path="/paciente/nuevo" element={<NuevoPaciente />} />
        <Route path="/citas/editar/:id" element={<EditarCita />} />
        <Route path="/pacientes" element={<Pacientes />} />
        <Route path="/pacientes/editar/:id" element={<EditarPaciente />} />
        <Route path="/empleados" element={<Empleado />} />
        <Route path="/empleado/nuevo" element={<NuevoEmpleado />} />
        <Route path="/empleado/editar/:id" element={<EditarEmpleado />} />
        <Route path="/medicos" element={<Medicos />} />
        <Route path="/medico/nuevo" element={<NuevoMedico />} />
        <Route path="/medico/editar/:id" element={<EditarMedico />} />
        <Route path="/recuperar" element={<RecuperarPassword />} />
      </Routes>
    </>
  );
}

export default App;

