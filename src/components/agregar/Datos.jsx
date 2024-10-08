import { useEffect, useState } from "react";
import "./datos.css";
import axios from "axios";
import Inicio from "../inicio/Inicio";

const Datos = () => {
    const [estado, setEstado] = useState({
        numero: "",
        precio: "",
        correo: "",
        metros: "",
        baños: "",
        direccion: "",
        descripcion: "",
        cuartos: "",
        imagen: null // Cambiado a null para manejar archivos
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setEstado((prevEstado) => ({
            ...prevEstado,
            imagen: file,
        }));
    };

    useEffect(() => {
        const roo = document.querySelector("#root");
        roo.style.backgroundColor = "#f2f2f2";
    }, []);

    const [cv, cc] = useState({});
    const [visible, setVisible] = useState(false);

    const fun = (e) => {
        e.preventDefault();
        setEstado({
            ...estado,
            [e.target.name]: e.target.value 
        });
        console.log(estado);
    };

    const mandar = () => {
        const userConfirmed = window.confirm("¿Deseas mandar nuevo registro?");
        if (userConfirmed) {
            const formData = new FormData();
            for (const key in estado) {
                formData.append(key, estado[key]);
            }

            axios.post("https://inmueblesnode-2.onrender.com/l", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then((res) => {
                console.log(res.data);
                cc(res.data);
                console.log("Registro enviado");
            })
            .catch((err) => {
                console.log(err);
            });





            
        }
    };

    return (
        <>
            <Inicio />
            <div className="fa">
                <div className="faa">
                    <div className="conu">
                        <h1>placa</h1>
                        <input name="numero" onChange={fun} className="esado" type="number" />
                     
                        <h1>Direccion</h1>
                        <input onChange={fun} name="direccion" className="esado" type="text" />
                    </div>
                    <div className="conu">
                        <h1>ubicacion</h1>
                        <input name="correo" onChange={fun} className="esado" type="email" />
                        <h1>numero de unidad</h1>
                        <input name="baños" className="esado" onChange={fun} type="number" />
                       
                    </div>
                    <div className="conu">
                        <h1>referencias</h1>
                        <input onChange={fun} name="metros" className="esado" type="text" />
                        <h1>Imagenes</h1>
                        <input type="file" onChange={handleImageChange} name="imagen" />
                    </div>
                    <div className="ff">
                        <h1>Añade una descripcion</h1>
                        <textarea name="descripcion" className="descripcion" onChange={fun} id="tex"></textarea>
                        <button onClick={mandar} className="bon">Enviar</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Datos;