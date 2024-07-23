import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Veiculo } from "../../Interfaces/Veiculos";

interface StarWarsData {
    results: Veiculo[];
    next: string | null;
    previous: string | null;
}

export default function Veiculos() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [starWarsDataVeiculos, setStarWarsDataVeiculos] = useState<StarWarsData | null>(null);
    const [urlVeiculos, setUrlVeiculos] = useState<string>(`https://swapi.py4e.com/api/vehicles/?page=1`);

    useEffect(() => {
        const fetchVeiculos = async () => {
            try {
                const response = await axios.get<StarWarsData>(urlVeiculos);
                setStarWarsDataVeiculos(response.data);
                console.log(response.data)
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching Veiculos:", error);
                setIsLoading(false);
            }
        };

        fetchVeiculos();
    }, [urlVeiculos]);

    function nextVeiculoPage() {
        if (starWarsDataVeiculos?.next) {
            setIsLoading(true);
            setUrlVeiculos(starWarsDataVeiculos.next);
        }
    }

    function previousPage() {
        if (starWarsDataVeiculos?.previous) {
            setIsLoading(true);
            setUrlVeiculos(starWarsDataVeiculos.previous);
        }
    }

    let content;

    if (starWarsDataVeiculos === null || isLoading) {
        content = (
            <ul>
                <li className="text-center animate-bounce">Carregando...</li>
            </ul>
        );
    } else {
        content = (
            <ul>
                {starWarsDataVeiculos.results.map((veiculo) => {
                    const regex = /\/(\d+)\/$/;
                    const match = regex.exec(veiculo.url);
                    const starshipId = match ? match[1] : null;
                    return (
                        <li className="mb-2 border p-2 rounded flex justify-between items-center" key={veiculo.name}>
                            <span>{veiculo.name}</span>
                            <Link to={`/veiculos/${starshipId}/`}><button className="px-4 py-2 bg-blue-500 text-white rounded">Detalhes</button></Link>
                        </li>)
                })}
            </ul>
        );
    }

    return (
        <div className="flex-1 p-4">
            <h2 className="text-xl font-semibold mb-4">Veículos</h2>
            {content}
            <div className="flex justify-center space-x-4 mt-4">
                <button
                    onClick={previousPage}
                    disabled={starWarsDataVeiculos?.previous === null}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
                >
                    ⏪ Voltar
                </button>
                <button
                    onClick={nextVeiculoPage}
                    disabled={starWarsDataVeiculos?.next === null}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
                >
                    Próximo ⏩
                </button>
            </div>
        </div>
    );
}