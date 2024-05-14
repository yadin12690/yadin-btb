'use client';

import { fetchAdminData, useData } from "@/app/api/useData";
import { useAuth } from "@/app/context/AuthContext";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import Image from 'next/image';
import rickandmortyAdmin from '../../assets/rickadmin.png';
import { useQueryClient } from "react-query";
import { Location } from "@/app/utils/providers/types/location";
import { Character } from "@/app/utils/providers/types/character";
import { SearchBar } from "@/app/components/SearchBar";
import { BackToLogin } from "@/app/components/BackToLogin";
import { LoadinSpinner } from "@/app/components/LoadingSpinner";

//user page

export default function IndexPage() {
    const { user } = useAuth(); // Get the current user
    const [searchQuery, setSearchQuery] = useState("");
    const { isLoading, isError } = useData(user?.role); // Fetch data based on the user's role
    // State for search query and filtered results
    const [searchSuggestions, setSearchSuggestions] = useState<Location[] & Character[]>([]);
    const queryClient = useQueryClient();

    // Check if the user is not an admin


    // Function to handle search input change
    const handleSearchInputChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!user || user.role !== 'admin') {
            toast.error("Access denied. You must be an admin to view this page.");
            return <BackToLogin />;
        }
        setSearchQuery(event.target.value);
        // Enable the query when the search query changes
        if (event.target.value !== "") {
            const res = await queryClient.setQueryData(['items', event.target.value], () => fetchAdminData(user.role, event.target.value));
            if (res) {
                const filtered = res.results.filter((item) =>
                    item.name.toLowerCase().includes(searchQuery.toLowerCase())
                );
                setSearchSuggestions(filtered.slice(0, 5) as Location[] & Character[]); // Show top 5 suggestions
            }
        } else {
            setSearchSuggestions([]);

        }
    }, [queryClient, searchQuery, user]);

    if (isError) return toast.error("Error while getting data");

    return (
        <section className="bg-gray-50 dark:bg-gray-900 min-h-[100vh]">
            <div className="container flex justify-center flex-col text-center gap-12 py-8">
                <BackToLogin />

                <div className="title-container flex flex-row-reverse justify-center align-middle items-center gap-5">
                    <h2 className="text-4xl font-extrabold dark:text-white pt-6">Admin - Rick and Morty</h2>
                    <Image src={rickandmortyAdmin} alt="Rick and Morty" width="0"
                        height="0"
                        sizes="20vw"
                        className="w-20 h-auto" />
                </div>

                {isLoading && LoadinSpinner()}

                {!isLoading && <form className="w-3/5 max-w-md mx-auto">
                    <SearchBar searchQuery={searchQuery} handleSearchInputChange={handleSearchInputChange} />
                    {Array.isArray(searchSuggestions) && searchSuggestions.length > 0 && (
                        <div className="absolute w-2/6 bg-customBlue shadow-lg mt-2 rounded-lg">
                            {searchSuggestions.map((suggestion, index) => (
                                <div onClick={() => setSearchQuery(suggestion.name)} key={index} className=" p-2 hover:bg-[#062876] cursor-pointer">
                                    <p className="text-white">{suggestion.name}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </form>}



                <div className="m-auto mt-32">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table
                                    className="min-w-full text-center text-sm font-light text-surface dark:text-white">
                                    <thead
                                        className="border-b border-neutral-200 bg-[#332D2D] font-medium text-white dark:border-white/10">
                                        <tr>
                                            <th scope="col" className="capitalize px-6 py-4">#</th>
                                            <th scope="col" className="capitalize px-6 py-4">Name</th>
                                            <th scope="col" className="capitalize px-6 py-4">Type</th>
                                            <th scope="col" className="capitalize px-6 py-4">dimension</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(searchSuggestions) && searchSuggestions.length === 0 && (
                                            <tr className="border-b border-neutral-200 dark:border-white/10">
                                                <td colSpan={4} className="whitespace-nowrap px-6 py-4 font-black">No data found</td>
                                            </tr>
                                        )}
                                        {Array.isArray(searchSuggestions) && searchSuggestions.map((item, idx) => (
                                            <tr key={idx} className="border-b border-neutral-200 dark:border-white/10">
                                                <td className="whitespace-nowrap px-6 py-4 font-black">{item.id}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{item.name}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{item.type}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{item.dimension}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
