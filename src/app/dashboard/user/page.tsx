'use client';

import { useData } from "@/app/api/useData";
import { useAuth } from "@/app/context/AuthContext";
import { LocationResponse } from "@/app/utils/providers/types/location";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Image from 'next/image';
import rickandmortyimg from '../../assets/rickandmorty.png';

//user page

export const loadinSpinner = () => {
    return (
        <div role="status" className="flex justify-center align-middle flex-col text-center">
            <h2>Loading User data</h2>
            <svg aria-hidden="true" className="self-center w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
        </div>
    )
}

export default function IndexPage() {
    const { user } = useAuth(); // Get the current user
    const { data: items, isLoading, isError } = useData(user?.role); // Fetch data based on the user's role


    useEffect(() => {
        console.log(items);
    }, [items]);

    if (isError) return toast.error("Error while getting data");



    return (
        <div className="container flex justify-center flex-col text-center gap-12 py-8">
            <div className="title-container flex flex-row-reverse justify-center align-middle items-center gap-5">
                <h2 className="text-4xl font-extrabold dark:text-white pt-6">User - Rick and Morty</h2>
                <Image src={rickandmortyimg} alt="Rick and Morty" width={80} height={80} />
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
    );
};
