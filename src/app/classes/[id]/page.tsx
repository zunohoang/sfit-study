'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Book, Clock, Users, CalendarDays, MessageSquare, Code, ChevronLeft, ChevronDown, ChevronUp, Bell, User, Facebook, Youtube, Github } from 'lucide-react'
import DisplayContent from '@/components/DisplayContent'
import axios from 'axios'
import { useRouter, usePathname } from "next/navigation";
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-cpp'
import 'prismjs/themes/prism.css'

// Mock data for the class details
const classDetailsV1 = {
    id: 1,
    name: 'Lập trình Web với React',
    description: 'Học cách xây dựng ứng dụng web hiện đại với React và các công nghệ liên quan.',
    instructor: 'Nguyễn Văn A',
    duration: '8 tuần',
    students: 25,
    startDate: '15/01/2024',
    sessions: [
        { id: 1, title: 'Giới thiệu về React', date: '15/01/2024', time: '19:00 - 21:00' },
        { id: 2, title: 'Components và Props', date: '22/01/2024', time: '19:00 - 21:00' },
        { id: 3, title: 'State và Lifecycle', date: '29/01/2024', time: '19:00 - 21:00' },
    ],
    announcements: [
        { id: 1, title: 'Chào mừng đến với khóa học!', content: 'Chúng ta sẽ bắt đầu vào tuần tới. Hãy chuẩn bị sẵn sàng!', date: '10/01/2024' },
        { id: 2, title: 'Bài tập tuần 1', content: 'Bài tập đã được đăng tải. Hạn nộp là 21/01/2024.', date: '15/01/2024' },
    ],
    members: [
        { id: 1, name: 'Trần Thị B', role: 'Học viên' },
        { id: 2, name: 'Lê Văn C', role: 'Học viên' },
        { id: 3, name: 'Phạm Thị D', role: 'Trợ giảng' },
    ],
    assignments: [
        {
            id: 1,
            title: 'Tạo component đầu tiên',
            dueDate: '21/01/2024',
            description: 'Tạo một component React đơn giản hiển thị thông tin cá nhân.',
            subTasks: [
                { id: 1, title: 'Câu 1', description: 'Copy câu 1 dán vào đây' },
                { id: 2, title: 'Câu 2', description: 'Thêm props cho tên, tuổi, và sở thích' },
                { id: 3, title: 'Câu 3', description: 'Sử dụng CSS module để tạo style cho component' },
            ]
        },
        {
            id: 2,
            title: 'Xây dựng ứng dụng Todo',
            dueDate: '28/01/2024',
            description: 'Xây dựng một ứng dụng Todo sử dụng React hooks.',
            subTasks: [
                { id: 1, title: 'Tạo component TodoList', description: 'Tạo một component để hiển thị danh sách các todo' },
                { id: 2, title: 'Thêm chức năng thêm todo', description: 'Tạo form và xử lý việc thêm todo mới' },
                { id: 3, title: 'Thêm chức năng xóa todo', description: 'Thêm nút và xử lý việc xóa todo' },
            ]
        },
    ],
}

interface TabButtonProps {
    id: string
    label: string
}

interface SubTaskCode {
    [assignmentId: number]: {
        [subTaskId: number]: string
    }
}

