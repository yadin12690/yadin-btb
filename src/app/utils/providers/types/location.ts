type Resident = string;

export interface Location {
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: Resident[];
    url: string;
    created: string;
}

interface Info {
    count: number;
    pages: number;
    next?: string | null;
    prev?: string | null;
}

export interface LocationResponse {
    info: Info;
    results: Location[];
}