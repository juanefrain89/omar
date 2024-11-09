import './login.css';
import google from "./google.webp";
import pa from "./pa.png";
import wave from "./wave.png";
import axios from 'axios';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Contexto } from '../../General';
import { useContext } from 'react';

const Login = () => {
    const date = useContext(Contexto);
    console.log(date);
    
    const token = localStorage.getItem('token');
    if (token) {  
        return <Navigate to="/patrullas" />;
    }
    
    const [estado, setEstado] = useState({
        correo: "",
        password: "",
    });

    const [cargando, setCargando] = useState(false);

    const mandar = () => {
        setCargando(true);
        console.log(estado);

        axios.post("https://myapp-neon-theta.vercel.app/login", estado, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((res) => {
            console.log(res.data);
            const { token, rol } = res.data;
            console.log(token);
            localStorage.setItem('token', token);
            localStorage.setItem('rol', rol);
            window.location.href = "https://omar-d35h.vercel.app/patrullas";
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            setCargando(false);
        });
    }

    const fun = (e) => {
        setEstado({
            ...estado,
            [e.target.name]: e.target.value
        });
        console.log(estado);
    }

    return (
        <>
            {cargando ? (
                <center> 
                    <h1 className='cdd'>Cargando...</h1>
                </center>
            ) : (
                <>
                    <center> 
                        <h1 className='cd'>Inicia sesión</h1>
                    </center>
                    <div className="father">
                        <h2>Login</h2>
                        <input 
                            name='correo' 
                            onChange={fun} 
                            type="text" 
                            placeholder='correo' 
                            className="password" 
                        />
                        <input 
                            type="password" 
                            name='password' 
                            onChange={fun} 
                            className="password"  
                            placeholder='password'
                        />
                        <button className='botonlogin' onClick={mandar}> 
                            <center>    
                                Enviar
                            </center>
                        </button>
                        <center> 
                            <Link to='/registro'>
                                NO TIENES CUENTA REGISTRATE AQUÍ
                            </Link>
                            <p className='pmargin'>o inicia con</p>
                        </center>
                        <button className="google-btn">
                            <img 
                                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
                                alt="Google Logo" 
                                className="google-icon" 
                            />
                            Log in with Google
                        </button>
                    </div>
                </>
            )}
        </>
    );
}

export default Login;
