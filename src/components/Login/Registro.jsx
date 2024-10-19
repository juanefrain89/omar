import axios from 'axios';
import './registro.css';
import { useState, createContext, useContext } from 'react';
import Comprobar from './Comprobar';
import { Link, Navigate } from 'react-router-dom';

// Definir y exportar el ThemeContext
export const ThemeContext = createContext(null); // Exportar el contexto

const Registro = (props) => {
    const {add } = props;
    const enviar =()=>{
        add(estado.correo)
        
          }
    const [estado, setEstado] = useState({
        correo: "",
        password: "",
        confirmacion: '',
        rol: 'usuario'
    });
    const [error, setError] = useState(""); // Estado para almacenar el mensaje de error

    // Función para enviar el formulario
    const mandar = (e) => {
        e.preventDefault(); // Evita que el formulario se recargue
       
        // Comprobación de que las contraseñas coinciden
        if (estado.password !== estado.confirmacion) {
            setError("Las contraseñas no coinciden");
            return; // Evitar el envío si no coinciden
        }

        setError(""); // Limpia el mensaje de error si las contraseñas coinciden

        axios.post("https://ddcd-5.onrender.com/registro", estado, {
            headers: {
                "Content-Type": "application/json"
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

    const fun = (e) => {
        const { name, value } = e.target;
        // Actualiza el estado correctamente sin depender de valores anteriores
        setEstado((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    return (  
        
            <>
                <center> 
                    <h1 className='cd'>Inicia Sesión</h1>
                </center>
                
                <div className="father">
                    <h2>Registro</h2>
                    <form onSubmit={mandar}>
                        <div className="father">
                            <input 
                                name='correo' 
                                onChange={fun} 
                                type="text" 
                                placeholder='Correo' 
                                className="password" 
                            />
                            <input 
                                type="password" 
                                name='password' 
                                onChange={fun} 
                                className="password"  
                                placeholder='Password'
                            />
                            <input 
                                type="password" 
                                onChange={fun} 
                                placeholder='Confirmar contraseña' 
                                name='confirmacion' 
                            />
                            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Mensaje de error si las contraseñas no coinciden */}
                            <button className='botonlogin' type="submit"> 
                                Enviar         
                            </button>
                        </div>      
                    </form>
                    <Link to='/comprobar' onClick={enviar}>click</Link>
                
                </div>
               
               
               
            </>
           
    );
}

export default Registro;