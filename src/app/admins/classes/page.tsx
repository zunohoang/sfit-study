'use client'

import { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import { Book, Edit, Plus, Trash2 } from 'lucide-react'
import TextEditor from '@/components/EditerContent'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Class {
    _id: string
    title: string
    teacher: string
    time: string
    students: Array<string>
    studentNum: number
    description: string
}

export default function ManageClasses() {
    const [classes, setClasses] = useState<any>([])
    const [newClass, setNewClass] = useState<any>({ title: '', teacher: '', time: '', students: [], studentNum: 0, description: '' })
    const router = useRouter()
    useEffect(() => {
        const callApiClass = async () => {
            const email = localStorage.getItem('email')
            const password = localStorage.getItem('password')
            const res = await axios.get('/api/admins/classes', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${btoa(`${email}:${password}`)}`
                }
            });

            const data = res.data;
            console.log(data)
            if (data.success) {
                setClasses(data.data.classrooms);
            }
        }
        callApiClass()
    }, [])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setNewClass({ ...newClass, [name]: name === 'studentNum' ? parseInt(value) : value })
    }

    const addClass = async (e: FormEvent) => {
        e.preventDefault()
        console.log(newClass)
        try {
            const email = localStorage.getItem('email')
            const password = localStorage.getItem('password')
            const res = await axios.post('/api/admins/classes', newClass, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${btoa(`${email}:${password}`)}`
                }
            });

            const data = res.data;
            if (data.success) {
                alert('Thêm lớp học thành công')
                router.push('/admins/classes/' + data.data.classroom._id);
            } else {
                alert('Thêm lớp học thất bại')
            }
        } catch (error) {
            console.log(error)
            alert('Thêm lớp học thất bại')
        }
    }

    const removeClass = (id: string) => {
        const check = confirm('Bạn có chắc chắn muốn xóa lớp học này?');
        if (!check) return
        setClasses(classes.filter((c: any) => c._id !== id))
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
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Tên lớp học</label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        value={newClass.title}
                                        onChange={handleInputChange}
                                        required
                                        className="p-2 mt-1 focus:ring-green-500 focus:border-green-500 w-full shadow-sm shadow-gray-300 sm:text-sm border-gray-400 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="teacher" className="block text-sm font-medium text-gray-700">Giảng viên</label>
                                    <input
                                        type="text"
                                        name="teacher"
                                        id="teacher"
                                        value={newClass.teacher}
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
                                    <label htmlFor="studentNum" className="block text-sm font-medium text-gray-700">Số lượng học viên</label>
                                    <input
                                        type="number"
                                        name="studentNum"
                                        id="studentNum"
                                        value={newClass.studentNum}
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
                                {classes && classes.map((cls: any) => (
                                    <li key={cls._id} className="px-4 py-4 sm:px-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0">
                                                    <Book className="h-8 w-8 text-green-500" />
                                                </div>
                                                <div className="ml-4">
                                                    <h4 className="text-lg font-medium text-gray-900">{cls.title}</h4>
                                                    <p className="text-sm text-gray-500">Giảng viên: {cls.teacher}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="mr-4 flex flex-col items-end">
                                                    <p className="text-sm text-gray-900">Thời gian: {cls.time}</p>
                                                    <p className="text-sm text-gray-500">Số học viên: {cls.studentNum}</p>
                                                </div>
                                                <Link
                                                    href={`/admins/classes/${cls._id}`}
                                                    className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                                >
                                                    <Edit className="h-5 w-5" />
                                                </Link>
                                                <button
                                                    onClick={() => removeClass(cls._id)}
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