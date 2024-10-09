import React from 'react';
import  "./pie.css"

const Piepag = () => {
    return ( 
        <>
        <footer className="footer">
        <div className="contain">
            <div className="footer-row">
                <div className="footer-links">
                    <center> 
                    <h4>Compañía</h4>
                   
                    <ul>
                        <li><a href="#">Nosotros</a></li>
                        <li><a href="#">Nuestros servicios</a></li>
                        <li><a href="#">Política de privacidad</a></li>
                    </ul>
                    </center>
                </div>
                <div className="footer-links">
                    <center> 
                    <h4>Ayuda</h4>
                    
                    <ul>
                        <li><a href="#">Preguntas</a></li>
                        <li><a href="#">Estatus de citas</a></li>
                        <li><a href="#">Pagos</a></li>
                    </ul>
                    </center>
                </div>
                <div className="footer-links">
                   <center> 
                    <h4>contacto</h4>
                   
                    <ul>
                        <li><a href="#">8116864045</a></li>
                        
                    </ul>
                    </center>
                  
                </div>
           
            </div>
        </div>

</footer>
        </>
     );
}
 
export default Piepag;