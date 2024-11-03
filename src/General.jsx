import axios from "axios";
import { useState, useEffect, createContext } from "react";
import { Outlet } from "react-router-dom";

export const Contexto = createContext();

const General = () => {
    const [datos, setDatos] = useState([]);
    const [pendientes, setPendientes] = useState([]);
    const [loading, setLoading] = useState(true);

    // Carga inicial de `datos`
    useEffect(() => {
        axios.get("https://ddcd.vercel.app")
            .then(response => {
                setDatos(response.data);
                console.log(response.data, "aquí es general");
            })
            .catch(error => {
                console.error("Error al cargar datos:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    // Función para actualizar `pendientes`
    const fetchPendientes = () => {
        axios.get("https://ddcd.vercel.app/mostrar")
            .then(response => {
                setPendientes(response.data);
            })
            .catch(error => {
                console.error("Error al cargar pendientes:", error);
            });
    };

    // Carga inicial de `pendientes`
    useEffect(() => {
        fetchPendientes();
    }, []);

    return (
        <Contexto.Provider value={{ datos, pendientes, fetchPendientes }}>
            <Outlet /> 
        </Contexto.Provider>
    );
};

export default General;
