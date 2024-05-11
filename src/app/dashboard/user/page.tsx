'use client';

import { useData } from "@/app/api/useData";
import { useAuth } from "@/app/context/AuthContext";
import { CharacterResponse } from "@/app/utils/providers/types/character";
import { LocationResponse } from "@/app/utils/providers/types/location";

export default function IndexPage() {
    const { user } = useAuth(); // Get the current user
    const { data: items, isLoading, isError } = useData(user?.role); // Fetch data based on the user's role

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading items</div>;

    return (
        <div>
            <h1>Rick and Morty Data</h1>
            <div>
                <ul>
                    {items && items.map(({ results }: CharacterResponse | LocationResponse, idx: number) => (
                        <li key={results[idx].id}>{results[idx].name}</li>
                    ))}
                </ul>
                <h3>User Page</h3>
            </div>
        </div>
    );
};
