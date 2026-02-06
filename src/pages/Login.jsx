import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../auth/AuthContext.jsx"
import {LogIn, Mail, Lock} from "lucide-react";

export default function Login() {
    const [sesionIniciada, setSesionIniciada] = useState(false)
    const {login} = useAuth();
    const navigate = useNavigate();

    const manejarSubmit = (e) => {
        e.preventDefault();
        setSesionIniciada(true)
        login();
        navigate("/")
    }

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900
            flex items-center justify-center px-4">
            <div className="w-full max-w-md">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Bienvenido</h1>
                    <p className="text-slate-400">Inicia sesión en tu cuenta</p>
                </div>

                <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg shadow-lg p-8">
                    {!sesionIniciada ? (
                        <form onSubmit={manejarSubmit} className="space-y-6">

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Correo electrónico
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500"/>
                                    <input
                                        type="email"
                                        required
                                        placeholder="tu@email.com"
                                        className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-600
                                            rounded-lg text-slate-100 placeholder:text-slate-500
                                            focus:outline-none focus:ring-2 focus:ring-blue-500
                                            focus:border-transparent transition"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Contraseña
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500"/>
                                    <input
                                        type="password"
                                        required
                                        placeholder="••••••••"
                                        className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-600
                                            rounded-lg text-slate-100 placeholder:text-slate-500
                                            focus:outline-none focus:ring-2 focus:ring-blue-500
                                            focus:border-transparent transition"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 bg-blue-800 text-white font-medium rounded-lg
                                    hover:bg-blue-700 transition shadow-lg
                                    flex items-center justify-center gap-2"
                            >
                                <LogIn className="w-5 h-5"/>
                                Iniciar sesión
                            </button>

                            <div className="text-center pt-4 border-t border-slate-700">
                                <p className="text-slate-400 text-sm">
                                    ¿No tienes cuenta?{' '}
                                    <Link
                                        to="/register"
                                        className="text-blue-400 hover:text-blue-300 font-medium transition"
                                    >
                                        Regístrate aquí
                                    </Link>
                                </p>
                            </div>
                        </form>
                    ) : (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center
                                justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M5 13l4 4L19 7"/>
                                </svg>
                            </div>
                            <p className="text-xl font-semibold text-white">¡Sesión iniciada!</p>
                            <p className="text-slate-400 mt-2">Redirigiendo...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}