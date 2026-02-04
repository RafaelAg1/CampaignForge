import {useEffect, useState} from "react";
import Tiptap from "./components/TipTap.jsx";
import CampaignCard from "./components/CampaignCard.jsx";
import {getCampanaActiva,deleteCampaign} from "./utils/geCampanaActiva.js"

export default function Campaigns() {
    const [creandoCampana, setCreandoCampana] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [campaigns, setCampaigns] = useState(() => {
        return JSON.parse(localStorage.getItem("campaigns") || "[]");
    });
    const personajes = JSON.parse(localStorage.getItem("characters") || "[]")


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
    const handleDeleteCampaign = (id) =>{
        deleteCampaign({
            campaigns,
            setCampaigns,
            id
        })
    }
    return (
        <div className="w-full min-h-screen flex flex-col items-center px-4">

            <div className={'w-full bg-red-500 min-h-90 flex flex-row gap-4 mt-4 text-center'}>
                <div className={'bg-black w-1/4 '}>
                    <p className={'text-4xl'}>Número de campañas</p>
                    <br/>
                    <h1>{campaigns.length}</h1>
                </div>
                <div className={'bg-black w-1/4 '}>
                    <p className={'text-4xl'}>Número de personajes</p>
                    <br/>
                    <h1>{personajes.length}</h1>
                </div>
                <div className={'bg-black w-1/4 '}>
                    <p className={'text-4xl'}>Ultíma campaña creada</p>
                    <p>Fecha de creación: {campaigns[campaigns.length - 1].created_at} </p>
                    <br/>
                    <h1>{campaigns[campaigns.length - 1].name}</h1>
                </div>
                <div className={'bg-black w-1/4 '}>
                    <p className={'text-4xl'}>Campaña con más personajes</p>
                    <br/>
                    <h1>{getCampanaActiva(campaigns, personajes).name}</h1>
                </div>
            </div>


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
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
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
                    campaigns.length === 0 ? (
                        <p>No hay campañas todavia</p>
                    ) : (
                        campaigns.map((campaign) => (
                            <CampaignCard key={campaign.id} campaign={campaign} onDelete={handleDeleteCampaign}/>

                        ))
                    )

                }

            </div>

        </div>
    );
}
