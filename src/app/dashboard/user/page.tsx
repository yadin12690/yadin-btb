'use client';

import { fetchUserData, useData } from "@/app/api/useData";
import { useAuth } from "@/app/context/AuthContext";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Image from 'next/image';
import rickandmortyimg from '../../assets/rickandmorty.png';
import { loadinSpinner } from "@/app/components/loadingSpinner";
import { BackToLogin } from "@/app/components/backToLogin";
import { useQueryClient } from "react-query";
import { Location } from "@/app/utils/providers/types/location";

//user page

export default function IndexPage() {
    const { user } = useAuth(); // Get the current user
    const [searchQuery, setSearchQuery] = useState("");
    const { isLoading, isError } = useData(user?.role); // Fetch data based on the user's role
    const [searchSuggestions, setSearchSuggestions] = useState<Location[]>([]);
    const queryClient = useQueryClient();

    // Function to handle search input change
    const handleSearchInputChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        // Enable the query when the search query changes
        if (event.target.value !== "") {
            const res = await queryClient.setQueryData(['items', event.target.value], () => fetchUserData(event.target.value));
            if (res) {
                const filtered = Array.isArray(res) ? res.filter((item: Location) =>
                    item.name.toLowerCase().includes(searchQuery.toLowerCase())
                ) : [];
                setSearchSuggestions(filtered.slice(0, 5)); // Show top 5 suggestions
            }
        } else {
            setSearchSuggestions([]);

        }
    }, [queryClient, searchQuery]);

    if (isError) return toast.error("Error while getting data");

    return (
        <section className="bg-gray-50 dark:bg-gray-900 min-h-[100vh]">
            <div className="container flex justify-center flex-col text-center gap-12 py-8">
                <BackToLogin />

                <div className="title-container flex flex-row-reverse justify-center align-middle items-center gap-5">
                    <h2 className="text-4xl font-extrabold dark:text-white pt-6">User - Rick and Morty</h2>
                    <Image src={rickandmortyimg} alt="Rick and Morty" width="0"
                        height="0"
                        sizes="20vw"
                        className="w-20 h-auto" />
                </div>

                {isLoading && loadinSpinner()}

                {!isLoading && <form className="w-3/5 max-w-md mx-auto">
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" value={searchQuery}
                            onChange={handleSearchInputChange}
                            id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter location name" required />
                        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                    </div>
                    {searchSuggestions.length > 0 && (
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
                                        {searchSuggestions.length === 0 && (
                                            <tr className="border-b border-neutral-200 dark:border-white/10">
                                                <td colSpan={4} className="whitespace-nowrap px-6 py-4 font-black">No data found</td>
                                            </tr>
                                        )}
                                        {searchSuggestions.map((item, idx) => (
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
