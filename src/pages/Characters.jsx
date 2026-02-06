import { useState } from "react";
import CharacterComponent from "./components/CharacterComponent.jsx";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Characters() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id: campaignId } = useParams();

    const [characters, setCharacters] = useState(() => {
        return JSON.parse(localStorage.getItem("characters") || "[]");
    });

    const charactersByCampaign = characters.filter((c) => c.campaignId === campaignId);

    const deleteCharacter = (id) => {
        const updated = characters.filter((c) => c.id !== id);
        setCharacters(updated);
        localStorage.setItem("characters", JSON.stringify(updated));
    };
    const volver = () => {
        const base = location.pathname.replace(/\/characters$/, "");
        navigate(base || "/");
    };
    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center px-6 py-8 gap-6">
            {/* Header (como la 2ª imagen: barra superior limpia) */}
            <div className="w-full max-w-6xl flex items-center justify-between">
                <button
                    type="button"
                    onClick={volver}
                    className="flex items-center gap-2 px-3 py-2 bg-slate-800 border border-slate-700
                            text-slate-300 text-sm font-medium rounded-md hover:bg-slate-700 transition"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Volver
                </button>

                <button
                    onClick={() => navigate(`${location.pathname}/create`)}
                    className="px-6 py-3 rounded-lg font-medium bg-blue-800 text-white shadow-lg
          hover:scale-[1.02] active:scale-[0.99] transition"
                >
                    Crear personaje
                </button>
            </div>

            {/* Título (separado, como en la 2ª imagen que “respira”) */}
            <div className="w-full max-w-6xl">
                <h1 className="text-5xl font-bold text-slate-100">Personajes</h1>
            </div>

            {/* Contenido en card grande (igual estética que la 2ª imagen) */}
            <div className="w-full max-w-6xl bg-slate-800/30 backdrop-blur border border-slate-700/50 rounded-lg shadow-2xl shadow-black/20">
                {charactersByCampaign.length === 0 ? (
                    <div className="px-10 py-12">
                        <p className="text-slate-300 text-lg">Aún no hay personajes</p>
                        <p className="text-slate-500 text-sm mt-2">Crea el primero para empezar</p>
                    </div>
                ) : (
                    <div className="p-6 flex flex-col gap-4">
                        {charactersByCampaign.map((c) => (
                            <CharacterComponent
                                key={c.id}
                                character={c}
                                onDelete={deleteCharacter}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
