import axios from 'axios'
import './registro.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
const Registro = () => {
    const [estado, setestado]=useState({
        correo:"",
        password:"",
        confirmacion:'',
        rol:'usuario'
    })


    const mandar =()=>{

    console.log(estado);
    

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


const fun=(e)=>{
    setestado({
        ...estado,
        [e.target.name]:e.target.value
    })
    console.log(estado);}
    return (  
        <>
        <center> 
       <h1 className='cd'>inicia sesion</h1>
       </center>
        
        <div className="father">
            <h2>Login </h2>
           <input name='correo' onChange={fun} type="text" placeholder='correo' className="password" />
           <input type="text" name='password' onChange={fun} className="password"  placeholder='password'/>
           <input type="text" onChange={fun} placeholder='confirmar contraseña' name='confirmacion' />
           <button className='botonlogin' onClick={mandar}> 
         
           enviar
           
           </button>      
        </div>
      
    
        </> 
    );
}
 
export default Registro;