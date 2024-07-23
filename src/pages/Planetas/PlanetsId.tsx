import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Film } from "../../Interfaces/Films";
import { Planets } from "../../Interfaces/Planets";

export default function PlanetsId() {
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [planetData, setPlanetData] = useState<Planets | null>(null);
    const [filmesData, setFilmesData] = useState<Film[]>([]);
    const [urlPlanets] = useState<string>(`https://swapi.py4e.com/api/planets/${id}/`);

    useEffect(() => {
        const fetchPlanets = async () => {
            try {
                const response = await axios.get<Planets>(urlPlanets);
                setPlanetData(response.data);
                console.log(response.data)
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
            <h2 className="text-xl font-semibold mb-4">Planeta {planetData?.name}</h2>
            {content}
            <Link to={`/planetas/`}><button className="px-4 py-2 mt-4 bg-blue-500 text-white rounded">Voltar</button></Link>
        </div>
    );
}