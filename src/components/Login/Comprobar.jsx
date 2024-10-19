import { useContext, useState } from 'react';
import axios from 'axios';

const Comprobar = (props) => {
    // Acceso a correo desde props
    const { correo } = props;
    const [valores, setValores] = useState({
        correo,
        codigo: ''
    });

    console.log(correo);

    // Manejar cambios en el input
    const manejarCambio = (e) => {
        const { value } = e.target;
        setValores((prevValores) => ({
            ...prevValores,
            codigo: value // Actualiza el valor del código basado en la entrada del usuario
        }));
    };

    const mandar = (e) => {
        e.preventDefault();

        axios.post("https://ddcd-5.onrender.com/comprobar", valores, {
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
    };

    return (
        <>
            <form onSubmit={mandar}>
                <input 
                    type="text" 
                    value={valores.codigo} 
                    onChange={manejarCambio} 
                />
                <button className='botonlogin' type="submit"> 
                    Enviar         
                </button>
            </form>
        </>
    );
};

export default Comprobar;
