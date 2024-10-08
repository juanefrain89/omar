import { faCaretDown } from '@fortawesome/free-solid-svg-icons';import Inicio from "../inicio/Inicio";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import "./patrulla.css"
import axios from 'axios';
const Pattrulla = () => {

   
    const [expandedIndex, setExpandedIndex] = useState(null);

    const handleIconClick = (index) => {
      setExpandedIndex(expandedIndex === index ? null : index); // Alterna entre expandir y contraer
    };
    const containerStyle = {
        width: '100%',
        height: '400px'  
      };
    const center = {
        lat: 19.4326,  // Latitud inicial (Ciudad de México)
        lng: -99.1332  // Longitud inicial
      };
    return ( 
        <>
        <Inicio></Inicio>

        <div className="card">
            
            <div className="arriba">
                
                <div className="carta"> <p>patrulla</p> </div>
               
              
                <div className="carta"> <p>patrulla</p> </div>
                
                <div className="carta"> <p>patrulla</p> </div>
                
            </div>
           


            {[1, 2, 3, 4].map((item, index) => (
               
<div key={index} className={`con ${expandedIndex === index ? 'alargar' : ''}`}>
    <div className="opciones"> 
    <h1 className='h1opcion'>opcion 1</h1>  <FontAwesomeIcon icon={faCaretDown} className='kk'    onClick={() => handleIconClick(index)}/>
    </div> 

<div className="nn">
    <ul className='ul'>
        <li>el carmen Nl</li>
        <li>8135654041</li>
        <li>lorenzo</li>
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
        
      
     
        </>
     );
}

 
export default Pattrulla;