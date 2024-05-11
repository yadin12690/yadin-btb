import { useQuery } from 'react-query';
import { CharacterResponse } from '../utils/providers/types/character';
import { LocationResponse } from '../utils/providers/types/location';

const fetchData = async (role: "admin" | "user" | undefined) => {

    const adminApiRoute = "https://rickandmortyapi.com/api/character";
    const userApiRoute = "https://rickandmortyapi.com/api/location?name=Abadango";

    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
    };
    if (role === "admin") {
        const [adminResponse, userResponse] = await Promise.all([
            fetch(adminApiRoute, options).then(response => response.json()),
            fetch(userApiRoute, options).then(response => response.json())
        ]);
        return [...adminResponse, ...userResponse] as (CharacterResponse | LocationResponse)[];
    } else {
        const response = await fetch(
            userApiRoute,
            options
        ).then(response => response.json());
        return response as LocationResponse[];
    }

};

export const useData = (role: "admin" | "user" | undefined) => {
    return useQuery('items', () => fetchData(role)); // Pass role to fetchData function
};
