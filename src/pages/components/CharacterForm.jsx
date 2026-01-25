import { useState } from "react";

export default function CharacterForm({ onSubmit, submitLabel }) {
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
        setFormulario((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formulario);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto p-6 bg-slate-800 text-slate-100 rounded-xl shadow-lg space-y-4"
        >
            <h2 className="text-2xl font-bold text-center">
                Nuevo personaje
            </h2>

            <div>
                <label className="block mb-1 font-semibold">Nombre</label>
                <input
                    type="text"
                    name="nombre"
                    value={formulario.nombre}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 rounded bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div>
                <label className="block mb-1 font-semibold">Raza</label>
                <input
                    type="text"
                    name="raza"
                    value={formulario.raza}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div>
                <label className="block mb-1 font-semibold">Clase</label>
                <input
                    type="text"
                    name="clase"
                    value={formulario.clase}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div>
                <label className="block mb-1 font-semibold">Nivel</label>
                <input
                    type="number"
                    name="nivel"
                    min="1"
                    value={formulario.nivel}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div>
                <label className="block mb-1 font-semibold">Descripción</label>
                <textarea
                    name="descripcion"
                    value={formulario.descripcion}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-3 py-2 rounded bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
            </div>

            <button
                type="submit"
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 rounded font-semibold transition"
            >
                {submitLabel}
            </button>
        </form>
    );
}
