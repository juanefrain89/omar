import axios from "axios";
import { useEffect , useState } from "react";
const Publicacionespendientes = () => {
    const [loading, setLoading] = useState(true);
    const [datos, setDatos] = useState([])
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
    return ( <>
    
    <h1>acepta o rechaza patrullas</h1>
    <table>
        {datos.map((item)=>{
            <tr>
            <td>{item.id}</td>
            <td>{item.placa}</td>           
            <td>{item.ubicacion}</td>
        </tr>
        })}
        
    </table>
    </> );
}
 
export default Publicacionespendientes;