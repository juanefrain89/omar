import Pattrulla from "../patrulla/Patrulla";
import "./inicio.css"

import { Link } from "react-router-dom";
const Inicio = () => {
    return ( <>
       
     <nav className="contenormenu">
            <div className="menustart">
            <Link to="/patrullas">  
               <p>logo</p>
                </Link>               
            </div>
            <div className="menuend">                
                <Link to="/agregar"> <p className="pmenu">agregar </p> </Link>            
              
    <Link to="/pendientes">
        <p className="pmenu">mis publicaciones</p>
    </Link>

            </div>

        </nav>
    
    </> );
}
 
export default Inicio;