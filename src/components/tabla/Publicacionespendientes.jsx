import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './tabla.css';
import imagen from '../patrulla/diseño.png';

const Publicacionespendientes = () => {
  const [loading, setLoading] = useState(true);
  const [mandar, setmandar] = useState([]);
  const [datos, setDatos] = useState([
    {
      id: 39,
      placa: 'jkhr56',
      latitud: 25.68333908659982,
      longitud: -100.30677181798846,
      ubicacion: 'ma',
      unidad: '5656',
      referencias: "Nolose",
      imagen: imagen,
      contacto: 8135654041,
      selectedImage: null // Añadido para manejar la imagen seleccionada
    }
  ]);

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

    axios.post("http://localhost:4200/l", {formData : formData, operacion :2}  , {
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
