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
  const [pm, setPm] = useState(null); // Para almacenar el ID de la patrulla

  const markerPositions = [
    { lat: 19.432608, lng: -99.133209 },
    { lat: 19.702556, lng: -101.192376 },
    { lat: 20.659698, lng: -103.349609 }, // Guadalajara
    { lat: 25.686614, lng: -100.316113 }, // Monterrey
    { lat: 25.683339, lng: -100.306771 }  // Otro marcador en Monterrey
  ];

  const funcionver = (id) => {
    setPm(id); // Almacena el ID del marcador clicado
    setVer(!ver);
    window.scrollTo(0, 0);  // Pone el scroll en la parte superior
    document.body.style.overflow = 'hidden'; // Deshabilita el scroll
  };

  const funcionver2 = () => {
    setVer(!ver);  // Cierra el modal o panel
    document.body.style.overflow = 'auto';  // Rehabilita el scroll
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
                <p>ID: {pm}</p> {/* Muestra el ID del marcador clicado */}
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
                  {markerPositions.map((position, index) => (
                    <Marker
                      onClick={() => funcionver(index)}  // Pasa el ID o índice del marcador
                      key={index}
                      position={{ lat: position.lat, lng: position.lng }}
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