export default function ClassDetails() {
    const [activeTab, setActiveTab] = useState<string>('sessions')
    const [expandedAssignment, setExpandedAssignment] = useState<number | null>(null)
    const [subTaskCode, setSubTaskCode] = useState<SubTaskCode>({})
    const [classDetails, setClassDetails] = useState<any>(classDetailsV1)
    const pathName = usePathname();
    const classroomId = pathName.split('/')[2];

    useEffect(() => {
        async function callApiClasses() {
            const email: any = localStorage.getItem('email');
            const password: any = localStorage.getItem('password');
            const response: any = await axios.get('/api/users/classes?id=' + classroomId, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${btoa(`${email}:${password}`)}`
                }
            });
            const data = response.data;
            if (data.success) {
                console.log(data.data.classroom);
                const classroom = data.data.classroom;
                const codes = data.data.codes;
                console.log(codes);
                if (classroom) {
                    console.log(classroom);
                    classroom.sessions = [
                        { id: 1, title: 'Buổi 1. Mẫu', date: '**/**/2024', time: '18:00 - 20:00' },
                    ]
                    classroom.announcements = [
                        { id: 1, title: 'Chào mừng đến với lớp học!', content: 'Chúng ta sẽ bắt đầu vào tuần tới. Hãy chuẩn bị sẵn sàng!', date: '**/**/2024' },
                        { id: 2, title: 'Test', content: 'Phiên bản beta', date: '**/**/2024' },
                    ]
                    classroom.students = []
                    setSubTaskCode((subTaskCode: any) => {
                        const newSubTaskCode: SubTaskCode = {}
                        // lay du lieu trong classroom.codes
                        if (!codes) return newSubTaskCode;
                        codes.forEach((code: any) => {
                            newSubTaskCode[code.assignment] = code.codes
                        })
                        return newSubTaskCode
                    })
                    setClassDetails(classroom);
                }
            }
        }

        callApiClasses();
    }, []);

    const TabButton = ({ id, label }: TabButtonProps) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`px-4 py-2 font-medium text-sm rounded-md ${activeTab === id
                ? 'bg-green-500 text-white'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
        >
            {label}
        </button>
    )

    const handleAssignmentToggle = (assignmentId: number) => {
        setExpandedAssignment(expandedAssignment === assignmentId ? null : assignmentId)
    }

    const handleCodeChange = (assignmentId: number, subTaskId: number, code: string) => {
        setSubTaskCode(prevState => ({
            ...prevState,
            [assignmentId]: {
                ...(prevState[assignmentId] || {}),
                [subTaskId]: code
            }
        }))
    }

    const submitCode = async (assignmentId: any) => {
        console.log(subTaskCode);
        // get id in subtask
        const subTask: any = subTaskCode[assignmentId];
        console.log(subTask);
        // chuyen subTask sang array
        const subTaskArray = Object.keys(subTask).map((key) => subTask[key]);
        try {
            const email: any = localStorage.getItem('email');
            const password: any = localStorage.getItem('password');
            const response: any = await axios.post('/api/users/codes', {
                assignmentId: assignmentId,
                codes: subTaskArray
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${btoa(`${email}:${password}`)}`
                }

            })

            const data: any = response.data;
            console.log(data);
            console.log(response);

            if (data.success) {
                alert('Nộp bài thành công');
            } else {
                alert('Nộp bài thất bại');
            }
        } catch (error) {
            alert('Nộp bài thât bại')
        }
    }

    return (
        <main className="flex-grow bg-gray-100">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="flex items-center mb-6">
                        <Link href="/classes" className="mr-4">
                            <ChevronLeft className="h-6 w-6 text-gray-500" />
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900">{classDetails.title}</h1>
                    </div>

                    <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium text-green-600">Thông tin lớp học</h3>
                        </div>
                        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                            <dl className="sm:divide-y sm:divide-gray-200">
                                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                                        <Book className="mr-2 h-5 w-5" />
                                        Giảng viên
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{classDetails.teacher}</dd>
                                </div>
                                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                                        <Clock className="mr-2 h-5 w-5" />
                                        Thời lượng
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{classDetails.time}</dd>
                                </div>
                                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                                        <Users className="mr-2 h-5 w-5" />
                                        Số lượng học viên
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{classDetails.studentNum}</dd>
                                </div>
                                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                                        <CalendarDays className="mr-2 h-5 w-5" />
                                        Ngày bắt đầu
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">**/**/2024</dd>
                                </div>
                            </dl>
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="sm:hidden">
                            <label htmlFor="tabs" className="sr-only">
                                Select a tab
                            </label>
                            <select
                                id="tabs"
                                name="tabs"
                                className="block w-full rounded-md border-gray-300 focus:border-green-500 focus:ring-green-500"
                                onChange={(e) => setActiveTab(e.target.value)}
                                value={activeTab}
                            >
                                <option value="sessions">Buổi học</option>
                                <option value="announcements">Bảng tin</option>
                                <option value="members">Thành viên</option>
                                <option value="assignments">Bài tập</option>
                            </select>
                        </div>
                        <div className="hidden sm:block">
                            <div className="border-b border-gray-200">
                                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                                    <TabButton id="sessions" label="Buổi học" />
                                    <TabButton id="announcements" label="Bảng tin" />
                                    <TabButton id="members" label="Thành viên" />
                                    <TabButton id="assignments" label="Bài tập" />
                                </nav>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        {activeTab === 'sessions' && (
                            <ul className="divide-y divide-gray-200">
                                {classDetails.sessions.map((session: any) => (
                                    <li key={session.id}>
                                        <div className="px-4 py-4 sm:px-6">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-medium text-green-600 truncate">{session.title}</p>
                                                <div className="ml-2 flex-shrink-0 flex">
                                                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        {session.date}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="mt-2 sm:flex sm:justify-between">
                                                <div className="sm:flex">
                                                    <p className="flex items-center text-sm text-gray-500">
                                                        <Clock className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                                        {session.time}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {activeTab === 'announcements' && (
                            <ul className="divide-y divide-gray-200">
                                {classDetails.announcements.map((announcement: any) => (
                                    <li key={announcement.id}>
                                        <div className="px-4 py-4 sm:px-6">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-medium text-green-600 truncate">{announcement.title}</p>
                                                <div className="ml-2 flex-shrink-0 flex">
                                                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        {announcement.date}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">{announcement.content}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {activeTab === 'members' && (
                            <ul className="divide-y divide-gray-200">
                                {classDetails.students.map((member: any) => (
                                    <li key={member._id}>
                                        <div className="px-4 py-4 sm:px-6">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-medium text-gray-900 truncate">{member.name}</p>
                                                <div className="ml-2 flex-shrink-0 flex">
                                                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                                        {member.role}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {activeTab === 'assignments' && (
                            <ul className="divide-y divide-gray-200">
                                {classDetails.assignments.map((assignment: any) => (
                                    <li key={assignment._id}>
                                        <div className="px-4 py-4 sm:px-6">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-medium text-green-600 truncate">{assignment.title}</p>
                                                <div className="ml-2 flex-shrink-0 flex">
                                                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        Hạn nộp: {assignment.deadline}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">{assignment.description}</p>
                                            </div>
                                            <div className="mt-2">
                                                <button
                                                    onClick={() => handleAssignmentToggle(assignment._id)}
                                                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                                >
                                                    {expandedAssignment === assignment._id ? (
                                                        <>
                                                            <ChevronUp className="mr-2 h-4 w-4" />
                                                            Ẩn bài tập con
                                                        </>
                                                    ) : (
                                                        <>
                                                            <ChevronDown className="mr-2 h-4 w-4" />
                                                            Xem bài tập con
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                            {expandedAssignment === assignment._id && (
                                                <div className="mt-4 space-y-4 flex flex-col">
                                                    {assignment.problems.map((subTask: any, index: any) => (
                                                        <div key={index} className="border rounded-md p-4">
                                                            {/* <h4 className="text-lg font-medium">{"Bài " + (index + 1)}</h4> */}
                                                            {/* <p className="mt-1 text-sm text-gray-500">{subTask}</p> */}
                                                            <DisplayContent content={subTask} />
                                                            {/* <textarea
                                                                className="mt-2 w-full h-32 p-2 border rounded-md"
                                                                placeholder="Dán code của bạn ở đây..."
                                                                value={subTaskCode[assignment._id]?.[index] || ''}
                                                                onChange={(e) => handleCodeChange(assignment._id, index, e.target.value)}
                                                            /> */}
                                                            <Editor
                                                                value={subTaskCode[assignment._id]?.[index] || "#include <stdio.h>\nint main(){\n\n     return 0;\n}"}
                                                                onValueChange={(code: any) => handleCodeChange(assignment._id, index, code)}
                                                                highlight={(code: string) => highlight(code || "", languages.cpp, 'cpp')}
                                                                padding={10}
                                                                style={{
                                                                    fontFamily: '"Fira code", "Fira Mono", monospace',
                                                                    fontSize: 14,
                                                                }}
                                                                className='border rounded-md mt-2 outline-none'
                                                            />
                                                        </div>
                                                    ))}
                                                    <button onClick={() => submitCode(assignment._id)} className='bg-green-500 ml-auto hover:bg-green-600 text-white font-bold py-2 px-4 rounded inline-flex items-center'>
                                                        Nộp bài
                                                    </button>
                                                    <p className="text-sm text-gray-400">* Cẩn thận code lỏ</p>
                                                </div>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}