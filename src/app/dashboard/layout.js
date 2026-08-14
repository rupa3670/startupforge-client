

import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";

export default function RootLayout({ children }) {
   
    return (
        <div className="min-h-screen bg-white dark:bg-black transition-colors">
            <div className="flex w-screen">
                {/* Sidebar */}
               <Sidebar/>
                {/* Main column */}
                <div className="flex flex-col w-full min-h-screen">
                    {/* Navbar */}
                   <Navbar/>
                    {/* Page content */}
                    <main className="flex-1 w-full p-6 bg-white dark:bg-black text-black dark:text-white transition-colors">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}