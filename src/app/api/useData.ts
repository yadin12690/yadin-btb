import { useQuery } from 'react-query';
import { CharacterResponse } from '../utils/providers/types/character';
import { LocationResponse } from '../utils/providers/types/location';

// Fetch data based on the user's role

export const fetchData = async (role: "admin" | "user" | undefined, userSearchQuery?: string) => {

    const adminApiRoute = "https://rickandmortyapi.com/api/character";
    const userApiRoute = "https://rickandmortyapi.com/api/location?name=" + userSearchQuery;

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
            fetch(adminApiRoute, options).then(response => response.json()).catch(error => { console.error(error) }),
            fetch(userApiRoute, options).then(response => response.json().catch(error => { console.error(error) }))
        ]);
        return [...adminResponse, ...userResponse];
    } else {
        if (userSearchQuery !== undefined) {
            const response = await fetch(
                userApiRoute,
                options
            ).then(response => response.json()).catch(error => { console.error(error) });
            return response;
        }
    }

};

export const useData = (role: "admin" | "user" | undefined, userSearchQuery?: string) => {
    return useQuery('items', () => fetchData(role, userSearchQuery)); // Pass role to fetchData function
};
