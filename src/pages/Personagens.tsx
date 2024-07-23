import { useEffect, useState } from "react";
import axios from "axios";

interface Personagem {
    name: string;
    climate: string;
    terrain: string;
    population: string;
}

interface StarWarsData {
    results: Personagem[];
    next: string | null;
    previous: string | null;
}

export default function Personagens() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [starWarsDataPersonagens, setStarWarsDataPersonagens] = useState<StarWarsData | null>(null);
    const [urlPersonagens, setUrlPersonagens] = useState<string>(`https://swapi.py4e.com/api/people/?page=1`);

    useEffect(() => {
        const fetchPersonagens = async () => {
            try {
                const response = await axios.get<StarWarsData>(urlPersonagens);
                setStarWarsDataPersonagens(response.data);
                console.log(response.data)
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching Personagens:", error);
                setIsLoading(false);
            }
        };

        fetchPersonagens();
    }, [urlPersonagens]);

    function nextPersonagemPage() {
        if (starWarsDataPersonagens?.next) {
            setIsLoading(true);
            setUrlPersonagens(starWarsDataPersonagens.next);
        }
    }

    function previousPage() {
        if (starWarsDataPersonagens?.previous) {
            setIsLoading(true);
            setUrlPersonagens(starWarsDataPersonagens.previous);
        }
    }

    let content;

    if (starWarsDataPersonagens === null || isLoading) {
        content = (
            <ul>
                <li className="text-center animate-bounce">Carregando...</li>
            </ul>
        );
    } else {
        content = (
            <ul>
                {starWarsDataPersonagens.results.map((Personagem) => (
                    <li className="mb-2 border p-2 rounded" key={Personagem.name}>
                        {Personagem.name}
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <div className="flex-1 p-4">
            <h2 className="text-xl font-semibold mb-4">Personagens</h2>
            {content}
            <div className="flex justify-center space-x-4 mt-4">
                <button
                    onClick={previousPage}
                    disabled={starWarsDataPersonagens?.previous === null}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
                >
                    ⏪ Voltar
                </button>
                <button
                    onClick={nextPersonagemPage}
                    disabled={starWarsDataPersonagens?.next === null}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
                >
                    Próximo ⏩
                </button>
            </div>
        </div>
    );
}