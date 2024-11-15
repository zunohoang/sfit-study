'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Book, Clock, Users, CalendarDays, ChevronRight, Plus, X } from 'lucide-react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import DisplayContent from '@/components/DisplayContent'

export default function Home() {
    const [classes, setClasses] = useState<any>([])
    const [showForm, setShowForm] = useState<any>(false)
    const [newClass, setNewClass] = useState<any>({
        name: '',
        description: '',
        instructor: '',
        duration: '',
        students: 0,
        startDate: '',
        code: '',
    })
    const [loading, setLoading] = useState<boolean>(true)
    const router = useRouter();

    const [classCode, setClassCode] = useState('')

    useEffect(() => {
        async function callApiClasses() {
            const email: any = localStorage.getItem('email');
            const password: any = localStorage.getItem('password');
            if (!email || !password) {
                router.push('/login');
                return;
            }
            const response: any = await axios.get('/api/users/classes', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${btoa(`${email}:${password}`)}`
                }
            });
            const data = response.data;
            if (data.success) {
                console.log(data.data.classrooms);
                setClasses(data.data.classrooms);
                setLoading(false);
            }
        }

        callApiClasses();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value }: any = e.target
        setNewClass((prev: any) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const id: number = classes.length + 1
        setClasses((prev: any) => [...prev, { ...newClass, id }])
        setNewClass({
            name: '',
            description: '',
            instructor: '',
            duration: '',
            students: 0,
            startDate: '',
            code: ''
        })
        setShowForm(false)
    }

    const joinClassByCode = async () => {
        const email: any = localStorage.getItem('email');
        const password: any = localStorage.getItem('password');
        try {
            const response: any = await axios.post('/api/users/classes', {
                classroomCode: classCode
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${btoa(`${email}:${password}`)}`
                }
            });
            const data = response.data;
            if (data.success) {
                console.log(data);
                alert('Tham gia lớp học thành công');
                router.push('/classes/' + classCode);
            } else {
                alert('Mã lớp học không tồn tại');
            }
        } catch (error) {
            alert('Mã lớp học không tồn tại');
        }
    }
    return (
        <main className="flex-grow">
            {
                loading && (
                    <div className="fixed z-10 top-0 flex justify-center items-center w-full bg-black bg-opacity-80 h-screen">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
                        <div className="text-green-700 fixed font-black animate-pulse">
                            SFIT
                        </div>
                        <div className="animate-spin rounded-full h-20 w-20 border-r-2 fixed border-l-2 border-green-400"></div>
                    </div>
                )
            }
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-green-600">Các lớp học tại SFIT</h1>
                        <div className='flex justify-center items-center gap-2 scale-75 sm:scale-100 -ml-10 sm:ml-0'>
                            <input type="text" name="classCode" id="classCode"
                                value={classCode}
                                onChange={(e) => setClassCode(e.target.value)}
                                placeholder="Mã lớp học" className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-green-500 focus:border-green-500" />
                            <button
                                onClick={() => joinClassByCode()}
                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                            >
                                <Plus className="mr-2" />
                                Thêm
                            </button>
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {classes.map((classItem: any) => (
                            <div key={classItem._id} className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="px-4 py-5 sm:p-6">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">{classItem.title}</h3>
                                    <DisplayContent content={classItem.description} className={'mt-1 max-w-2xl text-sm text-gray-500'} />
                                    <div className="mt-6 grid grid-cols-2 gap-4">
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Users className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                            <span>{classItem.studentNum} học viên</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Clock className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                            <span>{classItem.time}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Book className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                            <span>{classItem.teacher}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <CalendarDays className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                            <span>18:00 - 20:00</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-4 sm:px-6">
                                    <Link
                                        href={`/classes/${classItem._id}`}
                                        className="text-sm font-medium text-green-600 hover:text-green-500 flex items-center"
                                    >
                                        Vào lớp ngay
                                        <ChevronRight className="ml-1 h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                        <div className="bg-white overflow-hidden shadow rounded-lg opacity-50 pointer-events-none">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Tin đại cương 2024</h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">Lớp học này chỉ là mô phỏng không tồn tại, nếu đang tìm kiếm lớp thì ib người đứng lớp để nhận mã lớp.</p>
                                <div className="mt-6 grid grid-cols-2 gap-4">
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Users className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                        <span>0 học viên</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Clock className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                        <span>2 giờ</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Book className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                        <span>zunohoang</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <CalendarDays className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                        <span>18:00 - 20:00</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-4 sm:px-6">
                                <Link
                                    href={`/classes/1`}
                                    className="text-sm font-medium text-green-600 hover:text-green-500 flex items-center"
                                >
                                    Vào lớp ngay
                                    <ChevronRight className="ml-1 h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}