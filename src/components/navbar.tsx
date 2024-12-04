'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface NavbarProps {
    isOpen: boolean
    toggleNavbar: () => void
}

export function Navbar({ isOpen, toggleNavbar }: NavbarProps) {
    const [recentDocs, setRecentDocs] = useState<{ id: string; title: string }[]>([])

    useEffect(() => {
        const storedDocs = [
            {
                id: '1',
                title: 'Document 1'
            },
            {
                id: '2',
                title: 'Document 2'
            },
            {
                id: '3',
                title: 'Document 3'
            },
            {
                id: '4',
                title: 'Document 4'
            },
            {
                id: '5',
                title: 'Document 5'
            }
        ]
        setRecentDocs(storedDocs)
    }, [])

    return (
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
            <div className="flex items-center justify-between p-4 border-b border-gray-300">
                <h2 className="text-xl font-semibold text-green-800">Tài liệu</h2>
                <button
                    onClick={toggleNavbar}
                    className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors duration-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div className="p-4 text-gray-300">
                <Link href="/new-document" passHref>
                    <button className="w-full mb-4 py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded transition-colors duration-200 flex items-center justify-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span>Tạo mới</span>
                    </button>
                </Link>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Tạo gần đây
                </div>
                <div className="space-y-1 overflow-y-auto max-h-[calc(100vh-200px)]">
                    {recentDocs.map((doc) => (
                        <Link key={doc.id} href={`/document/${doc.id}`} passHref>
                            <div className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-gray-800 cursor-pointer transition-colors duration-200 group">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-green-500 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span className="text-sm text-gray-900 group-hover:text-white transition-colors duration-200 truncate">
                                    {doc.title}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

