export interface Personagens {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;  // URL
    films: string[];    // Array de URLs
    species: string[];  // Array de URLs, pode ser vazio
    vehicles: string[]; // Array de URLs, pode ser vazio
    starships: string[]; // Array de URLs
    created: string;    // Data no formato ISO 8601
    edited: string;     // Data no formato ISO 8601
    url: string;        // URL
}