import { useQuery } from 'react-query';

const fetchData = async () => {
    const apiUrl = "https://rickandmortyapi.com/api";
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        },
    };
    const response = fetch(
        apiUrl,
        options
    )
        .then((response) => response.json())
        .catch((err) => console.error(err));

    return response;

};

export const useData = () => {
    return useQuery('items', fetchData);
};
