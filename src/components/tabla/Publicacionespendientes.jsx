import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './tabla.css';
import imagen from '../patrulla/diseño.png';
import { useContext } from 'react';
import { Contexto } from '../../General';
const Publicacionespendientes = () => {
  const [loading, setLoading] = useState(true);
  const [mandar, setmandar] = useState([]);
  const [datos, setDatos] = useState([]);
const contexto = useContext(Contexto)

useEffect(() => {
  setDatos(contexto.pendiente);
}, [contexto.pendiente]); 


const [informacion , setinformacion]=useState("")

  const aceptado = (id) => {
    alert("usuario aceptado espere unos segundos")
    setinformacion("espera unos segundos")
    const elementoEncontrado = datos.find(elemento => elemento.id === id);
       

    

    axios.post("https://ddcd-5.onrender.com/l", elementoEncontrado       
    )
    .then(response => {
setinformacion(response.data);
window.location.href ="https://omar-d35h.vercel.app"


    })
    .catch(error => {
      setinformacion("hubo un error intentan de nuevo porfavor ")
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
   <p>{informacion}</p>
    </>
  );
}

export default Publicacionespendientes;
