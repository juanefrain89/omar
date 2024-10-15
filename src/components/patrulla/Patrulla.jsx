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
    setSelectedId(id);  
    window.location.href
    alert(`ID de la patrulla seleccionada: ${id}`);  // Muestra un alert con el id (puedes cambiarlo)
  };

  const [x, setX] = useState(false);

  const fun = () => {
    setX(!x);
    const bb = document.querySelector(".absolu");
    const cvb = document.querySelector(".slider2");
    if (x) {
      document.body.style.overflow = "hidden";
      if (bb) bb.style.display = "block";
      if (cvb) cvb.style.display = "block";
    } else {
      document.body.style.overflow = "scroll";
      if (bb) bb.style.display = "none";
      if (cvb) cvb.style.display = "none";
    }
  };
  
  const [ver , setver]=useState(false);

const funcionver=()=>{
  setver(!ver)
  window.scrollTo(0, 0);
 
    document.body.style.overflow = 'hidden'; // Deshabilita el scroll
  
}
const funcionver2=()=>{setver(!ver)
  document.body.style.overflow = 'auto';

}


  return (
    <>
    
     
      {ver == true?( <div className="absolu">
        <button className='salir' onClick={funcionver2}>x</button>
        <div className="contenedoropciones">
          
          <div className="one"><div className="imagen"><img src={diseño} alt="" /></div>
          <div className="carac"><h1>placa : ubx728 </h1> <h1>direccion: monterrey</h1> <h1>unidad : 5656 </h1> <button className='modificar'>modificar</button> </div>
          </div></div>
          </div>):( <Inicio />)}
     
      <button onClick={funcionver}>click</button>
<p>{selectedId}</p>
      <div className="card">
        <center>
          <h1 className='patrullash'>Tus patrullas</h1>
        </center>

        {loading ? (
          <p>Cargando patrullas...</p>
        ) : (
       
         
             

             <div className="padre"> 
              
              {ver == false?( <LoadScript googleMapsApiKey="AIzaSyBT6zx6h6AO_z7D0qHJzql9PvbJ4wDmklc">
                <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10} onClick={funcionver}>
                  
                {markerPositions.map((position, index) => (
          <Marker onClick={funcionver} key={index} position={position} />
        ))}
                </GoogleMap>
              </LoadScript>):('')}
              </div>
             
        )}
      </div>         

      <Piepag />
    </>
  );
};

export default Pattrulla;