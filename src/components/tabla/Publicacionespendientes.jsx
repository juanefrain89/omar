import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './tabla.css';
import imagen from '../patrulla/diseño.png';

const Publicacionespendientes = ({ pendientes, actualizarPendientes }) => {
  const [loading, setLoading] = useState(true);
  const [datos, setDatos] = useState([]);
  const [informacion, setInformacion] = useState("hola");

  useEffect(() => {
    setDatos(pendientes);
    setLoading(false);
  }, [pendientes]);

  const aceptado = (id) => {
    const elementoEncontrado = datos.find(elemento => elemento.id === id);

    if (elementoEncontrado) {
      setInformacion("espera unos segundos");

      // Realiza la llamada a la API para aceptar
      axios.post("https://ddcd-5.onrender.com/l", elementoEncontrado)
        .then(response => {
          console.log(response.data);
          alert("usuario aceptado");
          setInformacion("fue aceptado");
          // Llama a la función del padre para actualizar los pendientes
          actualizarPendientes(id);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  if (loading) {
    return <p>Cargando...</p>; // Mensaje de carga
  }

  return (
    <>
      <h1>acepta o rechaza patrullas</h1>
      <table>
        {datos.map((item, index) => (
          <tr key={index}>
            <td className="clase">{item.id}</td>
            <td className="clase">{item.imagen}</td>
            <td className="clase">
              <input type="file" onChange={(e) => handleImageChange(item.id, e)} />
            </td>
            <td className="clase clasedos">
              <button className="botoncienaceptar">rechazar</button>
              <button className="botonrechazar" onClick={() => aceptado(item.id)}>aceptar</button>
            </td>
          </tr>
        ))}
      </table>
    </>
  );
}

export default Publicacionespendientes;
