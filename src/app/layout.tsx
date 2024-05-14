'use client';
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ReactQueryProvider from "./utils/providers/ReactQueryProvider";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Yadin - BTB",
//   description: "Generated by create next app",

// };


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <AuthProvider>
            <ToastContainer />
            {children}
          </AuthProvider>
        </ ReactQueryProvider>
      </body>
    </html>
  );
}
