export interface Nave {
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
    hyperdrive_rating: string;
    MGLT: string;
    starship_class: string;
    pilots: string[];      // Array de URLs
    films: string[];       // Array de URLs
    created: string;       // Data no formato ISO 8601
    edited: string;        // Data no formato ISO 8601
    url: string;           // URL
}
