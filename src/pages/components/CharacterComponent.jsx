import {Trash} from "lucide-react";

export default function CharacterComponent({character, onDelete}) {
    return (
        <div className={'flex bg-teal-900 rounded-xl w-1/2 flex-col'}>
            <h1 className={'text-center'}>{character.nombre}</h1>

            <p>Nivel: {character.nivel}</p>
            <p className={''}>Clase: {character.clase}</p>
            <p>Edad: {character.edad}</p>
            <p>Raza: {character.raza}</p>
            <p>Descripción: {character.descripcion}</p>

            <button className={"self-end px-4 py-2 bg-red-700 text-white rounded"}
                    onClick={() => {
                        if (confirm("¿Quiéres borrar este personaje?")) {
                            onDelete(character.id)
                        }
                    }
                    }

            >
                <Trash/>
            </button>
        </div>
    )
}