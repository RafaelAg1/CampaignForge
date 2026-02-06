import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../auth/AuthContext.jsx";
import {UserPlus, User, Mail, Lock} from "lucide-react";

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
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900
            flex items-center justify-center px-4">
            <div className="w-full max-w-md">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Crear cuenta</h1>
                    <p className="text-slate-400">Únete a CampaignForge</p>
                </div>

                {/* Card */}
                <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg shadow-lg p-8">
                    {!registroCompletado ? (
                        <form onSubmit={manejarSubmit} className="space-y-5">

                            {/* Usuario */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Usuario
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                    <input
                                        type="text"
                                        required
                                        value={usuario}
                                        onChange={(e) => setUsuario(e.target.value)}
                                        placeholder="Tu nombre de usuario"
                                        className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-600
                                            rounded-lg text-slate-100 placeholder:text-slate-500
                                            focus:outline-none focus:ring-2 focus:ring-blue-500
                                            focus:border-transparent transition"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Correo electrónico
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                    <input
                                        type="email"
                                        required
                                        value={correo}
                                        onChange={(e) => setCorreo(e.target.value)}
                                        placeholder="tunombre@gmail.com"
                                        className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-600
                                            rounded-lg text-slate-100 placeholder:text-slate-500
                                            focus:outline-none focus:ring-2 focus:ring-blue-500
                                            focus:border-transparent transition"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Contraseña
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                    <input
                                        type="password"
                                        required
                                        value={contrasena}
                                        onChange={(e) => setContrasena(e.target.value)}
                                        placeholder="Mínimo 6 caracteres"
                                        className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-600
                                            rounded-lg text-slate-100 placeholder:text-slate-500
                                            focus:outline-none focus:ring-2 focus:ring-blue-500
                                            focus:border-transparent transition"
                                    />
                                </div>
                                {contrasena && !valido && (
                                    <p className="text-red-400 text-xs mt-2">
                                        La contraseña debe tener al menos 6 caracteres
                                    </p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={!valido}
                                className={`w-full py-3 font-medium rounded-lg transition shadow-lg
                                    flex items-center justify-center gap-2
                                    ${valido
                                    ? 'bg-blue-800 text-white hover:bg-blue-700 '
                                    : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                }`}
                            >
                                <UserPlus className="w-5 h-5" />
                                Crear cuenta
                            </button>

                            {/* Login Link */}
                            <div className="text-center pt-4 border-t border-slate-700">
                                <p className="text-slate-400 text-sm">
                                    ¿Ya tienes cuenta?{' '}
                                    <Link
                                        to="/login"
                                        className="text-blue-400 hover:text-blue-300 font-medium transition"
                                    >
                                        Inicia sesión
                                    </Link>
                                </p>
                            </div>
                        </form>
                    ) : (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center
                                justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <p className="text-xl font-semibold text-white mb-2">¡Cuenta creada!</p>
                            <p className="text-slate-400">Redirigiendo al inicio...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}