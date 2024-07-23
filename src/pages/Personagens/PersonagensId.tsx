import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import { Personagens } from "../../Interfaces/Personagens";
import { Planetas } from "../../Interfaces/Planetas";
import { Filmes } from "../../Interfaces/Filmes";


export default function PersonagensId() {
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [personagensData, setPersonagensData] = useState<Personagens | null>(null);
    const [planetData, setPlanetData] = useState<Planetas | null>(null);
    const [filmesData, setFilmesData] = useState<Filmes[]>([]);
    const [urlPersonagens] = useState<string>(`https://swapi.dev/api/people/${id}/`);

    useEffect(() => {
        const fetchPersonagens = async () => {
            try {
                const response = await axios.get<Personagens>(urlPersonagens);
                setPersonagensData(response.data);
                console.log(response.data)
                setIsLoading(false);

                try {
                    const response2 = await axios.get<Planetas>(response.data.homeworld);
                    setPlanetData(response2.data);
                    console.log(response2.data)
                    setIsLoading(false);
                } catch (error) {
                    console.error("Error fetching planets:", error);
                    setIsLoading(false);
                }

                try {
                    const filmRequests = response.data.films.map((filmUrl) => axios.get<Filmes>(filmUrl));
                    const filmResponses = await Promise.all(filmRequests);
                    const films = filmResponses.map(res => res.data);
                    setFilmesData(films);
                    console.log(films);
                } catch (error) {
                    console.error("Error fetching films:", error);
                }
            } catch (error) {
                console.error("Error fetching Personagens:", error);
                setIsLoading(false);
            }
        };

        fetchPersonagens();

    }, [urlPersonagens]);

    let content;

    if (personagensData === null || isLoading) {
        content = (
            <ul>
                <li className="text-center animate-bounce">Carregando...</li>
            </ul>
        );
    } else {
        content = (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 list-none p-0">
                <li className="border p-4 rounded">
                    <strong>Nome:</strong> {personagensData.name}
                </li>
                <li className="border p-4 rounded">
                    <strong>Altura:</strong> {personagensData.height}
                </li>
                <li className="border p-4 rounded">
                    <strong>Massa:</strong> {personagensData.mass}
                </li>
                <li className="border p-4 rounded">
                    <strong>Cor do Cabelo:</strong> {personagensData.hair_color}
                </li>
                <li className="border p-4 rounded">
                    <strong>Cor da Pele:</strong> {personagensData.skin_color}
                </li>
                <li className="border p-4 rounded">
                    <strong>Cor dos Olhos:</strong> {personagensData.eye_color}
                </li>
                <li className="border p-4 rounded">
                    <strong>Ano de Nascimento:</strong> {personagensData.birth_year}
                </li>
                <li className="border p-4 rounded">
                    <strong>Gênero:</strong> {personagensData.gender}
                </li>
                <li className="border p-4 rounded">
                    <strong>Planeta Natal:</strong> {planetData?.name}
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
            <h2 className="text-xl font-semibold mb-4">Personagem {personagensData?.name}</h2>
            {content}
            <Link to={`/personagens/`}><button className="px-4 py-2 mt-4 bg-blue-500 text-white rounded">Voltar</button></Link>
        </div>
    );
}