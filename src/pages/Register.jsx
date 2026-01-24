import {useState} from "react";
import {Link,useNavigate} from "react-router-dom";
import {useAuth} from "../auth/AuthContext.jsx";

export default function Register() {
    const {login} = useAuth();
    const navigate = useNavigate();
    const [registroCompletado, setRegistroCompletado] = useState(false)

    const [usuario, setUsuario] = useState("")
    const [correo, setCorreo] = useState("")
    const [contrasena, setContrasena] = useState("")
    const valido = contrasena.length >= 6


    const manejarSubmit = (e) => {
        e.preventDefault();
        setRegistroCompletado(true)
        login();
        navigate("/")
    }

    return (
        <div className={'min-h-screen justify-center gap-8 flex flex-col w-full'}>
            <h1 className={'text-center'}>Registrarse</h1>
            {!registroCompletado ?
                <form className={'flex flex-col w-full items-center justify-center'} onSubmit={manejarSubmit}>
                    <label>Usuario</label>
                    <input type={'text'} required={true} className={'border-2'} value={usuario}
                           onChange={(e) => {
                               setUsuario(e.target.value)
                           }}/>
                    <label>Correo electrónico</label>
                    <input type={'email'} required={true} className={'border-2'} value={correo}
                           onChange={(e) => {
                               setCorreo(e.target.value)
                           }}
                    />
                    <label>Contraseña</label>
                    <input type={'password'} required={true} className={'border-2'} value={contrasena}
                           onChange={(e) => {
                               setContrasena(e.target.value)
                           }}
                    />
                    <div className={'w-full justify-center items-center flex flex-col pt-4 gap-3'}>
                        <button type={'submit'}
                                className={!valido ? "text-red-800 opacity-50" : "text-gray-400"}
                                disabled={!valido}>
                            Registrarse
                        </button>
                        <Link to={"/login"}>Iniciar sesión</Link>
                    </div>

                </form>
                :
                <>
                    <p>Cuenta creada correctamente</p>
                    <Link to={"/login"}>Iniciar sesión</Link>
                </>

            }

        </div>
    )

}