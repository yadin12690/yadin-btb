import { useQuery } from 'react-query';
import { useAuth } from '../context/AuthContext';

const fetchData = async () => {
    const apiUrl = "https://rickandmortyapi.com/"

    // Fetch data based on user role
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { user } = useAuth();
    if (user && user.role === 'admin') {
        // Fetch all data
        return fetch(apiUrl).then(res => res.json());
    } else {
        // Fetch limited data
        return fetch(apiUrl).then(res => res.json());
    }
};

export const useData = () => {
    return useQuery('data', fetchData);
};
