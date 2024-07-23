export interface Veiculo {
    name: string;
    url: string;
}

export interface Veiculos {
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    max_atmosphering_speed: string;
    crew: string;
    passengers: string;
    cargo_capacity: string;
    consumables: string;
    vehicle_class: string;
    pilots: string[];           // Array de URLs para pilotos
    films: string[];            // Array de URLs para filmes
    created: string;            // Data no formato ISO 8601
    edited: string;             // Data no formato ISO 8601
    url: string;                // URL do veículo
}