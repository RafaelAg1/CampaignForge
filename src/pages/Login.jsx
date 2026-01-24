import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../auth/AuthContext.jsx"
export default function Login() {

    const [sesionIniciada, setSesionIniciada] = useState(false)
    const {login} = useAuth();
    const navigate = useNavigate();

    const manejarSubmit = (e) =>{
        e.preventDefault();
        setSesionIniciada(true)
        login();
        navigate("/")
    }
    return (
        <div className={'min-h-screen justify-center gap-8 flex flex-col w-full'}>
            <h1 className={'text-center'}>Inicio de sesión</h1>
            {!sesionIniciada ?
                <form className={'flex flex-col w-full items-center justify-center'} onSubmit={manejarSubmit}>
                    <label>Correo</label>
                    <input type={'email'} className={'border-2'} required={true}/>
                    <label>Contraseña</label>
                    <input type={'password'} className={'border-2'} required={true}/>
                    <div className={'pt-4 gap-3 flex-col justify-center items-center flex'}>
                        <button type={'submit'} className={'w-full'}>Iniciar sesión</button>
                        <Link to={"/register"} className={'text-center w-full'}>Registrarse</Link>
                    </div>


                </form>
                :
                <p>SESION INICIADA</p>
            }

        </div>
    )
}