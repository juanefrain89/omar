import { useEffect, useState } from "react";
import "./datos.css";
import axios from "axios";
import Inicio from "../inicio/Inicio";
import { Navigate } from "react-router-dom";

// Función para cargar el script de Google Maps
function loadGoogleMapsScript() {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBT6zx6h6AO_z7D0qHJzql9PvbJ4wDmklc&callback=initMap`;
        script.async = true;
        script.defer = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

const Datos = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        return <Navigate to="/" />;
    }

    const [userLocation, setUserLocation] = useState(null);
    const [geoError, setGeoError] = useState(null);
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);

    const [estado, setEstado] = useState({
        placa: "",
        ubicacion: "",
        unidad: "",
        referencias: "",
        direccion: "",
        numero: "",
        contacto: "",
        latitud: "",
        longitud: "",
        imagen: null,
    });

    useEffect(() => {
        // Obtener la ubicación real del usuario y cargar el script de Google Maps
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLatLng = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    setUserLocation(userLatLng);
                    setEstado((prevEstado) => ({
                        ...prevEstado,
                        latitud: `${userLatLng.lat}`,
                        longitud: `${userLatLng.lng}`,
                    }));
                    console.log("Latitud:", userLatLng.lat, "Longitud:", userLatLng.lng);

                    if (!isScriptLoaded) {
                        loadGoogleMapsScript()
                            .then(() => {
                                setIsScriptLoaded(true);
                                initMap(userLatLng);
                                findNearbyRestaurants(userLatLng);
                            })
                            .catch((error) => {
                                console.error("Error al cargar el script de Google Maps:", error);
                            });
                    } else {
                        initMap(userLatLng);
                        findNearbyRestaurants(userLatLng);
                    }
                },
                (error) => {
                    console.error("Error al obtener la ubicación del usuario:", error);
                    setGeoError(error.message);
                }
            );
        } else {
            console.error("Geolocalización no está soportada por este navegador.");
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
            [e.target.name]: e.target.value,
        });
        console.log(estado.placa);
    };

    const [p, pp] = useState("");

    useEffect(() => {
        const confirmacion = document.querySelector(".confirmacion");
        if (p.length < 1) {
            confirmacion.style.position = "absolute";
        } else {
            confirmacion.style.position = "relative";
        }
    }, [p]);

    const mandar = () => {
        console.log(estado);
        const userConfirmed = window.confirm("¿Deseas mandar nuevo registro?");

        if (userConfirmed) {
            const formData = new FormData();
            for (const key in estado) {
                formData.append(key, estado[key]);
            }

            axios
                .post("https://ddcd-5.onrender.com/pendientespost", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((res) => {
                    console.log(res.data);
                    console.log("Registro enviado");
                    console.log("ID del nuevo registro:", res.data.id);
                    pp(`Nuevo registro insertado con ID: ${res.data.id}`);
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
                        <input name="ubicacion" value={estado.latitud} onChange={fun} className="esado" type="text" />
                        <h1>Número de Unidad</h1>
                        <input name="unidad" className="esado" onChange={fun} type="number" />
                    </div>
                    <div className="conu">
                        <h1>Referencias</h1>
                        <input onChange={fun} name="referencias" className="esado" type="text" />
                        <h1>Imágenes</h1>
                        <input type="file" onChange={handleImageChange} name="imagen" />
                    </div>
                    <div className="ff">
                        <p className="confirmacion">{p}</p>
                        <button onClick={mandar} className="bon">
                            Enviar
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Datos;
