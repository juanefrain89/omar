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
  const [selectedId, setSelectedId] = useState(null);
  const [datos, setDatos] = useState([5,5]);
  const [loading, setLoading] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState(null); 
  const markerPositions = [
    { lat: 19.432608, lng: -99.133209 },
    { lat: 19.702556, lng: -101.192376 },
    { lat: 20.659698, lng: -103.349609 }, // Guadalajara
    { lat: 25.686614, lng: -100.316113 }, // Monterrey
  ];



const ind=(index)=>{
console.log(index);

}

  useEffect(() => {
    axios.get("https://ddcd-5.onrender.com")
      .then(e => {
        setDatos(e.data);
        setLoading(false);
        console.log(e.data.longitud);        
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
  const handleMarkerClick = (id) => {
    setSelectedId(id);  // Guardamos el id del marker clicado
    alert(`ID de la patrulla seleccionada: ${id}`);  // Muestra un alert con el id (puedes cambiarlo)
  };

  

  return (
    <>
      <Inicio />
<p>{selectedId}</p>
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
              

              <LoadScript googleMapsApiKey="AIzaSyBT6zx6h6AO_z7D0qHJzql9PvbJ4wDmklc">
                <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
                  
                {markerPositions.map((position, index) => (
          <Marker key={index} position={position} onClick={() => handleMarkerClick(item.id)} />
        ))}
                </GoogleMap>
              </LoadScript>
              <img className='foto' src={item.imagen} alt="" />
            </div>
          )) : (
            <p>No hay patrullas disponibles en este momento.</p>
          )
        )}
      </div>         

      <Piepag />
    </>
  );
};

export default Pattrulla;