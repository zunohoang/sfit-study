'use client';

import { Bell, Calendar, Cog } from "lucide-react";
import { useRouter } from "next/navigation"; // Import from next/navigation
import Link from "next/link";

export default function Component({ children }: Readonly<{ children: React.ReactNode }>) {
    const router = useRouter();
    console.log(router);
    // lay url duong dan trinh duyet

    const isActive = (path: string) => {
        console.log(router.pathname);
        return router.pathname === path ? 'border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700';
    };

    return (
        <div className="min-h-screen mx-2 bg-gray-100">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <nav className="flex space-x-8">
                        <Link href=".\views" className={`text-sm font-medium px-1 py-4 border-b-2 ${isActive('/views')}`}>
                            Bảng tin
                        </Link>
                        <Link href=".\problems" className={`text-sm font-medium px-1 py-4 border-b-2 ${isActive('/problems')}`}>
                            Bài tập trên lớp
                        </Link>
                        <Link href=".\people" className={`text-sm font-medium px-1 py-4 border-b-2 ${isActive('/people')}`}>
                            Mọi người
                        </Link>
                        <Link href=".\grades" className={`text-sm font-medium px-1 py-4 border-b-2 ${isActive('/grades')}`}>
                            Điểm
                        </Link>
                    </nav>
                    <div className="flex items-center space-x-4">
                        <Calendar className="h-6 w-6 text-gray-400" />
                        <Bell className="h-6 w-6 text-gray-400" />
                        <Cog className="h-6 w-6 text-gray-400" />
                    </div>
                </div>
            </header>
            {children}
        </div>
    );
}
