import { Trash } from "lucide-react";

export default function CharacterComponent({ character, onDelete }) {
    return (
        <div
            className="
        w-full
        bg-slate-800/50 backdrop-blur
        border border-slate-700/50
        rounded-lg p-6
        flex flex-col gap-3
        hover:border-emerald-500/50
        transition-all duration-300
      "
        >
            <h1 className="text-2xl font-bold text-emerald-400 text-center mb-2">
                {character.nombre}
            </h1>

            <p className="text-sm text-slate-300">
                <span className="text-slate-400">Nivel:</span> {character.nivel}
            </p>
            <p className="text-sm text-slate-300">
                <span className="text-slate-400">Clase:</span> {character.clase}
            </p>
            <p className="text-sm text-slate-300">
                <span className="text-slate-400">Edad:</span> {character.edad}
            </p>
            <p className="text-sm text-slate-300">
                <span className="text-slate-400">Raza:</span> {character.raza}
            </p>
            <p className="text-sm text-slate-300">
                <span className="text-slate-400">Descripción:</span>{" "}
                {character.descripcion}
            </p>

            <button
                className="
          self-end mt-3 p-3 rounded-lg
          bg-red-900/50 border border-red-700/40
          text-red-400
          hover:bg-red-900/70 hover:border-red-500/60
          transition-all duration-300
        "
                onClick={() => {
                    if (confirm("¿Quiéres borrar este personaje?")) {
                        onDelete(character.id);
                    }
                }}
            >
                <Trash size={18} />
            </button>
        </div>
    );
}
