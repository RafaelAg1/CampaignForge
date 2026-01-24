import {useEffect, useState} from "react";
import Tiptap from "./components/TipTap.jsx";
import CampaignCard from "./components/CampaignCard.jsx";


export default function Campaigns() {
    const [creandoCampana, setCreandoCampana] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [campaigns,setCampaigns] = useState([]);


    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("campaigns") || "[]");
        setCampaigns(stored);
    }, []);

    const handleCampaing = (e) =>{
        e.preventDefault()

        const nuevaCampana = {
            id: crypto.randomUUID(),
            name: name,
            description,
            created_at: new Date().toISOString(),
        };

        const updated =  [nuevaCampana, ...campaigns]
        localStorage.setItem("campaigns",JSON.stringify(updated))

        setName("")
        setDescription("")
        setCreandoCampana(false)
    }
    const deleteCampaign = (id) =>{
        const updated = campaigns.filter(c => c.id !==id);
        setCampaigns(updated);
        localStorage.setItem("campaigns",JSON.stringify(updated))
    }
    return (
        <div className="w-full min-h-screen flex flex-col items-center px-4">

            <div className="flex justify-end w-full max-w-3xl mt-8">
                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    onClick={() => setCreandoCampana(!creandoCampana)}
                >
                    {!creandoCampana ? "Crear campaña" : "Cerrar creación"}
                </button>
            </div>

            {creandoCampana && (
                <form
                    className="w-full max-w-4xl mt-6 p-6 bg-white text-gray-900 rounded-lg shadow
                    flex flex-col gap-4 max-h-[80vh] overflow-y-auto "
                    onSubmit={handleCampaing}
                >
                    <h1 className="text-2xl font-bold text-center">Creación de campaña</h1>

                    <label className="text-left font-semibold">Nombre de la campaña</label>
                    <input
                        type="text"
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={name}
                        onChange={(e)=>{setName(e.target.value)}}
                    />

                    <label className="text-left font-semibold">
                        Descripción
                    </label>

                    <div className="border rounded max-h-64 overflow-y-auto">
                        <Tiptap value={description} onChange={setDescription}/>
                    </div>

                    <button className={'text-white bg-blue-600 hover:bg-blue-700 transition'} type={'submit'}>
                        Crear
                    </button>
                </form>
            )}

            <div className="w-full max-w-4xl mt-8 flex flex-col gap-4">
                {
                    campaigns.length===0 ? (
                        <p>No hay campañas todavia</p>
                        ) : (
                        campaigns.map((campaign) => (
                            <CampaignCard key={campaign.id} campaign={campaign} onDelete={deleteCampaign}/>

                        ))
                            )

                }

            </div>

        </div>
    );
}
