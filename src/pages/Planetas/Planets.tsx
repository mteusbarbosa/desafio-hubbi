import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Planet {
    name: string;
    url: string;
}

interface StarWarsData {
    results: Planet[];
    next: string | null;
    previous: string | null;
}

export default function Planets() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [starWarsDataPlanets, setStarWarsDataPlanets] = useState<StarWarsData | null>(null);
    const [urlPlanets, setUrlPlanets] = useState<string>(`https://swapi.py4e.com/api/planets/?page=1`);

    useEffect(() => {
        const fetchPlanets = async () => {
            try {
                const response = await axios.get<StarWarsData>(urlPlanets);
                setStarWarsDataPlanets(response.data);
                console.log(response.data)
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching planets:", error);
                setIsLoading(false);
            }
        };

        fetchPlanets();
    }, [urlPlanets]);

    function nextPlanetPage() {
        if (starWarsDataPlanets?.next) {
            setIsLoading(true);
            setUrlPlanets(starWarsDataPlanets.next);
        }
    }

    function previousPage() {
        if (starWarsDataPlanets?.previous) {
            setIsLoading(true);
            setUrlPlanets(starWarsDataPlanets.previous);
        }
    }

    let content;

    if (starWarsDataPlanets === null || isLoading) {
        content = (
            <ul>
                <li className="text-center animate-bounce">Carregando...</li>
            </ul>
        );
    } else {
        content = (
            <ul>
                {starWarsDataPlanets.results.map((planets) => {
                    const regex = /\/(\d+)\/$/;
                    const match = regex.exec(planets.url);
                    const starshipId = match ? match[1] : null;
                    return (
                        <li className="mb-2 border p-2 rounded flex justify-between items-center" key={planets.name}>
                            <span>{planets.name}</span>
                            <Link to={`/planetas/${starshipId}/`}><button className="px-4 py-2 bg-blue-500 text-white rounded">Detalhes</button></Link>
                        </li>)
                })}
            </ul>
        );
    }

    return (
        <div className="flex-1 p-4">
            <h2 className="text-xl font-semibold mb-4">Planetas</h2>
            {content}
            <div className="flex justify-center space-x-4 mt-4">
                <button
                    onClick={previousPage}
                    disabled={starWarsDataPlanets?.previous === null}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
                >
                    ⏪ Voltar
                </button>
                <button
                    onClick={nextPlanetPage}
                    disabled={starWarsDataPlanets?.next === null}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
                >
                    Próximo ⏩
                </button>
            </div>
        </div>
    );
}