'use client';

import { useState } from 'react'
import { Calendar, AlertTriangle, Menu, User } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import { AsyncLocalStorage } from 'async_hooks';

interface Assignment {
    _id: number
    title: string
    dueDate: string
    isActive?: boolean
}

export default function ClassroomAssignments() {
    const [activeTab, setActiveTab] = useState('assignments')
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
    const router = useRouter();
    const pathname = usePathname();
    const id = pathname.split('/')[2];

    const assignments: Assignment[] = [
        { _id: 1, title: 'Bài tập Buổi 2 (Toán tử, Lệnh rẽ nhánh)', dueDate: '18/11/2024' },
    ]

    const handleSubmitHomeword = (assignmentId: number) => {
        router.push(`/classrooms/${id}/homework/${assignmentId}`);
    }

    return (
        <div className="bg-gradient-to-tl from-sky-50 to-white w-full mx-auto min-h-screen">

            <div className='p-4'>
                <button onClick={() => router.back()} className="text-gray-500 p-2 rounded hover:bg-gray-200">
                    ← Quay lại
                </button>
                <h1 className="text-xl font-medium">
                    Tin Đại Cương (Thứ 2)
                </h1>
                <p className="text-gray-600 leading-relaxed">
                    Bài tập
                </p>
            </div>
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
                        <h2 className="text-xl font-semibold mb-4">Bài tập</h2>
                        {/* <button className="flex items-center text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md mb-4">
                            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm mr-3">
                                ✓
                            </div>
                            Xem bài tập của bạn
                        </button> */}
                        <div className="px-4 flex flex-col gap-4">
                            {assignments.map((assignment, index): any => (
                                <div
                                    key={assignment._id}
                                    className="flex items-center justify-between py-4 border rounded-md px-5 hover:bg-gray-50 cursor-pointer"
                                >
                                    <div className="items-center">
                                        <span className="text-gray-800">{assignment.title}</span>
                                        <span className="ml-1 text-gray-400 block">by: zunohoang</span>                                    </div>
                                    <div className=''>
                                        <button onClick={() => handleSubmitHomeword(assignment._id)} className="bg-sky-700 mr-5 p-2 rounded-xl text-white">Nộp bài</button>
                                        <span className="text-sm text-gray-500">{assignment.dueDate}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
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