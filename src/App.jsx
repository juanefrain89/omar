import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  
} from "react-router-dom";
import Inicio from './components/inicio/Inicio';
import Pattrulla from './components/patrulla/Patrulla';
import Datos from './components/agregar/Datos';
function App() {
  

  return (
    <>
     <Router>
      <Routes> 
        
      <Route path="/" element={<Pattrulla/>} />
      <Route path="/agregar" element={<Datos/>} />
      
         </Routes>
    </Router>
    </>
  )
}

export default App
