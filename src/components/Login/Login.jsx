import './login.css'
import google from "./google.webp"
import pa from "./pa.png"
import wave from "./wave.png"
import axios from 'axios'
import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import Pattrulla from '../patrulla/Patrulla'

const Login = () => {
    const  token = localStorage.getItem('token')
  if (token) {  
    return <Navigate to="/patrullas" />;
  }
    const [estado, setestado]=useState({
        correo:"",
        password:"",
        
    })


    const mandar =()=>{

        console.log(estado);
        
    
        axios.post("https://ddcd-5.onrender.com/login", estado, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((res) => {
            console.log(res.data);
            const {token, rol} =res.data
            console.log(token);
            localStorage.setItem('token', token)
            localStorage.setItem('rol', rol)
            window.location.href ="https://omar-7ebn.onrender.com/patrullas"
           
        })
        .catch((err) => {
            console.log(err);
        });
        }
    

    

const fun=(e)=>{
    setestado({
        ...estado,
        [e.target.name]:e.target.value
    })
    console.log(estado);
    
   

}

    return ( <>
    <center> 
   <h1 className='cd'>inicia sesion</h1>
   </center>
    
    <div className="father">
        <h2>Login </h2>
       <input name='correo' onChange={fun} type="text" placeholder='correo' className="password" />
       <input type="text" name='password' onChange={fun} className="password"  placeholder='password'/>
       <button className='botonlogin' onClick={mandar}> 
     <center>    
       enviar
       </center>
       </button>
       <center> 
        <Link to='/registro'>
        NO TIENES CUENTA REGISTRATE AQUI
        </Link>
       <p className='pmargin'>o inicia con </p>
       </center>
       
       <button className="google-btn">
      
    <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google Logo" class="google-icon" />
    Log in with Google
</button>



    </div>
  

    </> );
}
 
export default Login;