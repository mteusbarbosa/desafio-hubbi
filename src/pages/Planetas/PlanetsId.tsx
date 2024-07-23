import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

interface Planet {
    name: string;
    rotation_period: string;
    orbital_period: string;
    diameter: string;
    climate: string;
    gravity: string;
    terrain: string;
    surface_water: string;
    population: string;
    residents: string[];  // Array de URLs
    films: string[];      // Array de URLs
    created: string;      // Data no formato ISO 8601
    edited: string;       // Data no formato ISO 8601
    url: string;          // URL
}

export default function PlanetsId() {
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [planetData, setPlanetData] = useState<Planet | null>(null);
    const [urlPlanets] = useState<string>(`https://swapi.py4e.com/api/planets/${id}/`);

    useEffect(() => {
        const fetchPlanets = async () => {
            try {
                const response = await axios.get<Planet>(urlPlanets);
                setPlanetData(response.data);
                console.log(response.data)
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching planets:", error);
                setIsLoading(false);
            }
        };

        fetchPlanets();
    }, [urlPlanets]);

    let content;

    if (planetData === null || isLoading) {
        content = (
            <ul>
                <li className="text-center animate-bounce">Carregando...</li>
            </ul>
        );
    } else {
        content = (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 list-none p-0">
                <li className="border p-4 rounded">
                    <strong>Nome:</strong> {planetData.name}
                </li>
                <li className="border p-4 rounded">
                    <strong>Período de Rotação:</strong> {planetData.rotation_period}
                </li>
                <li className="border p-4 rounded">
                    <strong>Período Orbital:</strong> {planetData.orbital_period}
                </li>
                <li className="border p-4 rounded">
                    <strong>Diâmetro:</strong> {planetData.diameter}
                </li>
                <li className="border p-4 rounded">
                    <strong>Clima:</strong> {planetData.climate}
                </li>
                <li className="border p-4 rounded">
                    <strong>Gravidade:</strong> {planetData.gravity}
                </li>
                <li className="border p-4 rounded">
                    <strong>Terreno:</strong> {planetData.terrain}
                </li>
                <li className="border p-4 rounded">
                    <strong>Água na Superfície:</strong> {planetData.surface_water}
                </li>
                <li className="border p-4 rounded">
                    <strong>População:</strong> {planetData.population}
                </li>
                <li className="border p-4 rounded">
                    <strong>Criado:</strong> {planetData.created}
                </li>
                <li className="border p-4 rounded">
                    <strong>Editado:</strong> {planetData.edited}
                </li>
                <li className="border p-4 rounded">
                    <strong>URL:</strong> {planetData.url}
                </li>
            </ul>
        );
    }

    return (
        <div className="flex-1 p-4">
            <h2 className="text-xl font-semibold mb-4">Planeta {planetData?.name}</h2>
            {content}
            <Link to={`/planetas/`}><button className="px-4 py-2 mt-4 bg-blue-500 text-white rounded">Voltar</button></Link>
        </div>
    );
}