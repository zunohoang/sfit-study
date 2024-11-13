'use client'

import { Menu, Plus, Settings, Home, Calendar, GraduationCap, HelpCircle, Baby, UserCheck } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="fixed w-full flex h-16 items-center justify-between border-b bg-white px-4">
                <div className="flex items-center space-x-4">
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                        <Menu className="h-6 w-6" />
                    </button>
                    <div className="flex items-center space-x-2">
                        {/* <GraduationCap className="h-8 w-8 text-green-600" /> */}
                        <h1 className="text-xl font-medium text-gray-700">SFIT CLASSROOM</h1>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <Link href={'/admins/classrooms/create'} className="p-2 hover:bg-gray-100 rounded-full">
                        <Plus className="h-6 w-6" />
                    </Link>
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                        <Settings className="h-6 w-6" />
                    </button>
                    <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                </div>
            </header>

            {/* Sidebar */}
            <div className="fixed left-0 top-[57px] h-full w-64 border-r bg-white p-4">
                <nav className="space-y-2">
                    <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100">
                        <div className="w-6">🏠</div>
                        Home
                    </a>
                    <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100">
                        <Baby className="w-5 h-5" />
                        Học viên
                    </a>
                    <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100">
                        <UserCheck className="w-5 h-5" />
                        Giáo viên
                    </a>
                    <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100">
                        <HelpCircle className="w-5 h-5" />
                        Help
                    </a>
                </nav>
            </div>
            <div className='pl-64 p-3 w-full pt-20'>
                {children}
            </div>

        </div >
    )
}