import {useParams, Link, useNavigate} from "react-router-dom";
import {Trash, ArrowLeft, Users, Calendar} from "lucide-react";

export default function CampaignDetail() {
    const {id} = useParams();
    const navigate = useNavigate();

    const campaigns = JSON.parse(localStorage.getItem("campaigns") || "[]");
    const campaign = campaigns.find((c) => c.id === id);

    const personajes = JSON.parse(localStorage.getItem("characters") || "[]")
    const personajeCampana = personajes.filter((p) => p.campaignId === campaign?.id);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    if (!campaign) {
        return (
            <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900
                flex items-center justify-center px-4">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-white mb-4">Campaña no encontrada</h1>
                    <p className="text-slate-400 mb-6">Esta campaña no existe o ha sido eliminada</p>
                    <Link
                        to="/campaigns"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white
                            rounded-lg hover:bg-blue-700 transition"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Volver a campañas
                    </Link>
                </div>
            </div>
        );
    }

    const handleDeleteCampaign = () => {
        const updatedCampaigns = campaigns.filter((c) => c.id !== campaign.id);
        localStorage.setItem("campaigns", JSON.stringify(updatedCampaigns));

        const updatedCharacters = personajes.filter((p) => p.campaignId !== campaign.id);
        localStorage.setItem("characters", JSON.stringify(updatedCharacters));

        navigate("/campaigns");
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-8">
            <div className="max-w-5xl mx-auto">

                {/* Header con navegación */}
                <div className="mb-6 flex items-center justify-between">
                    <Link
                        to="/campaigns"
                        className="flex items-center gap-2 px-3 py-2 bg-slate-800 border border-slate-700
                            text-slate-300 text-sm font-medium rounded-md hover:bg-slate-700 transition"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Volver
                    </Link>

                    <div className="flex gap-3">
                        <button
                            onClick={() => navigate(`/campaigns/${id}/characters`)}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white
                                font-medium rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-600/20"
                        >
                            <Users className="w-4 h-4" />
                            Ver personajes
                        </button>

                        <button
                            onClick={() => {
                                if (confirm("¿Estás seguro de que quieres borrar esta campaña y todos sus personajes?")) {
                                    handleDeleteCampaign()
                                }
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-700 border border-slate-600
                                text-slate-300 rounded-lg hover:bg-red-600 hover:border-red-500 hover:text-white
                                transition"
                            title="Eliminar campaña"
                        >
                            <Trash className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Card principal */}
                <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg shadow-lg overflow-hidden">

                    {/* Header de la campaña */}
                    <div className="p-8 border-b border-slate-700/50">
                        <h1 className="text-4xl font-bold text-white mb-4">
                            {campaign.name}
                        </h1>

                        {/* Metadata */}
                        <div className="flex flex-wrap gap-6 text-sm">
                            <div className="flex items-center gap-2 text-slate-400">
                                <Users className="w-4 h-4 text-emerald-400" />
                                <span>
                                    {personajeCampana.length} personaje{personajeCampana.length !== 1 ? 's' : ''}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-400">
                                <Calendar className="w-4 h-4 text-blue-400" />
                                <span>Creada el {formatDate(campaign.created_at)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Descripción */}
                    <div className="p-8">
                        <h2 className="text-xl font-semibold text-white mb-4">Descripción</h2>
                        <div
                            className="text-slate-300 leading-relaxed
                                [&_h1]:text-xl [&_h1]:font-bold [&_h1]:text-white [&_h1]:mb-3
                                [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-slate-100 [&_h2]:mb-2
                                [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-slate-200 [&_h3]:mb-2
                                [&_p]:mb-3 [&_p]:text-slate-300
                                [&_strong]:text-white [&_strong]:font-semibold
                                [&_em]:italic [&_em]:text-slate-200
                                [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-3
                                [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-3
                                [&_li]:mb-1
                                [&_a]:text-blue-400 [&_a]:underline [&_a:hover]:text-blue-300"
                            dangerouslySetInnerHTML={{
                                __html: campaign.description || "<p class='text-slate-500 italic'>Sin descripción</p>",
                            }}
                        />
                    </div>
                </div>

                {/* Sección de personajes (opcional) */}
                {personajeCampana.length > 0 && (
                    <div className="mt-6 bg-slate-800/30 backdrop-blur border border-slate-700/50 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-white">
                                Personajes en esta campaña
                            </h2>
                            <button
                                onClick={() => navigate(`/campaigns/${id}/characters`)}
                                className="text-sm text-blue-400 hover:text-blue-300 transition"
                            >
                                Ver todos →
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {personajeCampana.slice(0, 6).map((personaje) => (
                                <div
                                    key={personaje.id}
                                    className="bg-slate-800/50 border border-slate-700 rounded-lg p-3
                                        hover:border-slate-600 transition"
                                >
                                    <p className="font-medium text-white">{personaje.nombre}</p>
                                    <p className="text-sm text-slate-400">
                                        {personaje.clase || 'Sin clase'} • Nivel {personaje.nivel}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}