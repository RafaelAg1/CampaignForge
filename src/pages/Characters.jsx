import {useEffect, useState} from "react";
import CampaignCard from "./components/CampaignCard.jsx";
import CharacterComponent from "./components/CharacterComponent.jsx";

export default function Characters() {

    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("characters") || "[]");
        setCharacters(stored);
    }, []);

    return (
        <div>
            {
                characters.length === 0 ? (
                    <p>Aún no hay personajes</p>
                    ) : (
                        characters.map((c)=>(
                            <CharacterComponent character={c}/>
                        ))
                    )
            }
        </div>

    )
}