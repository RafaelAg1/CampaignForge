import './App.css'
import {Link, Outlet, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import { useAuth } from "./auth/AuthContext.jsx";
import {Home, BookOpen, LogIn, LogOut} from "lucide-react";

function App() {
    const { hayUsuario, logout } = useAuth()
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <div className="w-full min-h-screen flex bg-slate-950">

            {/* Sidebar */}
            <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col fixed h-screen">

                {/* Header */}
                <div className="p-6">
                    <h1 className="text-base font-bold text-white leading-tight">
                        Campaign<br/>Forge
                    </h1>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 flex flex-col gap-1">
                    <Link
                        to="/"
                        className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition
                            ${isActive('/')
                            ? 'bg-slate-800 text-white'
                            : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                        }`}
                    >
                        <Home className="w-4 h-4" />
                        Panel de control
                    </Link>

                    <Link
                        to="/campaigns"
                        className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition
                            ${isActive('/campaigns')
                            ? 'bg-slate-800 text-white'
                            : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                        }`}
                    >
                        <BookOpen className="w-4 h-4" />
                        Campañas
                    </Link>
                </nav>

                {/* Auth Section */}
                <div className="p-3 border-t border-slate-800">
                    {!hayUsuario ? (
                        <Link
                            to="/login"
                            className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-600
                                text-white text-sm font-medium rounded-md hover:bg-blue-700 transition"
                        >
                            <LogIn className="w-4 h-4" />
                            Iniciar sesión
                        </Link>
                    ) : (
                        <button
                            onClick={() => {
                                if (confirm("¿Cerrar sesión?")) {
                                    logout()
                                }
                            }}
                            className="w-full flex items-center justify-center gap-2 px-3 py-2
                                bg-slate-700
                                text-slate-400 text-sm font-medium rounded-md hover:bg-slate-800
                                hover:text-slate-200 transition-colors duration-300"
                        >
                            <LogOut className="w-4 h-4" />
                            Cerrar sesión
                        </button>
                    )}
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64">
                <Outlet/>
            </main>
        </div>
    )
}

export default App