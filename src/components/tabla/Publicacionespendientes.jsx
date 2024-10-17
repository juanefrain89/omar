import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './tabla.css';
import imagen from '../patrulla/diseño.png';

const Publicacionespendientes = () => {
  const [loading, setLoading] = useState(true);
  const [mandar, setmandar] = useState([]);
  const [datos, setDatos] = useState([ 
  ]);


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

  
  const handleImageChange = (id, event) => {
    const newDatos = datos.map(item => {
      if (item.id === id) {
        return { ...item, selectedImage: event.target.files[0] }; // Guarda el archivo de imagen
      }
      return item;
    });
    setDatos(newDatos);
  };

  const aceptado = (id) => {
    const elementoEncontrado = datos.find(elemento => elemento.id === id);
    const formData = new FormData();
    formData.append('placa', elementoEncontrado.placa);
    formData.append('latitud', elementoEncontrado.latitud);
    formData.append('longitud', elementoEncontrado.longitud);
    formData.append('contacto', elementoEncontrado.contacto);
    formData.append('operacion', 2); // Se añade la operación

    if (elementoEncontrado.selectedImage) {
      formData.append('imagen', elementoEncontrado.selectedImage); // Envía el archivo de imagen
    }

    axios.post("https://ddcd-5.onrender.com/l", formData   , {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error); // Muestra cualquier error
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
              <td className="clase">{item.placa}</td>
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
