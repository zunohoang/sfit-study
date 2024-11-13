'use client';

import { useState } from 'react'
import { Calendar, AlertTriangle, Menu, User } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Assignment {
    _id: number
    title: string
    dueDate: string
    isActive?: boolean
}

export default function ClassroomAssignments() {
    const [activeTab, setActiveTab] = useState('assignments')
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const router = useRouter();

    const assignments: Assignment[] = [
        { _id: 1, title: 'Bài tập Buổi 2 (Toán tử, Lệnh rẽ nhánh)', dueDate: '18/11/2024' },
        { _id: 2, title: 'Bài tập Buổi 2 (Toán tử, Lệnh rẽ nhánh)', dueDate: '18/11/2024' },
    ]

    const handleSubmitHomeword = (assignmentId: number) => {
        router.push(`/classroom/assignments/${assignmentId}`)
    }

    return (
        <div className="w-full mx-auto bg-white min-h-screen">
            {/* Header */}
            <header className="flex justify-between items-center p-4 border-b sm:flex-col sm:items-start md:flex-row md:items-center">
                <div className="flex items-center space-x-4 mb-4 sm:mb-2">
                    <Menu className="h-6 w-6 text-gray-500" />
                    <h1 className="text-xl font-medium">Tin Đại Cương (Thứ 2)</h1>
                </div>
                <div className="flex items-center space-x-4">
                    <Calendar className="h-6 w-6 text-gray-500" />
                    <AlertTriangle className="h-6 w-6 text-gray-500" />
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-500" />
                    </div>
                </div>
            </header>

            {/* Navigation Tabs */}
            <nav className="border-b">
                <div className="flex space-x-8 px-6 sm:space-x-4 sm:px-4">
                    <button
                        onClick={() => setActiveTab('stream')}
                        className={`py-4 px-2 relative ${activeTab === 'stream' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                    >
                        Danh sách bài tập
                    </button>
                </div>
            </nav>

        </div >
    )
}