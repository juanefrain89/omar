import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from './components/inicio/Inicio';
import Patrulla from './components/patrulla/Patrulla';
import Datos from './components/agregar/Datos';
import Login from './components/Login/Login';
import Registro from './components/Login/Registro';
import PublicacionesPendientes from './components/tabla/PublicacionesPendientes';
import Comprobar from './components/Login/Comprobar';
import General from './General';

function App() {
  const token = localStorage.getItem('token');
  console.log(token);

  const [h, hh] = useState();
  const add = (mensaje) => { 
    hh(mensaje);
  };

  return (
    <Router>
      <Routes>
        
       
        
        {/* General agrupa las rutas que necesitan el contexto */}
        <Route element={<General />}>
        <Route path="/" element={<Login />} />
          <Route path="/registro" element={<Registro add={add} />} />
          <Route path="/pendientes" element={<PublicacionesPendientes />} />
          <Route path="/patrullas" element={<Patrulla />} />
          <Route path="/agregar" element={<Datos />} />
          <Route path="/comprobar" element={<Comprobar correo={h} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
