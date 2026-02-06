import {Trash, Users, Calendar} from 'lucide-react';
import {useNavigate} from "react-router-dom";

export default function CampaignCard({campaign, onDelete}) {
    const navigate = useNavigate();

    const personajes = JSON.parse(localStorage.getItem("characters") || "[]")
    const personajeCampana = personajes.filter((p) => p.campaignId === campaign.id);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <div className="bg-slate-800/50 backdrop-blur border-8 border-slate-900/50 rounded-lg shadow-lg
            hover:border-amber-500/50 transition-all duration-300 overflow-hidden group">

            <div className="p-6 border-b border-slate-700/50">
                <h2 className="text-2xl font-bold text-white mb-3  transition-colors">
                    {campaign.name}
                </h2>

                <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-emerald-400" />
                        <span>{personajeCampana.length} personaje{personajeCampana.length !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-400" />
                        <span>{formatDate(campaign.created_at)}</span>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="p-6">
                <div
                    className="text-slate-300 leading-relaxed
                        [&_h1]:text-xl [&_h1]:font-bold [&_h1]:text-white [&_h1]:mb-2
                        [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-white [&_h2]:mb-2
                        [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-white [&_h3]:mb-1
                        [&_p]:mb-2 [&_p]:text-slate-300
                        [&_strong]:text-black [&_strong]:font-semibold
                        [&_em]:italic [&_em]:text-slate-200
                        [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-2
                        [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-2
                        [&_li]:mb-1
                        [&_a]:text-blue-400 [&_a]:underline [&_a:hover]:text-blue-300"
                    dangerouslySetInnerHTML={{
                        __html: campaign.description || "<p class='text-slate-500 italic'>Sin descripción</p>",
                    }}
                />
            </div>

            {/* Actions */}
            <div className="p-6 pt-0 flex justify-end gap-3">
                <button
                    className="px-4 py-2 bg-slate-700 border border-slate-600 text-slate-300 rounded-lg
                        hover:bg-red-600 hover:border-red-500 hover:text-white transition-all duration-200
                        flex items-center gap-2 group/delete"
                    onClick={() => {
                        if (confirm("¿Estás seguro de que quieres borrar esta campaña?")) {
                            onDelete(campaign.id)
                        }
                    }}
                    title="Eliminar campaña"
                >
                    <Trash className="w-4 h-4 group-hover/delete:scale-110 transition-transform" />
                    <span>Eliminar</span>
                </button>

                <button
                    className="px-6 py-2 bg-gradient-to-r bg-blue-900 text-white font-medium rounded-lg
                         transition-all  hover:scale-105"
                    onClick={() => navigate(`/campaigns/${campaign.id}`)}
                >
                    Entrar
                </button>
            </div>
        </div>
    );
}