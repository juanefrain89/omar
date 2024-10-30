import axios from "axios";
import { useState, useEffect, createContext } from "react";
import { Outlet } from "react-router-dom"; // Importa Outlet para rutas anidadas

export const Contexto = createContext();

const General = () => {
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("https://ddcd-5.onrender.com")
            .then(response => {
                setDatos(response.data);
                console.log(response.data , "aqui es general");
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const [pendientes, setpendientes] = useState();

    useEffect(() => {
        axios.get("https://ddcd-5.onrender.com/mostrar")
            .then(response => {
                setpendientes(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    

    return (
        <Contexto.Provider value={{ datos, pendientes }}>
            <Outlet /> 
        </Contexto.Provider>
    );
};

export default General;
