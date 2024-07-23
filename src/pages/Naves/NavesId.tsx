import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Film } from "../../Interfaces/Films";
import { Nave } from "../../Interfaces/Naves";

export default function NavesId() {
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [naveData, setNaveData] = useState<Nave | null>(null);
    const [filmesData, setFilmesData] = useState<Film[]>([]);
    const [urlStarships] = useState<string>(`https://swapi.dev/api/starships/${id}/`);

    useEffect(() => {
        const fetchNaves = async () => {
            try {
                const response = await axios.get<Nave>(urlStarships);
                setNaveData(response.data);
                console.log(response.data)
                setIsLoading(false);

                try {
                    const filmRequests = response.data.films.map((filmUrl) => axios.get<Film>(filmUrl));
                    const filmResponses = await Promise.all(filmRequests);
                    const films = filmResponses.map(res => res.data);
                    setFilmesData(films);
                    console.log(films);
                } catch (error) {
                    console.error("Error fetching films:", error);
                }
            } catch (error) {
                console.error("Error fetching Naves:", error);
                setIsLoading(false);
            }
        };

        fetchNaves();
    }, [urlStarships]);

    let content;

    if (naveData === null || isLoading) {
        content = (
            <ul>
                <li className="text-center animate-bounce">Carregando...</li>
            </ul>
        );
    } else {
        content = (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 list-none p-0">
                <li className="border p-4 rounded">
                    <strong>Modelo:</strong> {naveData.model}
                </li>
                <li className="border p-4 rounded">
                    <strong>Fabricante:</strong> {naveData.manufacturer}
                </li>
                <li className="border p-4 rounded">
                    <strong>Custo em Créditos:</strong> {naveData.cost_in_credits}
                </li>
                <li className="border p-4 rounded">
                    <strong>Comprimento:</strong> {naveData.length}
                </li>
                <li className="border p-4 rounded">
                    <strong>Velocidade Máxima na Atmosfera:</strong> {naveData.max_atmosphering_speed}
                </li>
                <li className="border p-4 rounded">
                    <strong>Tripulação:</strong> {naveData.crew}
                </li>
                <li className="border p-4 rounded">
                    <strong>Passageiros:</strong> {naveData.passengers}
                </li>
                <li className="border p-4 rounded">
                    <strong>Capacidade de Carga:</strong> {naveData.cargo_capacity}
                </li>
                <li className="border p-4 rounded">
                    <strong>Consumíveis:</strong> {naveData.consumables}
                </li>
                <li className="border p-4 rounded">
                    <strong>Classificação do Hipermotor:</strong> {naveData.hyperdrive_rating}
                </li>
                <li className="border p-4 rounded">
                    <strong>MGLT:</strong> {naveData.MGLT}
                </li>
                <li className="border p-4 rounded">
                    <strong>Classe da Nave Estelar:</strong> {naveData.starship_class}
                </li>
                <li className="border p-4 rounded">
                    <strong>Filmes:</strong>
                    <ul>
                        {filmesData.map((film, index) => (
                            <li key={index}>{film.title}</li>
                        ))}
                    </ul>
                </li>
            </ul>
        );
    }

    return (
        <div className="flex-1 p-4">
            <h2 className="text-xl font-semibold mb-4">Nave {naveData?.name}</h2>
            {content}
            <Link to={`/Naves/`}><button className="px-4 py-2 mt-4 bg-blue-500 text-white rounded">Voltar</button></Link>
        </div>
    );
}