import {Trash} from 'lucide-react';
import {useNavigate} from "react-router-dom";

export default function CampaignCard({campaign, onDelete}) {
    const navigate = useNavigate();
    return (
        <div className="bg-white text-gray-900 rounded-lg shadow p-4 flex flex-col gap-3">
            <h2 className="text-xl font-bold">{campaign.name}</h2>

            <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{
                    __html: campaign.description || "<p>(Sin descripción)</p>",
                }}
            />


            <div className={'flex-row-reverse flex gap-4'}>
                <button className="self-end px-4 py-2 bg-blue-600 text-white rounded"
                        onClick={()=> navigate(`/campaigns/${campaign.id}`)}
                >
                    Entrar
                </button>
                <button className={"self-end px-4 py-2 bg-red-700 text-white rounded"}
                        onClick={() => {
                            if (confirm("¿Quiéres borrar esta campaña?")) {
                                onDelete(campaign.id)
                            }
                        }
                        }

                >
                    <Trash/>
                </button>
            </div>

        </div>
    );
}
