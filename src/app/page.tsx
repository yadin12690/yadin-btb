'use client'

import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter();

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Welcome to the Admin Panel for &quot;Be The Bank&quot;
              </h1>
              <div className="rounded-md shadow">
                <button onClick={() => router.push('/login')}
                  className="w-full uppercase flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-400 hover:bg-teal-600 md:py-4 md:text-lg md:px-10">
                  Start by Sign In!
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
