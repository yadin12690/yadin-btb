'use client';

import { useData } from "../api/useData";

export default function IndexPage() {
    const { data: items, isLoading, isError } = useData();

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading items</div>;

    return (
        <div>
            <h1>Rick and Morty Data</h1>
            <ul>
                {items && items.map((item: any) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
};
