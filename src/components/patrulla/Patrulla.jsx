import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Inicio from "../inicio/Inicio";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import "./patrulla.css";
import axios from 'axios';
import pa from "./diseño.png";
import Piepag from './pie/Piepag';

const Pattrulla = () => {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState(null); 

  useEffect(() => {
    axios.get("https://ddcd-5.onrender.com")
      .then(e => {
        setDatos(e.data);
        setLoading(false);
        console.log(e.data);
        
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleIconClick = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

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
      <Inicio />

      <div className="card">
        <center>
          <h1 className='patrullash'>Tus patrullas</h1>
        </center>

        {loading ? (
          <p>Cargando patrullas...</p>
        ) : (
          datos.length > 0 ? datos.map((item, index) => (
            <div key={index} className={`con ${expandedIndex === index ? 'alargar' : ''}`}>
              <div className="opciones">
                <h1 className='h1opcion'>Patrulla {index + 1}</h1>
                
                <FontAwesomeIcon icon={faCaretDown} className='kk' onClick={() => handleIconClick(index)} />
              </div>

              <div className="nn">
                <ul className='ul'>
                  <li>Placa: {item.placa || 'Desconocida'}</li>
                  <li>Ubicación: {item.ubicacion || 'Desconocida'}</li>
                  <li>Unidad: {item.id_usuario || 'Desconocida'}</li>
                </ul>
              </div>
              

              <LoadScript googleMapsApiKey="AIzaSyBT6zx6h6AO_z7D0qHJzql9PvbJ4wDmklc&libraries=places">
                <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
                  <Marker position={center} />
                </GoogleMap>
              </LoadScript>
              <img className='foto' src={item.imagen} alt="" />
            </div>
          )) : (
            <p>No hay patrullas disponibles en este momento.</p>
          )
        )}
      </div>

      {/* Tabla con la lógica para ocultar tr y dejar un solo td */}
      

      <Piepag />
    </>
  );
};

export default Pattrulla;
