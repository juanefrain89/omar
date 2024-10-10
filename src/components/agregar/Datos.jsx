import { useEffect, useState } from "react";
import "./datos.css";
import axios from "axios";
import Inicio from "../inicio/Inicio";

// Función para cargar el script de Google Maps
function loadGoogleMapsScript() {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBT6zx6h6AO_z7D0qHJzql9PvbJ4wDmklc&callback=initMap`;
        script.async = true;
        script.defer = true;
        script.onload = resolve;  // Resuelve la promesa cuando el script se ha cargado
        script.onerror = reject;  // Rechaza la promesa si hay un error al cargar el script
        document.head.appendChild(script);
    });
}

const Datos = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [geoError, setGeoError] = useState(null);
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
    
    const [estado, setEstado] = useState({
        placa: "",
        ubicacion: "", // Aquí almacenaremos la ubicación
        referencias: "",
        direccion: "",
        numero: "",
        contacto: "",
        latitud:"",
        longitud:"",
        imagen: null
        
    });

   

    let latitud=0;
    let longitud 
    useEffect(() => {
        
        // Obtener la ubicación del usuario y cargar el script de Google Maps
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLatLng = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    setUserLocation(userLatLng);
latitud =userLatLng.lat;
                    // Actualizamos el campo 'ubicacion' en el estado con la latitud y longitud
                    
                    setEstado((prevEstado) => ({
                        ...prevEstado,
                        latitud: `${userLatLng.lat}`,
                        longitud:`${userLatLng.lng}`
                    }));
                    console.log(latitud);
                    
                    
                    if (!isScriptLoaded) {
                        // Asegúrate de pasar la API key como parámetro
                        loadGoogleMapsScript('TU_API_KEY')
                            .then(() => {
                                setIsScriptLoaded(true);
                                initMap(userLatLng);
                                findNearbyRestaurants(userLatLng);
                            })
                            .catch((error) => {
                                console.error('Error al cargar el script de Google Maps:', error);
                            });
                    } else {
                        initMap(userLatLng);
                        findNearbyRestaurants(userLatLng);
                    }
                },
                (error) => {
                    console.error('Error al obtener la ubicación del usuario:', error);
                    setGeoError(error.message);
                }
            );
        } else {
            console.error('Geolocalización no está soportada por este navegador.');
        }
    }, [isScriptLoaded]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setEstado((prevEstado) => ({
            ...prevEstado,
            imagen: file,
        }));
    };

    const fun = (e) => {
        e.preventDefault();
        setEstado({
            ...estado,
            [e.target.name]: e.target.value 
        });
    };

    const mandar = () => {
        const userConfirmed = window.confirm("¿Deseas mandar nuevo registro?");
        if (userConfirmed) {
            const formData = new FormData();
            for (const key in estado) {
                formData.append(key, estado[key]);
            }

            axios.post("https://ddcd-5.onrender.com/l", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then((res) => {
                console.log(res.data);
                console.log("Registro enviado");
            })
            .catch((err) => {
                console.log(err);
            });
        }
    };

    return (
        <>
            <Inicio />
            <div className="fa">
                <div className="faa">
                    <div className="conu">
                        <h1>Placa</h1>
                        <input name="placa" onChange={fun} className="esado" type="text" />
                        <h1>Contacto</h1>
                        <input onChange={fun} name="contacto" className="esado" type="text" />
                    </div>
                    <div className="conu">
                        <h1>Ubicación</h1>
                        {/* Muestra la ubicación en el input si está disponible */}
                        <input name="ubicacion" value={estado.latitud} onChange={fun} className="esado" type="text" />
                        <h1>Número de Unidad</h1>
                        <input name="numero" className="esado" onChange={fun} type="number" />
                    </div>
                    <div className="conu">
                        <h1>Referencias</h1>
                        <input onChange={fun} name="referencias" className="esado" type="text" />
                        <h1>Imágenes</h1>
                        <input type="file" onChange={handleImageChange} name="imagen" />
                    </div>
                    <div className="ff">
                        <button onClick={mandar} className="bon">Enviar</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Datos;
