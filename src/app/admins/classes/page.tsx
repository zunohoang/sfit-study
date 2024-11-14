'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { Book, Plus, Trash2 } from 'lucide-react'
import TextEditor from '@/components/EditerContent'

interface Class {
    id: number
    name: string
    instructor: string
    time: string
    students: number
    description: string
}

export default function ManageClasses() {
    const [classes, setClasses] = useState<Class[]>([
        { id: 1, name: 'Lập trình Web với React', instructor: 'Nguyễn Văn A', time: '2024-01-15', students: 25, description: 'Học lập trình web với ReactJS' },
        { id: 2, name: 'Python cho Data Science', instructor: 'Trần Thị B', time: '2024-01-20', students: 30, description: 'Học Python cho Data Science' },
    ])
    const [newClass, setNewClass] = useState<Omit<Class, 'id'>>({ name: '', instructor: '', time: '', students: 0, description: '' })

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setNewClass({ ...newClass, [name]: name === 'students' ? parseInt(value) : value })
    }

    const addClass = (e: FormEvent) => {
        e.preventDefault()
        const id = classes.length + 1
        setClasses([...classes, { id, ...newClass }])
        setNewClass({ name: '', instructor: '', time: '', students: 0, description: '' })
    }

    const removeClass = (id: number) => {
        setClasses(classes.filter(c => c.id !== id))
    }

    return (
        <main className="flex-grow bg-gray-100">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <h1 className="text-3xl font-bold text-green-600 mb-6">Quản lý lớp học</h1>

                    <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Thêm lớp học mới</h3>
                            <form onSubmit={addClass} className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Tên lớp học</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={newClass.name}
                                        onChange={handleInputChange}
                                        required
                                        className="p-2 mt-1 focus:ring-green-500 focus:border-green-500 w-full shadow-sm shadow-gray-300 sm:text-sm border-gray-400 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="instructor" className="block text-sm font-medium text-gray-700">Giảng viên</label>
                                    <input
                                        type="text"
                                        name="instructor"
                                        id="instructor"
                                        value={newClass.instructor}
                                        onChange={handleInputChange}
                                        required
                                        className="p-2 mt-1 focus:ring-green-500 focus:border-green-500 w-full shadow-sm shadow-gray-300 sm:text-sm border-gray-400 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="time" className="block text-sm font-medium text-gray-700">Thời gian 1 buổi</label>
                                    <input
                                        type="text"
                                        name="time"
                                        id="time"
                                        value={newClass.time}
                                        onChange={handleInputChange}
                                        required
                                        className="p-2 mt-1 focus:ring-green-500 focus:border-green-500 w-full shadow-sm shadow-gray-300 sm:text-sm border-gray-400 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="students" className="block text-sm font-medium text-gray-700">Số lượng học viên</label>
                                    <input
                                        type="text"
                                        name="students"
                                        id="students"
                                        value={newClass.students}
                                        onChange={handleInputChange}
                                        required
                                        className="p-2 mt-1 focus:ring-green-500 focus:border-green-500 w-full shadow-sm shadow-gray-300 sm:text-sm border-gray-400 rounded-md"
                                    />
                                </div>
                                <div className='w-full col-span-2'>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                                    <TextEditor content={newClass.description} setContent={(value) => setNewClass({ ...newClass, description: value })} />
                                </div>
                                <div className="sm:col-span-2">
                                    <button
                                        type="submit"
                                        className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                    >
                                        <Plus className="mr-2 h-5 w-5" />
                                        Thêm lớp học
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Danh sách lớp học</h3>
                        </div>
                        <div className="border-t border-gray-200">
                            <ul className="divide-y divide-gray-200">
                                {classes.map((cls) => (
                                    <li key={cls.id} className="px-4 py-4 sm:px-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0">
                                                    <Book className="h-8 w-8 text-green-500" />
                                                </div>
                                                <div className="ml-4">
                                                    <h4 className="text-lg font-medium text-gray-900">{cls.name}</h4>
                                                    <p className="text-sm text-gray-500">Giảng viên: {cls.instructor}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="mr-4 flex flex-col items-end">
                                                    <p className="text-sm text-gray-900">Ngày bắt đầu: {cls.time}</p>
                                                    <p className="text-sm text-gray-500">Số học viên: {cls.students}</p>
                                                </div>
                                                <button
                                                    onClick={() => removeClass(cls.id)}
                                                    className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                >
                                                    <Trash2 className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}