import './App.css'
import {Link, Outlet} from "react-router-dom";
import {useEffect, useState} from "react";
import { useAuth } from "./auth/AuthContext.jsx";

function App() {
    const { hayUsuario, logout } = useAuth()

    return (
        <div className={'w-full min-h-screen flex flex-row justify-start '}>

            <aside className={'w-80 bg-red-400 flex gap-3 p-3 flex-col'}>
                <Link to="/" className={'border-2 bg-blue-400 p-2 w-full text-center'}>Panel de control</Link>
                <Link to="/campaigns" className={'border-2 bg-blue-400 p-2 w-full text-center'}>Campaña</Link>
                {!hayUsuario ?
                    <Link to="/login" className={'border-2 bg-blue-400 p-2 w-full text-center'}>Iniciar sesión
                    </Link>
                    :
                    <button onClick={() => {
                        if (confirm("¿Quieres cerrar sesión?")){
                            logout()
                        }
                    }} className={'mt-auto bg-black'}>Cerrar sesión</button>
                }
            </aside>

            <main className={'flex flex-1 justify-center items-center'}>
                <Outlet/>
            </main>
        </div>


    )
}

export default App
