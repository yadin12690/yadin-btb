import { useQuery } from 'react-query';
import { useAuth } from '../context/AuthContext';

const fetchData = async () => {
    // Fetch data based on user role
    const { user } = useAuth();
    if (user && user.role === 'admin') {
        // Fetch all data
        return fetch('/api/allData').then(res => res.json());
    } else {
        // Fetch limited data
        return fetch('/api/limitedData').then(res => res.json());
    }
};

export const useData = () => {
    return useQuery('data', fetchData);
};
