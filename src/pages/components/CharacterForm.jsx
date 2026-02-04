import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
        navigate(base || "/"); // por si acaso
    };

    return (
        <div className="min-h-screen w-full bg-slate-950 text-slate-100">
            <div className="mx-auto max-w-4xl px-4 py-10">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <button
                        type="button"
                        onClick={volver}
                        className="inline-flex items-center gap-2 rounded-lg bg-slate-800/60 px-3 py-2 text-sm font-semibold
                       text-slate-100 ring-1 ring-white/10 backdrop-blur
                       hover:bg-slate-800/80 hover:ring-white/20 transition"
                    >
                        <span className="text-lg leading-none">←</span>
                        Volver
                    </button>

                    <div className="text-right">
                        <p className="text-sm text-slate-400">Personajes</p>
                        <h1 className="text-xl font-bold tracking-tight">Nuevo personaje</h1>
                    </div>
                </div>

                {/* Card */}
                <div className="rounded-2xl bg-slate-900/60 ring-1 ring-white/10 shadow-xl backdrop-blur">
                    <form onSubmit={handleSubmit} className="p-6 sm:p-8">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold">Crea tu personaje</h2>
                            <p className="mt-1 text-sm text-slate-400">
                                Completa los datos básicos. Puedes editarlo más tarde.
                            </p>
                        </div>

                        {/* Campos en grid */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {/* Nombre */}
                            <div className="sm:col-span-2">
                                <label className="mb-1 block text-sm font-semibold text-slate-200">
                                    Nombre <span className="text-indigo-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="nombre"
                                    value={formulario.nombre}
                                    onChange={handleChange}
                                    required
                                    placeholder="Ej: Aria Sombranoche"
                                    className="w-full rounded-lg bg-slate-800/70 px-3 py-2.5 text-slate-100
                             ring-1 ring-white/10 outline-none
                             placeholder:text-slate-500
                             focus:ring-2 focus:ring-indigo-500 transition"
                                />
                            </div>

                            {/* Raza */}
                            <div>
                                <label className="mb-1 block text-sm font-semibold text-slate-200">
                                    Raza
                                </label>
                                <input
                                    type="text"
                                    name="raza"
                                    value={formulario.raza}
                                    onChange={handleChange}
                                    placeholder="Ej: Elfo"
                                    className="w-full rounded-lg bg-slate-800/70 px-3 py-2.5 text-slate-100
                             ring-1 ring-white/10 outline-none
                             placeholder:text-slate-500
                             focus:ring-2 focus:ring-indigo-500 transition"
                                />
                            </div>

                            {/* Clase */}
                            <div>
                                <label className="mb-1 block text-sm font-semibold text-slate-200">
                                    Clase
                                </label>
                                <input
                                    type="text"
                                    name="clase"
                                    value={formulario.clase}
                                    onChange={handleChange}
                                    placeholder="Ej: Pícaro"
                                    className="w-full rounded-lg bg-slate-800/70 px-3 py-2.5 text-slate-100
                             ring-1 ring-white/10 outline-none
                             placeholder:text-slate-500
                             focus:ring-2 focus:ring-indigo-500 transition"
                                />
                            </div>

                            {/* Edad */}
                            <div>
                                <label className="mb-1 block text-sm font-semibold text-slate-200">
                                    Edad
                                </label>
                                <input
                                    type="number"
                                    name="edad"
                                    min="0"
                                    value={formulario.edad}
                                    onChange={handleChange}
                                    placeholder="Ej: 24"
                                    className="w-full rounded-lg bg-slate-800/70 px-3 py-2.5 text-slate-100
                             ring-1 ring-white/10 outline-none
                             placeholder:text-slate-500
                             focus:ring-2 focus:ring-indigo-500 transition"
                                />
                            </div>

                            {/* Nivel */}
                            <div>
                                <label className="mb-1 block text-sm font-semibold text-slate-200">
                                    Nivel
                                </label>
                                <input
                                    type="number"
                                    name="nivel"
                                    min="1"
                                    value={formulario.nivel}
                                    onChange={handleChange}
                                    className="w-full rounded-lg bg-slate-800/70 px-3 py-2.5 text-slate-100
                             ring-1 ring-white/10 outline-none
                             focus:ring-2 focus:ring-indigo-500 transition"
                                />
                            </div>

                            {/* Descripción */}
                            <div className="sm:col-span-2">
                                <label className="mb-1 block text-sm font-semibold text-slate-200">
                                    Descripción
                                </label>
                                <textarea
                                    name="descripcion"
                                    value={formulario.descripcion}
                                    onChange={handleChange}
                                    rows={5}
                                    placeholder="Historia, personalidad, rasgos, objetivos..."
                                    className="w-full rounded-lg bg-slate-800/70 px-3 py-2.5 text-slate-100
                             ring-1 ring-white/10 outline-none
                             placeholder:text-slate-500
                             focus:ring-2 focus:ring-indigo-500 transition resize-none"
                                />
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <button
                                type="button"
                                onClick={() => setFormulario({ nombre: "", edad: "", raza: "", clase: "", nivel: 1, descripcion: "" })}
                                className="rounded-lg bg-slate-800/60 px-4 py-2.5 text-sm font-semibold
                           ring-1 ring-white/10 hover:bg-slate-800/80 transition"
                            >
                                Limpiar
                            </button>

                            <button
                                type="submit"
                                className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold
                           shadow-lg shadow-indigo-600/20
                           hover:bg-indigo-700 transition
                           focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            >
                                {submitLabel}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Hint */}
                <p className="mt-4 text-center text-xs text-slate-500">
                    Consejo: usa descripciones cortas y luego amplía con detalles importantes.
                </p>
            </div>
        </div>
    );
}