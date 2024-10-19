
const Registro = () => {
    const [estado, setEstado] = useState({
        correo: "",
        password: "",
        confirmacion: '',
        rol: 'usuario'
    })

    // Función para enviar el formulario
    const mandar = (e) => {
        e.preventDefault(); // Evita que el formulario se recargue

        console.log("Estado enviado:", estado); // El estado ya se ha actualizado aquí

        axios.post("https://ddcd-5.onrender.com/registro", estado, {
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
    }

    const fun = (e) => {
        const { name, value } = e.target;
        // Actualiza el estado correctamente sin depender de valores anteriores
        setEstado((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    return (  
        <>
        <center> 
            <h1 className='cd'>Inicia Sesión</h1>
        </center>
        
        <div className="father">
            <h2>Registro</h2>
            <form onSubmit={mandar}>
<div className="father">
                <input 
                    name='correo' 
                    onChange={fun} 
                    type="text" 
                    placeholder='Correo' 
                    className="password" 

                />
                <input 
                    type="password" 
                    name='password' 
                    onChange={fun} 
                    className="password"  
                    placeholder='Password'
                />
                <input 
                    type="password" 
                    onChange={fun} 
                    placeholder='Confirmar contraseña' 
                    name='confirmacion' 
                />
                <button className='botonlogin' type="submit"> 
                    Enviar         
                </button>
</div>      
            </form>
        </div>
        </>
    );
}

export default Registro;
