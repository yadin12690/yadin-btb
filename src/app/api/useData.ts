import { useQuery } from 'react-query';
import { CharacterResponse } from '../utils/providers/types/character';
import { LocationResponse } from '../utils/providers/types/location';

const fetchData = async (role: "admin" | "user" | undefined) => {

    const adminApiRoute = "https://rickandmortyapi.com/api/character";
    const userApiRoute = "https://rickandmortyapi.com/api/location";

    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        },
    };
    const response: CharacterResponse[] | LocationResponse[] = await fetch(
        role == "admin" ? adminApiRoute : userApiRoute,
        options
    )
        .then((response) => response.json())
        .catch((err) => console.error(err));

    return response;

};

export const useData = (role: "admin" | "user" | undefined) => {
    return useQuery('items', () => fetchData(role)); // Pass role to fetchData function
};
