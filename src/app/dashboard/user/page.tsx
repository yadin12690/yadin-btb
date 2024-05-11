'use client';

import { useData } from "@/app/api/useData";
import { useAuth } from "@/app/context/AuthContext";
import { CharacterResponse } from "@/app/utils/providers/types/character";
import { LocationResponse } from "@/app/utils/providers/types/location";
import { useEffect } from "react";

//user page

export default function IndexPage() {
    const { user } = useAuth(); // Get the current user
    const { data: items, isLoading, isError } = useData(user?.role); // Fetch data based on the user's role


    useEffect(() => {
        console.log(items);

    }, [items]);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading items</div>;



    return (
        <div>
            <h1>User Rick and morty data</h1>
            <div>
                <ul>
                    {items && ('results' in items && (items as unknown as CharacterResponse).results.map((item, idx) => (
                        <li key={idx}>{item.name}</li>
                    )))}
                </ul>
            </div>
        </div>
    );
};
