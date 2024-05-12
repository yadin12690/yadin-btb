import { useQuery } from 'react-query';
import { CharacterResponse } from '../utils/providers/types/character';
import { LocationResponse } from '../utils/providers/types/location';

// Fetch data based on the user's role

export const fetchAdminData = async (role: "admin" | "user" | undefined, userSearchQuery?: string): Promise<LocationResponse & CharacterResponse | undefined> => {

    const adminApiRoute = "https://rickandmortyapi.com/api/character?name=" + userSearchQuery;
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
        return { ...adminResponse, ...userResponse };
    }
}


export const fetchUserData = async (userSearchQuery?: string): Promise<LocationResponse | undefined> => {
    const userApiRoute = "https://rickandmortyapi.com/api/location?name=" + userSearchQuery;

    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
    };

    if (userSearchQuery !== undefined) {
        const response = await fetch(
            userApiRoute,
            options
        ).then(response => response.json()).catch(error => { console.error(error) });
        return response.results as LocationResponse;
    }
    return undefined;
}


export const useData = (role: "admin" | "user" | undefined, userSearchQuery?: string) => {

    const userRole = role;

    return useQuery('items', () => {
        if (userRole == 'admin') {
            fetchAdminData(role, userSearchQuery)
        }
        else {
            fetchUserData(userSearchQuery)
        }
    });
};
