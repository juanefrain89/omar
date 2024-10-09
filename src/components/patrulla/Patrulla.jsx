import { faCaretDown } from '@fortawesome/free-solid-svg-icons';import Inicio from "../inicio/Inicio";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import "./patrulla.css"
import axios from 'axios';
import pa from "./diseño.png"
import Piepag from './pie/Piepag';
const Pattrulla = () => {

    const [datos, setdatos]=useState([])
    useEffect(()=>{
        axios.get("http://localhost:4200")
        .then(e =>{
    setdatos(e.data)
console.log(datos);
console.log(e.data);
        }).catch(error =>{
            console.log(error);           
        })
       
    },[])

  
  
    const [expandedIndex, setExpandedIndex] = useState(null);

    const handleIconClick = (index) => {
      setExpandedIndex(expandedIndex === index ? null : index); // Alterna entre expandir y contraer
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
        <Inicio></Inicio>
<div className="padre"> 

<div className="izquierda"></div>a
        <div className="card">
            <center> 
            <h1 className='patrullash'>tus patrullas</h1>
           
            </center>

            {[1,2,3].map((item, index) => (
               
<div key={index} className={`con ${expandedIndex === index ? 'alargar' : ''}`}>
    <div className="opciones"> 
    <h1 className='h1opcion'>patrulla {index+1}</h1> <FontAwesomeIcon icon={faCaretDown} className='kk'    onClick={() => handleIconClick(index)}/>
    </div> 

<div className="nn">
    <ul className='ul'>
        <li>placa :{item.placa}</li>
        <li>ubicacion: {item.ubicacion}</li>
        <li>unidad: {item.id_usuario}</li>
    </ul>
</div>

    <LoadScript
      googleMapsApiKey="AIzaSyBT6zx6h6AO_z7D0qHJzql9PvbJ4wDmklc&libraries=places"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
</div>
            ))}


        </div>
        </div>
    
      <Piepag></Piepag>
     
        </>
     );
}

 
export default Pattrulla;