import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Film } from "../../Interfaces/Filmes";
import { Veiculos } from "../../Interfaces/Veiculos";

export default function VeiculosId() {
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [veiculosData, setVeiculosData] = useState<Veiculos | null>(null);
    const [filmesData, setFilmesData] = useState<Film[]>([]);
    const [urlVeiculos] = useState<string>(`https://swapi.dev/api/vehicles/${id}/`);

    useEffect(() => {
        const fetchVeiculos = async () => {
            try {
                const response = await axios.get<Veiculos>(urlVeiculos);
                setVeiculosData(response.data);
                console.log(response.data);
                setIsLoading(false);

                // Fetch all films related to this vehicle
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
                console.error("Error fetching Veiculos:", error);
                setIsLoading(false);
            }
        };

        fetchVeiculos();
    }, [urlVeiculos]);

    let content;

    if (veiculosData === null || isLoading) {
        content = (
            <ul>
                <li className="text-center animate-bounce">Carregando...</li>
            </ul>
        );
    } else {
        content = (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 list-none p-0">
                <li className="border p-4 rounded">
                    <strong>Nome:</strong> {veiculosData.name}
                </li>
                <li className="border p-4 rounded">
                    <strong>Modelo:</strong> {veiculosData.model}
                </li>
                <li className="border p-4 rounded">
                    <strong>Fabricante:</strong> {veiculosData.manufacturer}
                </li>
                <li className="border p-4 rounded">
                    <strong>Custo em Créditos:</strong> {veiculosData.cost_in_credits}
                </li>
                <li className="border p-4 rounded">
                    <strong>Comprimento:</strong> {veiculosData.length}
                </li>
                <li className="border p-4 rounded">
                    <strong>Velocidade Máxima na Atmosfera:</strong> {veiculosData.max_atmosphering_speed}
                </li>
                <li className="border p-4 rounded">
                    <strong>Tripulação:</strong> {veiculosData.crew}
                </li>
                <li className="border p-4 rounded">
                    <strong>Passageiros:</strong> {veiculosData.passengers}
                </li>
                <li className="border p-4 rounded">
                    <strong>Capacidade de Carga:</strong> {veiculosData.cargo_capacity}
                </li>
                <li className="border p-4 rounded">
                    <strong>Consumíveis:</strong> {veiculosData.consumables}
                </li>
                <li className="border p-4 rounded">
                    <strong>Classe do Veículo:</strong> {veiculosData.vehicle_class}
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
            <h2 className="text-xl font-semibold mb-4">Personagem {veiculosData?.name}</h2>
            {content}
            <Link to={`/Veiculos/`}><button className="px-4 py-2 mt-4 bg-blue-500 text-white rounded">Voltar</button></Link>
        </div>
    );
}