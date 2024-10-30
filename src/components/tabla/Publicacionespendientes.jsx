import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './tabla.css';
import imagen from '../patrulla/diseño.png';
import { Contexto } from '../../General';

const Publicacionespendientes = () => {
  const [loading, setLoading] = useState(true);
  const [mandar, setmandar] = useState([]);
  const [datos, setDatos] = useState([]); // Inicializado como array vacío
  const contexto = useContext(Contexto);
  const [informacion, setinformacion] = useState("");

  useEffect(() => {
    if (contexto.pendiente) { // Verifica si contexto.pendiente existe
      setDatos(contexto.pendiente);
    }
  }, [contexto.pendiente]);
console.log(contexto.pendiente, "aqui es pendientes");

  const aceptado = (id) => {
    alert("usuario aceptado, espere unos segundos");
    setinformacion("Espera unos segundos...");
    const elementoEncontrado = datos.find(elemento => elemento.id === id);

    axios.post("https://ddcd-5.onrender.com/l", elementoEncontrado)
      .then(response => {
        setinformacion(response.data);
        window.location.href = "https://omar-d35h.vercel.app";
      })
      .catch(error => {
        setinformacion("Hubo un error, intente de nuevo por favor");
      });
  };

  const handleImageChange = (id, e) => {
    // Implementa esta función para manejar la selección de archivos
  };

  return (
    <>
      <h1>Acepta o rechaza patrullas</h1>
      <table>
        {datos.length > 0 ? datos.map((item, index) => (
          <tr key={index}>
            <td className="clase">{item.id}</td>
            <td className="clase">{item.imagen}</td>
            <td className="clase">
              <input type="file" onChange={(e) => handleImageChange(item.id, e)} />
            </td>
            <td className="clase clasedos">
              <button className="botoncienaceptar">Rechazar</button>
              <button className="botonrechazar" onClick={() => aceptado(item.id)}>Aceptar</button>
            </td>
          </tr>
        )) : <tr><td colSpan="4">No hay datos disponibles.</td></tr>}
      </table>
      <p>{informacion}</p>
    </>
  );
}

export default Publicacionespendientes;
