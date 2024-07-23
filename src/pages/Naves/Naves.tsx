import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Nave } from "../../Interfaces/Naves";

interface StarWarsData {
    results: Nave[];
    next: string | null;
    previous: string | null;
}

export default function Naves() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [starWarsDataNaves, setStarWarsDataNaves] = useState<StarWarsData | null>(null);
    const [urlNaves, setUrlNaves] = useState<string>(`https://swapi.py4e.com/api/starships/?page=1`);

    useEffect(() => {
        const fetchNaves = async () => {
            try {
                const response = await axios.get<StarWarsData>(urlNaves);
                setStarWarsDataNaves(response.data);
                console.log(response.data)
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching Naves:", error);
                setIsLoading(false);
            }
        };

        fetchNaves();
    }, [urlNaves]);

    function nextPlanetPage() {
        if (starWarsDataNaves?.next) {
            setIsLoading(true);
            setUrlNaves(starWarsDataNaves.next);
        }
    }

    function previousPage() {
        if (starWarsDataNaves?.previous) {
            setIsLoading(true);
            setUrlNaves(starWarsDataNaves.previous);
        }
    }

    let content;

    if (starWarsDataNaves === null || isLoading) {
        content = (
            <ul>
                <li className="text-center animate-bounce">Carregando...</li>
            </ul>
        );
    } else {
        content = (
            <ul>
                {starWarsDataNaves.results.map((naves) => {
                    const regex = /\/(\d+)\/$/;
                    const match = regex.exec(naves.url);
                    const starshipId = match ? match[1] : null;
                    return (
                        <li className="mb-2 border p-2 rounded flex justify-between items-center" key={naves.name}>
                            <span>{naves.name}</span>
                            <Link to={`/naves/${starshipId}/`}><button className="px-4 py-2 bg-blue-500 text-white rounded">Detalhes</button></Link>
                        </li>)
                })}
            </ul>
        );
    }

    return (
        <div className="flex-1 p-4">
            <h2 className="text-xl font-semibold mb-4">Naves</h2>
            {content}
            <div className="flex justify-center space-x-4 mt-4">
                <button
                    onClick={previousPage}
                    disabled={starWarsDataNaves?.previous === null}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
                >
                    ⏪ Voltar
                </button>
                <button
                    onClick={nextPlanetPage}
                    disabled={starWarsDataNaves?.next === null}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
                >
                    Próximo ⏩
                </button>
            </div>
        </div>
    );
}