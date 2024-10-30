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
const [informacion, setinformacion]=useState("hola")
  useEffect(() => {
    axios.get("https://ddcd-5.onrender.com/mostrar")
    setDatos(date.pendientes);
    setLoading(false);
      .then(e => {
        console.log(e.data , "aqui es pendiente 2");
        
      

      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, []);


  const aceptado = (id) => {
    const elementoEncontrado = datos.find(elemento => elemento.id === id);
       setinformacion("espera unos segundos")

    

    axios.post("https://ddcd-5.onrender.com/l", elementoEncontrado       
    )
    .then(response => {
      console.log(response.data);
      alert("usuario aceptado")
      setinformacion("fue aceptado")
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
     <p>{setinformacion}</p>
    </>
  );
}

export default Publicacionespendientes;
