'use client';

import { useState } from 'react'
import { Calendar, AlertTriangle, Menu, User } from 'lucide-react'
import { Plus, Settings, Home, GraduationCap, HelpCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { AsyncLocalStorage } from 'async_hooks';
import Link from 'next/link'

interface Assignment {
    _id: number
    title: string
    dueDate: string
    isActive?: boolean
}

export default function ClassroomAssignments() {
    const [activeTab, setActiveTab] = useState<string>('assignments')
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
    const router = useRouter();

    const classes = [
        {
            _id: 1,
            name: "Tin đại cương (Thứ 2)",
            teacher: "Ban chuyên môn",
            color: "bg-sky-800",
            initial: "T2"
        },
        {
            _id: 2,
            name: "Tin đại cương (Thứ 3)",
            teacher: "Ban chuyên môn",
            color: "bg-slate-700",
            initial: "T3"
        }
        ,
        {
            _id: 3,
            name: "Tin đại cương (Thứ 4)",
            teacher: "Ban chuyên môn",
            color: "bg-sky-700",
            initial: "T4"
        }
    ]

    return (
        <div className="bg-gradient-to-tl from-sky-50 to-white w-full mx-auto min-h-screen">
            {/* Navigation Tabs */}
            <nav className="border-b">
                <div className="flex space-x-8 px-6 sm:space-x-4 sm:px-4">
                    <button
                        onClick={() => setActiveTab('stream')}
                        className={`py-4 px-2 relative ${activeTab === 'stream' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                    >
                        Bảng tin
                    </button>
                    <button
                        onClick={() => setActiveTab('assignments')}
                        className={`py-4 px-2 relative ${activeTab === 'assignments' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                    >
                        Danh sách lớp
                    </button>
                </div>
            </nav>

            {/* Content based on active tab */}
            <div className="p-4">
                {activeTab === 'stream' && (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Ra mắt phiên bản V.0.0</h2>
                        <div className='flex'>
                            <p className="text-gray-600 leading-relaxed">
                                Đây là phiên bản vừa được code trong 2 tiếng nên còn sơ sài, update sau nhé!
                            </p>
                            <div className="ml-auto text-sm text-gray-500">
                                <p>Đăng bởi: <span className="font-medium text-gray-700">zunohoang</span></p>
                                <p>Thời gian: <span className="font-medium text-gray-700">11/11/2024 19:30</span></p>
                                <p>Lượt xem: <span className="font-medium text-gray-700">32</span></p>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === 'assignments' && (
                    <div>
                        {/* Main Content */}
                        <main className="flex-1 p-6">
                            <div className='flex gap-4 mb-2'>
                                <input type="text" placeholder="Nhập mã lớp" className="w-52 p-2 border rounded-lg" />
                                <button className="bg-sky-600 text-white rounded-lg w-24">Thêm</button>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                {classes.map((classItem): any => (
                                    <Link key={classItem._id} href={`/classrooms/${classItem._id}`} className="overflow-hidden rounded-lg border bg-white shadow-sm">
                                        <div className={`h-24 relative ${classItem.color} p-4`}>
                                            <div className="flex justify-between">
                                                <h2 className="text-lg font-medium text-white">{classItem.name}</h2>
                                                <button className="text-white/80 hover:text-white">
                                                    <Settings className="h-5 w-5" />
                                                </button>
                                            </div>
                                            <p className="text-sm text-white/90">{classItem.teacher}</p>
                                        </div>
                                        <div className="relative h-[100px]">
                                            <div className="absolute -top-8 right-4 h-16 w-16 rounded-full bg-purple-600 flex items-center justify-center text-white text-xl">
                                                {classItem.initial}
                                            </div>
                                        </div>
                                        <div className="border-t p-3 flex justify-end space-x-4">
                                            <button className="p-2 hover:bg-gray-100 rounded-full">
                                                <GraduationCap className="h-5 w-5 text-gray-600" />
                                            </button>
                                            <button className="p-2 hover:bg-gray-100 rounded-full">
                                                <Settings className="h-5 w-5 text-gray-600" />
                                            </button>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </main>
                    </div>
                )}
                {activeTab === 'people' && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Mọi người</h2>
                        <p>Cập nhật sau...</p>
                    </div>
                )}
            </div>
        </div >
    )
}