import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {ArrowLeft} from "lucide-react";

export default function CharacterForm({ onSubmit, submitLabel = "Guardar" }) {
    const navigate = useNavigate();
    const location = useLocation();

    const [formulario, setFormulario] = useState({
        nombre: "",
        edad: "",
        raza: "",
        clase: "",
        nivel: 1,
        descripcion: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormulario((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formulario);
    };

    const volver = () => {
        const base = location.pathname.replace(/\/create$/, "");
        navigate(base || "/");
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4">
            <div className="mx-auto max-w-4xl">

                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <button
                        type="button"
                        onClick={volver}
                        className="flex items-center gap-2 px-3 py-2 bg-slate-800 border border-slate-700
                            text-slate-300 text-sm font-medium rounded-md hover:bg-slate-700 transition"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Volver
                    </button>

                    <h1 className="text-2xl font-bold text-white">Nuevo Personaje</h1>
                </div>

                {/* Form Card */}
                <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg shadow-lg p-8">
                    <form onSubmit={handleSubmit}>

                        <div className="mb-6">
                            <p className="text-slate-400 text-sm">
                                Completa los datos básicos de tu personaje
                            </p>
                        </div>

                        {/* Grid de campos */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                            {/* Nombre */}
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Nombre del personaje <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="nombre"
                                    value={formulario.nombre}
                                    onChange={handleChange}
                                    required
                                    placeholder="Ej: Raven"
                                    className="w-full border border-slate-600 bg-slate-900/50 rounded-lg px-4 py-3
                                        text-slate-100 placeholder:text-slate-500
                                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                />
                            </div>

                            {/* Raza */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Raza
                                </label>
                                <input
                                    type="text"
                                    name="raza"
                                    value={formulario.raza}
                                    onChange={handleChange}
                                    placeholder="Ej: Elfo"
                                    className="w-full border border-slate-600 bg-slate-900/50 rounded-lg px-4 py-3
                                        text-slate-100 placeholder:text-slate-500
                                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                />
                            </div>

                            {/* Clase */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Clase
                                </label>
                                <input
                                    type="text"
                                    name="clase"
                                    value={formulario.clase}
                                    onChange={handleChange}
                                    placeholder="Ej: Pícaro"
                                    className="w-full border border-slate-600 bg-slate-900/50 rounded-lg px-4 py-3
                                        text-slate-100 placeholder:text-slate-500
                                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                />
                            </div>

                            {/* Edad */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Edad
                                </label>
                                <input
                                    type="number"
                                    name="edad"
                                    min="0"
                                    value={formulario.edad}
                                    onChange={handleChange}
                                    placeholder="Ej: 24"
                                    className="w-full border border-slate-600 bg-slate-900/50 rounded-lg px-4 py-3
                                        text-slate-100 placeholder:text-slate-500
                                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                />
                            </div>

                            {/* Nivel */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Nivel
                                </label>
                                <input
                                    type="number"
                                    name="nivel"
                                    min="1"
                                    max="20"
                                    value={formulario.nivel}
                                    onChange={handleChange}
                                    className="w-full border border-slate-600 bg-slate-900/50 rounded-lg px-4 py-3
                                        text-slate-100
                                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                />
                            </div>

                            {/* Descripción */}
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Descripción
                                </label>
                                <textarea
                                    name="descripcion"
                                    value={formulario.descripcion}
                                    onChange={handleChange}
                                    rows={5}
                                    placeholder="Historia, personalidad, rasgos físicos, objetivos..."
                                    className="w-full border border-slate-600 bg-slate-900/50 rounded-lg px-4 py-3
                                        text-slate-100 placeholder:text-slate-500
                                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                        transition resize-none"
                                />
                            </div>
                        </div>

                        {/* Botones */}
                        <div className="mt-8 flex flex-col-reverse sm:flex-row gap-3 sm:justify-between">
                            <button
                                type="button"
                                onClick={() => setFormulario({
                                    nombre: "",
                                    edad: "",
                                    raza: "",
                                    clase: "",
                                    nivel: 1,
                                    descripcion: ""
                                })}
                                className="px-4 py-2 bg-slate-700 border border-slate-600 text-slate-300
                                    rounded-md hover:bg-slate-600 transition text-sm font-medium"
                            >
                                Limpiar formulario
                            </button>

                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-800 text-white font-medium rounded-md
                                     transition shadow-lg"
                            >
                                {submitLabel}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Hint */}
                <p className="mt-4 text-center text-sm text-slate-500">
                    Tip: Solo el nombre es obligatorio. Puedes completar el resto después.
                </p>
            </div>
        </div>
    );
}