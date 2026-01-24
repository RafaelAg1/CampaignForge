import { useParams, useNavigate } from "react-router-dom";
import CharacterForm from "./components/CharacterForm.jsx";

export default function CharacterCreate() {
    const { id: campaignId } = useParams();
    const navigate = useNavigate();

    const handleSubmit = (characterData) => {
        const newCharacter = {
            id: crypto.randomUUID(),
            campaignId,
            ...characterData,
        };

        const prev = JSON.parse(localStorage.getItem("characters") || "[]");
        localStorage.setItem("characters", JSON.stringify([...prev, newCharacter]));

        navigate(`/campaigns/${campaignId}`);
    };

    return (
        <CharacterForm
            onSubmit={handleSubmit}
            submitLabel="Crear personaje"
        />
    );
}
