'use client'

import { Menu, Plus, Settings, Home, Calendar, GraduationCap, HelpCircle, Baby, UserCheck } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Bell, Book, Github, User, Users, Youtube, Facebook } from 'lucide-react'

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            {children}
            <Footer />
        </div>
    )
}


// Header component
function Header() {
    return (
        <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0">
                            <span className="text-2xl font-bold text-green-600">SFIT</span>
                        </Link>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link href="/classes" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                Lớp học
                            </Link>
                            <Link href="/news" className="border-green-500 text-gray-900 inline-flex items-center p-5 border-b-2 text-sm font-medium">
                                Bản tin
                            </Link>
                            <Link href="https://www.facebook.com/sfit.utc" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                Liên hệ
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                            <span className="sr-only">Xem thông báo</span>
                            <Bell className="h-6 w-6" />
                        </button>
                        <div className="ml-3 relative">
                            <div>
                                <button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                    <span className="sr-only">Mở menu người dùng</span>
                                    <User className="h-8 w-8 rounded-full" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

// Footer component
function Footer() {
    return (
        <footer className="bg-white">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
                <div className="flex justify-center space-x-6 md:order-2">
                    <Link href="#" className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Facebook</span>
                        <Facebook className="h-6 w-6" />
                    </Link>
                    <Link href="#" className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">GitHub</span>
                        <Github className="h-6 w-6" />
                    </Link>
                </div>
                <div className="mt-8 md:mt-0 md:order-1">
                    <p className="text-center text-base text-gray-400">
                        &copy; 2024 SFIT, Inc. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
