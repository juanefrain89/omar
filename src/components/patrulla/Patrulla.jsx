import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Inicio from "../inicio/Inicio";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useEffect, useState, useContext } from 'react';
import "./patrulla.css";
import axios from 'axios';
import pa from "./diseño.png";
import Piepag from './pie/Piepag';
import diseño from './diseño.png';
import { Navigate } from 'react-router-dom';
import { Contexto } from '../../General';

const Pattrulla = () => {
  const token = localStorage.getItem('token');
  const date = useContext(Contexto);
  console.log(date.datos);

  const [selectedId, setSelectedId] = useState(null);
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState(null); 
  const [ver, setVer] = useState(false);
  const [pm, setPm] = useState(null); 
  const [nuevoarray, setarray] = useState([]);

  const sanitizeImageUrl = (url) => {
    const match = url.match(/https:\/\/res\.cloudinary\.com\/[^\s]+/);
    return match ? match[0] : url;
  };

  const funcionver = (id) => {
    console.log(id);
    
    const userConfirmed = window.confirm("¿ver patrulla con id: " + id + " ?");
    if (userConfirmed) {
      const elementoEncontrado = datos.find(elemento => elemento.id === id);
      if (elementoEncontrado) {
        setarray(elementoEncontrado);
        console.log(nuevoarray, "este es nuevo array");
      }
      setPm(id); 
      setVer(!ver);
      window.scrollTo(0, 0);  
      document.body.style.overflow = 'hidden'; 
    }
  };

  const funcionver2 = () => {
    setVer(!ver);  
    document.body.style.overflow = 'auto'; 
  };

  useEffect(() => {
    setDatos(date.datos);
  }, [date.datos]);

  const containerStyle = {
    width: '100%',
    height: '400px'
  };

  const center = {
    lat: 25.700019,
    lng: -100.363112
    };

  return (
    <>
      {ver ? (
        <div className="absolu">
          <button className='salir' onClick={funcionver2}>x</button>
          <div className="contenedoropciones">
            <div className="one">
              <div className="imagen">
                <img src={sanitizeImageUrl(nuevoarray.imagen)} alt="Diseño" />
              </div>
              <div className="carac">
                <div className="div"><h1>Placa: </h1> <p>ubx728</p></div>   
                <div className="div"><h1>Dirección: </h1> <p> {nuevoarray.referencias}</p></div>               
                <div className="div"><h1>Unidad: </h1> <p>{nuevoarray.unidad}</p></div>   
                <div className="div"><h1>contacto: </h1> <p>{nuevoarray.contacto}</p></div>   
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Inicio />
      )}
      <button onClick={() => funcionver(null)}>Click para abrir</button>
      <div className="card">
        <center>
          <h1 className='patrullash'>Tus patrullas</h1>
        </center>
        <div className="padre">
          {ver === false && (
            <LoadScript googleMapsApiKey="AIzaSyBT6zx6h6AO_z7D0qHJzql9PvbJ4wDmklc">
              <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={8}>
                {datos.map((position, index) => (
                  <Marker
                    onClick={() => funcionver(position.id)}  
                    key={index}
                    position={{ lat: parseFloat(position.latitud), lng: parseFloat(position.longitud) }}
                  />
                ))}
              </GoogleMap>
            </LoadScript>
          )}
        </div>
        <div className="vbn"></div>
      </div>
      <ul>
        {date.datos.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
      <Piepag />
    </>
  );
};

export default Pattrulla;
