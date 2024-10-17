import axios from "axios";
import './tabla.css'
import { useEffect , useState } from "react";
const Publicacionespendientes = () => {
    const [loading, setLoading] = useState(true);
    const [mandar, setmandar ]= useState([])
    const [datos, setDatos] = useState([ {id:39,
        placa:'jkhr56',
        latitud:25.68333908659982,
        longitud:-100.30677181798846,
        imagen :'.shkssj',
        contacto: 8135654041}])
    useEffect(() => {
        axios.get("https://ddcd-5.onrender.com")
          .then(e => {
            setDatos(e.data);
            console.log(e.data);            
            setLoading(false);
          })
          .catch(error => {
            console.log(error);

            setLoading(false);
          });
      }, []); 
      
      

      const aceptado = (id)=>{
        const elementoEncontrado = datos.find(elemento => elemento.id === id);

        axios.post("http://localhost:4200//l", {elemento: elementoEncontrado, operacion: 2 }) 
            .then(e => {
            setDatos(e.data);
            console.log(e.data);            
            setLoading(false);
          })
          .catch(error => {
            console.log(error);

            setLoading(false);
          });
        }



      console.log(datos);
        
    return ( <>
    
    <h1>acepta o rechaza patrullas</h1>
   
      <table>  
    {datos.map((item, index)=>{
    return(
       <tr key={index}>
        <td className="clase">{item.id}</td>
        <td className="clase">{item.placa}</td>
        <td className="clase">{item.imagen}</td>
        <td className="clase clasedos"><button className="botoncienaceptar">rechazar</button> <button className="botonrechazar"  onClick={() => aceptado(item.id)}   >aceptar</button> </td>
       
       </tr>
    )
    
      
        })}
        </table>
        
        </> );
}
 
export default Publicacionespendientes;