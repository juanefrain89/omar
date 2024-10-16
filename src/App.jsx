import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate
  
} from "react-router-dom";
import Inicio from './components/inicio/Inicio';
import Pattrulla from './components/patrulla/Patrulla';
import Datos from './components/agregar/Datos';
import Login from './components/Login/Login';
import Registro from './components/Login/Registro';
import Publicacionespendientes from './components/tabla/Publicacionespendientes';
function App() {
  
const  token = localStorage.getItem('token')
console.log(token);

  return (
    <>
     <Router>
      <Routes>     
       
      <Route path="/" element={<Login/>} />
      <Route path="/registro" element={<Registro/>} />
      <Route path="/patrullas" element={<Pattrulla/>}/>
      <Route path="/agregar" element={<Datos/>} />  
      <Route path="/pendientes" element={<Publicacionespendientes/>} />      
         </Routes>
    </Router>
    </>
  )
}

export default App
