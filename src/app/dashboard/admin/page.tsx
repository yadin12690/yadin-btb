'use client';

import { useData } from "@/app/api/useData";
import { BackToLogin } from "@/app/components/backToLogin";
import { useAuth } from "@/app/context/AuthContext";
import Image from "next/image";
import rickandmortyAdmin from '../../assets/rickadmin.png';
import { loadinSpinner } from "@/app/components/loadingSpinner";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { LocationResponse } from "@/app/utils/providers/types/location";

//Admin page

export default function IndexPage() {
    const { user } = useAuth(); // Get the current user
    const { data: items, isLoading, isError } = useData(user?.role); // Fetch data based on the user's role


    useEffect(() => {
        console.log(items);
    }, [items]);

    if (isError) return toast.error("Error while getting data");

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="container flex justify-center flex-col text-center gap-12 py-8">
                <BackToLogin />
                <div className="title-container flex flex-row-reverse justify-center align-middle items-center gap-5">
                    <h2 className="text-4xl font-extrabold dark:text-white pt-6">Admin - Rick and Morty</h2>
                    <Image src={rickandmortyAdmin} alt="Rick and Morty" width="0"
                        height="0"
                        sizes="20vw"
                        className="w-1/12 h-auto" />
                </div>
                {isLoading && loadinSpinner()}

                <div className="m-auto">
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
                                        {items && ('results' in items && (items as unknown as LocationResponse).results.map((item, idx) => (
                                            <tr key={idx} className="border-b border-neutral-200 dark:border-white/10">
                                                <td className="whitespace-nowrap px-6 py-4 font-black">{item.id}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{item.name}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{item.type}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{item.dimension}</td>
                                            </tr>
                                        )))}
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
