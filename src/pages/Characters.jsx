import {useEffect, useState} from "react";
import CampaignCard from "./components/CampaignCard.jsx";
import CharacterComponent from "./components/CharacterComponent.jsx";
import {useLocation, useNavigate, useParams} from "react-router-dom";

export default function Characters() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id: campaignId } = useParams();

    const [characters, setCharacters] = useState(()=> {
        return JSON.parse(localStorage.getItem("characters") || "[]");
    });

    const charactersByCampaign = characters.filter(
        c => c.campaignId === campaignId
    );
    const deleteCharacter = (id) =>{
        const updated = characters.filter(c => c.id !==id);
        setCharacters(updated);
        localStorage.setItem("characters",JSON.stringify(updated))
    }

    return (
        <div className={'flex flex-col pt-4 min-h-screen gap-5 w-full items-center '}>

            <div className={'flex w-full text-center justify-center'}>
                <h1>Personajes</h1>
                <button
                    onClick={()=>{navigate(`${location.pathname}/create`)}}
                    className={'bg-blue-600 flex self-end ml-10'}

                >Crear personaje</button>
            </div>


            {
                characters.length === 0 ? (
                    <p>Aún no hay personajes</p>
                    ) : (
                        charactersByCampaign.map((c)=>(
                            <CharacterComponent key={c.id} character={c} onDelete={deleteCharacter}/>
                        ))
                    )
            }
        </div>

    )
}