import axios from "axios";
import { useEffect , useState } from "react";
const Publicacionespendientes = () => {
    const [loading, setLoading] = useState(true);
    const [datos, setDatos] = useState([5,5])
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
        <td className="clase">id</td>
        <td className="clase">id</td>
       </tr>
    )
    
      
        })}
        </table>
        
        </> );
}
 
export default Publicacionespendientes;