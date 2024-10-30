import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './tabla.css';
import imagen from '../patrulla/diseño.png';
import { Contexto } from '../../General';
import { useContext } from 'react';
const Publicacionespendientes = () => {
  const [loading, setLoading] = useState(true);
  const [mandar, setmandar] = useState([]);
  const [datos, setDatos] = useState([ ]);
  const date = useContext(Contexto)
  console.log(date.pendientes, "aqui es pendiente");

  useEffect(() => {
    axios.get("https://ddcd-5.onrender.com/mostrar")
      .then(e => {
        setDatos(e.data);
        setLoading(false);

      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, []);


  const aceptado = (id) => {
    const elementoEncontrado = datos.find(elemento => elemento.id === id);
       

    

    axios.post("https://ddcd-5.onrender.com/l", elementoEncontrado       
    )
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
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
      <img className='imagenes' src="https://ddcd-5.onrender.com/imagenes/1729209371193.png" alt="" />
    </>
  );
}

export default Publicacionespendientes;
