import { useParams, Link } from "react-router-dom";

export default function CampaignDetail() {
    const { id } = useParams();

    const campaigns = JSON.parse(localStorage.getItem("campaigns") || "[]");
    const campaign = campaigns.find((c) => c.id === id);

    if (!campaign) {
        return (
            <div className="p-6 text-white">
                <p>No existe esa campaña.</p>
                <Link to="/campaigns" className="underline">Volver</Link>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen p-6 text-white">
            <div className="max-w-4xl mx-auto">
                <Link to="/campaigns" className="text-blue-400 hover:underline">
                    ← Volver
                </Link>

                <div className="mt-4 bg-white text-gray-900 rounded-lg shadow p-6">
                    <h1 className="text-3xl font-bold">{campaign.name}</h1>

                    <div
                        className="prose max-w-none mt-4"
                        dangerouslySetInnerHTML={{
                            __html: campaign.description || "<p>(Sin descripción)</p>",
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
