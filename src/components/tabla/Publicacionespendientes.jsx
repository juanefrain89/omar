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
   
      
        {datos.map((item)=>{
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta placeat provident consequatur vitae odio perferendis vero expedita. Quia hic optio ea repellendus culpa, nobis a, perspiciatis nisi enim veritatis magni.</p>        
      
        })}
        
        </> );
}
 
export default Publicacionespendientes;