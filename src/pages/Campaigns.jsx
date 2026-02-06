import {useState} from "react";
import Tiptap from "./components/TipTap.jsx";
import CampaignCard from "./components/CampaignCard.jsx";
import {getCampanaActiva, deleteCampaign} from "./utils/geCampanaActiva.js"

export default function Campaigns() {
    const [creandoCampana, setCreandoCampana] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [campaigns, setCampaigns] = useState(() => {
        return JSON.parse(localStorage.getItem("campaigns") || "[]");
    });
    const personajes = JSON.parse(localStorage.getItem("characters") || "[]")
    const activa = getCampanaActiva(campaigns, personajes)

    const handleCampaing = (e) => {
        e.preventDefault()

        const nuevaCampana = {
            id: crypto.randomUUID(),
            name: name,
            description,
            created_at: new Date().toISOString(),
        };

        const updated = [nuevaCampana, ...campaigns]
        localStorage.setItem("campaigns", JSON.stringify(updated))

        setCampaigns(updated)
        setName("")
        setDescription("")
        setCreandoCampana(false)
    }
    const handleDeleteCampaign = (id) => {
        deleteCampaign({
            campaigns,
            setCampaigns,
            id
        })
    }
    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center px-4 py-8">

            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

                <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-6 hover:border-amber-500/50 transition-all duration-300">
                    <p className="text-sm font-medium text-slate-400 uppercase tracking-wide mb-2">Campañas Totales</p>
                    <h1 className="text-4xl font-bold text-amber-400">{campaigns.length}</h1>
                </div>

                <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-6 hover:border-emerald-500/50 transition-all duration-300">
                    <p className="text-sm font-medium text-slate-400 uppercase tracking-wide mb-2">Personajes</p>
                    <h1 className="text-4xl font-bold text-emerald-400">{personajes.length}</h1>
                </div>

                <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-6 hover:border-blue-500/50 transition-all duration-300">
                    <p className="text-sm font-medium text-slate-400 uppercase tracking-wide mb-2">Última Campaña</p>
                    {campaigns.length > 0 ? (
                        <div className="mt-2">
                            <p className="text-lg font-semibold text-blue-400 truncate">{campaigns[0].name}</p>
                            <p className="text-xs text-slate-500 mt-1">
                                {new Date(campaigns[0].created_at).toLocaleDateString('es-ES')}
                            </p>
                        </div>
                    ) : (
                        <p className="text-sm text-slate-500 mt-2">Sin campañas</p>
                    )}
                </div>

                <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-6 hover:border-purple-500/50 transition-all duration-300">
                    <p className="text-sm font-medium text-slate-400 uppercase tracking-wide mb-2">Más Activa</p>
                    {activa ? (
                        <div className="mt-2">
                            <p className="text-lg font-semibold text-purple-400 truncate">{activa.name}</p>
                            <p className="text-xs text-slate-500 mt-1">{activa.characterCount} personaje/s</p>
                        </div>
                    ) : (
                        <p className="text-sm text-slate-500 mt-2">Sin actividad</p>
                    )}
                </div>
            </div>

            {/* Create Campaign Button */}
            <div className="flex justify-end w-full max-w-6xl mb-6">
                <button
                    className="px-6 py-3 bg-gradient-to-r bg-blue-900 text-white font-medium rounded-lg
                     hover:scale-105"
                    onClick={() => setCreandoCampana(!creandoCampana)}
                >
                    {!creandoCampana ? "Crear Campaña" : "✕ Cerrar"}
                </button>
            </div>

            {/* Create Campaign Form */}
            {creandoCampana && (
                <form
                    className="w-full max-w-6xl mb-8 p-8 bg-slate-800/70 backdrop-blur border border-slate-700/50
                    rounded-lg shadow-2xl flex flex-col gap-6 max-h-[80vh] overflow-y-auto"
                    onSubmit={handleCampaing}
                >
                    <h1 className="text-3xl font-bold bg-clip-text bg-gradient-to-r text-amber-600">
                        Nueva Campaña
                    </h1>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Nombre de la campaña
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full border border-slate-600 bg-slate-900/50 rounded-lg px-4 py-3 text-slate-100
                            focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                            placeholder="Ej: La Cueva del Ocro"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Descripción
                        </label>
                        <div className="border border-slate-600 bg-slate-900/50 rounded-lg overflow-hidden max-h-64 overflow-y-auto">
                            <Tiptap value={description} onChange={setDescription}/>
                        </div>
                    </div>

                    <button
                        className="w-full py-3 bg-gradient-to-r bg-blue-800 text-white font-semibold rounded-lg
                         transition-all duration-300 shadow-lg hover:scale-[1.02]"
                        type="submit"
                    >
                        Crear Campaña
                    </button>
                </form>
            )}

            {/* Campaigns List */}
            <div className="w-full max-w-6xl flex flex-col gap-4">
                {campaigns.length === 0 ? (
                    <div className="text-center py-16 bg-slate-800/30 backdrop-blur border border-slate-700/50 rounded-lg">
                        <p className="text-slate-400 text-lg">No hay campañas todavía</p>
                        <p className="text-slate-500 text-sm mt-2">¡Crea tu primera aventura épica!</p>
                    </div>
                ) : (
                    campaigns.map((campaign) => (
                        <CampaignCard key={campaign.id} campaign={campaign} onDelete={handleDeleteCampaign}/>
                    ))
                )}
            </div>

        </div>
    );
}