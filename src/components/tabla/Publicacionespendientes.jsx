import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './tabla.css';
import imagen from '../patrulla/diseño.png';

const Publicacionespendientes = ({ pendientes, onUpdate }) => {
  const [datos, setDatos] = useState([]);
  const [informacion, setInformacion] = useState("hola");

  useEffect(() => {
   
      setDatos(pendientes);
    
  }, [pendientes]);

  const aceptado = (id) => {
    const elementoEncontrado = datos.find(elemento => elemento.id === id);

    if (elementoEncontrado) {
      setInformacion("Espera unos segundos...");

      axios.post("https://ddcd-5.onrender.com/l", elementoEncontrado)
        .then(response => {
          console.log(response.data);
          alert("Usuario aceptado");
          setInformacion("Fue aceptado");
          const updatedDatos = datos.filter(elemento => elemento.id !== id);
          setDatos(updatedDatos);
          onUpdate(); // Llama al método del padre para volver a cargar los datos
        })
        .catch(error => {
          console.error("Error al aceptar el usuario:", error);
          setInformacion("Error al aceptar el usuario");
        });
    }
  };

  return (
    <>
      <h1>Acepta o rechaza patrullas</h1>
      {informacion && <p>{informacion}</p>} {/* Mostrar información al usuario */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Imagen</th>
            <th>Subir Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((item) => (
            <tr key={item.id}> {/* Cambiado a `item.id` para evitar problemas de clave única */}
              <td className="clase">{item.id}</td>
              <td className="clase"><img src={item.imagen || imagen} alt="Diseño" /></td>
              <td className="clase">
                <input type="file" onChange={(e) => handleImageChange(item.id, e)} />
              </td>
              <td className="clase clasedos">
                <button className="botoncienaceptar">Rechazar</button>
                <button className="botonrechazar" onClick={() => aceptado(item.id)}>Aceptar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Publicacionespendientes;
