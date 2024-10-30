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
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { Contexto } from '../../General';
const Pattrulla = () => {
  const  token = localStorage.getItem('token')
const date = useContext(Contexto)
console.log(date.datos);

  const [selectedId, setSelectedId] = useState(null);
  const [datos, setDatos] = useState([]);
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
    console.log(id);
    
    const userConfirmed = window.confirm("¿ver patrulla con id: "+ id+ " ?");
   
   
   
    if (userConfirmed) {
    const elementoEncontrado = datos.find(elemento => elemento.id === id);
  
  if (elementoEncontrado) {
    setarray(elementoEncontrado);  
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
    axios.get("https://ddcd-5.onrender.com")
      .then(e => {
        console.log(e.data);
        
        setDatos(e.data);
        setLoading(false);
        console.log(e.data);
        
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
              <div className="imagen"><img src={nuevoarray.imagen} alt="Diseño" /></div>
              <div className="carac">
              <div className="div">  <h1>Placa: </h1> <p>ubx728</p> </div>   
                <div className="div">  <h1>Dirección: {nuevoarray.unidad}</h1> <p>monterrey</p> </div>               
                <div className="div">  <h1>Unidad: </h1>  <p>{nuevoarray.latitud}</p> </div>   
               
                <div className="div"> <h1>contacto: </h1> <p>{nuevoarray.contacto}</p>   </div>   
                               
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
                <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
                  {datos.map((position, index) => (
               
                    <Marker
                      onClick={() => funcionver(position.id)}  
                      key={index}
                      position={{ lat: parseFloat(position.latitud.trim()), lng: parseFloat(position.longitud.trim()) }}
                    />
                  ))}
                </GoogleMap>
              </LoadScript>
            )}
          </div>
          <div className="vbn">
                  </div>
             </div>
           
           <ul>
            {date.datos.map((item)=>{
              return(
<li>{item.title}</li>
              )
            })}
           </ul>
      <Piepag />
    </>
  );
};

export default Pattrulla;
