'use client'

import { useState } from 'react'
import { Menu, User, Calendar, AlertTriangle, Plus, Settings, Home, GraduationCap, HelpCircle } from 'lucide-react'
import Link from 'next/link'

export default function ClassroomAssignments({ children }: Readonly<{ children: React.ReactNode }>) {
    const [isNavOpen, setIsNavOpen] = useState(false)

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen)
    }

    const navItems = [
        { icon: Home, label: 'Trang chủ', href: '/classrooms' },
        { icon: Calendar, label: 'Lịch học', href: '/classrooms' },
        { icon: AlertTriangle, label: 'Thông báo', href: '/classrooms' },
        { icon: Settings, label: 'Cài đặt', href: '/classrooms' },
        { icon: HelpCircle, label: 'Thông tin', href: 'https://www.facebook.com/sfit.utc' },
    ]

    return (
        <div className="bg-gradient-to-tl from-sky-50 to-white w-full mx-auto min-h-screen">
            {/* Header */}
            <header className="flex justify-between items-center p-4 border-b sm:flex-col sm:items-start md:flex-row md:items-center">
                <div className="flex items-center space-x-4 mb-4 sm:mb-2">
                    <button onClick={toggleNav} className="focus:outline-none">
                        <Menu className="h-6 w-6 text-gray-500" />
                    </button>
                    <h1 className="text-xl text-transparent leading-[100%] font-bold font-['Jost']
            drop-shadow-[4px_4px_4px_rgba(0,0,0,0.25)]
            bg-[linear-gradient(111deg,_#7afab8_10%,_#0FA858_72%,_#194C35_87%)] bg-clip-text">
                        SFIT
                    </h1>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center font-medium space-x-2">
                        {typeof window !== 'undefined' && localStorage.getItem('fullName')}
                    </div>
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-500" />
                    </div>
                </div>
            </header>

            {/* Navigation */}
            <nav className={`fixed left-0 top-0 h-full w-64 bg-white  z-10 shadow-lg transform transition-transform duration-300 ease-in-out ${isNavOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-4 border-b">
                    <h2 className="text-lg font-extrabold text-sky-800">SFIT CLASSROOM</h2>
                </div>
                <ul className="py-4">
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <Link href={item.href} className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={toggleNav}>
                                <item.icon className="h-5 w-5 mr-3" />
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Overlay */}
            {isNavOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50" onClick={toggleNav}></div>
            )}

            {/* Main Content */}
            <main className="px-4">
                {children}
            </main>
        </div>
    )
}