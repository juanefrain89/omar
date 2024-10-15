import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Inicio from "../inicio/Inicio";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import "./patrulla.css";
import axios from 'axios';
import pa from "./diseño.png";
import Piepag from './pie/Piepag';
import diseño from './diseño.png'
const Pattrulla = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [datos, setDatos] = useState([5,5]);
  const [loading, setLoading] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState(null); 
  const [ver, setVer] = useState(false);
  const [pm, setPm] = useState(null); 

  const markerPositions = [
    { lat: 19.432608, lng: -99.133209 },
    { lat: 19.702556, lng: -101.192376 },
    { lat: 20.659698, lng: -103.349609 }, 
    { lat: 25.686614, lng: -100.316113 }, 
    { lat: 25.683339, lng: -100.306771 }  
  ];
const [nuevoarray, setarray]=useState([]);
  const funcionver = (id) => {
    const elementoEncontrado = datos.find(elemento => elemento.id === id);
  
  if (elementoEncontrado) {
    setarray(elementoEncontrado);  // Si se encuentra el elemento, lo asignamos
  }
   
    setPm(id); 
    setVer(!ver);
    window.scrollTo(0, 0);  
    document.body.style.overflow = 'hidden'; 
  };

  const funcionver2 = () => {
    setVer(!ver);  
    document.body.style.overflow = 'auto'; 
  };

  useEffect(() => {
    axios.get("https://ddcd-5.onrender.com")
      .then(e => {
        setDatos(e.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const containerStyle = {
    width: '100%',
    height: '400px'
  };

  const center = {
    lat: 19.4326,
    lng: -99.1332
  };

  return (
    <>
      {ver ? (
        <div className="absolu">
          <button className='salir' onClick={funcionver2}>x</button>
          <div className="contenedoropciones">
            <div className="one">
              <div className="imagen"><img src={diseño} alt="Diseño" /></div>
              <div className="carac">
                <h1>Placa: ubx728</h1>
                <h1>Dirección: Monterrey</h1>                
                <h1>Unidad: 5656</h1> 
                <button className='modificar'>Modificar</button>
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

        {loading ? (
          <p>Cargando patrullas...</p>
        ) : (
          <div className="padre">
            {ver === false && (
              <LoadScript googleMapsApiKey="AIzaSyBT6zx6h6AO_z7D0qHJzql9PvbJ4wDmklc">
                <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
                  {datos.map((position, index) => (
                    <Marker
                      onClick={() => funcionver(position.id)}  
                      key={index}
                      position={{ lat: position.latitud, lng: position.longitud }}
                    />
                  ))}
                </GoogleMap>
              </LoadScript>
            )}
          </div>
        )}
      </div>

      <Piepag />
    </>
  );
};

export default Pattrulla;
