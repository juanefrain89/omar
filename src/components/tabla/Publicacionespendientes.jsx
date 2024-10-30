import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './tabla.css';
import imagen from '../patrulla/diseño.png';
import { Contexto } from '../../General';

const Publicacionespendientes = () => {
  const [loading, setLoading] = useState(true);
  const [datos, setDatos] = useState([]);
  const date = useContext(Contexto);
  console.log(date.pendientes, "aqui es pendiente");
  const [informacion, setInformacion] = useState("hola");

  useEffect(() => {
    setDatos(date.pendientes);
    setLoading(false);
    axios.get("https://ddcd-5.onrender.com/mostrar")
      .then(e => {
        console.log(e.data, "aqui es pendiente 2");
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, [date.pendientes]); // Asegúrate de usar el efecto correctamente

  const aceptado = (id) => {
    const elementoEncontrado = datos.find(elemento => elemento.id === id);

    if (elementoEncontrado) {
      setInformacion("espera unos segundos");

      // Realiza la llamada a la API para aceptar
      axios.post("https://ddcd-5.onrender.com/l", elementoEncontrado)
        .then(response => {
          console.log(response.data);
          console.log(elementoEncontrado);
          
          alert("usuario aceptado");
          setInformacion("fue aceptado");
          const updatedDatos = datos.filter(elemento => elemento.id !== id);
          setDatos(updatedDatos); 
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  console.log(datos);

  return (
    <>
      <h1>acepta o rechaza patrullas</h1>
      <table>
        {datos.map((item, index) => {
          return (
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
          );
        })}
      </table>
    </>
  );
}

export default Publicacionespendientes;
