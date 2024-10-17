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
      console.log(datos);
        
    return ( <>
    
    <h1>acepta o rechaza patrullas</h1>
    <div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ut dignissimos atque id eius error maiores eos, dolorem repudiandae, at quasi voluptate dolore, esse iusto vel officiis quos sapiente obcaecati.</p>
        {datos.map((item)=>{
            <div className="padreee"> 
           <p>hpokpko {item.id}</p>      
            <p>{item.placa}</p>           
            <p>{item.ubicacion}</p>
            </div>
      
        })}
        
    </div>
    </> );
}
 
export default Publicacionespendientes;