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
    <div>
        {datos.map((item)=>{
            <div className="padreee"> 
           <p>{item.id}</p>      
            <p>{item.placa}</p>           
            <p>{item.ubicacion}</p>
            </div>
      
        })}
        
    </div>
    </> );
}
 
export default Publicacionespendientes;