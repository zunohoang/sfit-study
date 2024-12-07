
/**
 * Project: study.sfit.com.vn
 * Author: zunohoang (https://github.com/zunohoang)
 * Email: nguyenvanhoang2005nt@gmail.com
 */

'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import { Book, Clock, Users, CalendarDays, MessageSquare, Code, ChevronLeft, ChevronDown, ChevronUp, Bell, User, Facebook, Youtube, Github, Plus } from 'lucide-react'
import DisplayContent from '@/components/DisplayContent'
import axios from 'axios'
import { useRouter, usePathname } from "next/navigation";
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-cpp'
import 'prismjs/themes/prism.css'
import AlertModel from '@/components/AlertModel'
import TextEditor from '@/components/EditerContent'
import Problems from '@/components/Problems'

// Mock data for the class details
const classDetailsV1 = {
    id: 1,
    name: 'Đang loading... máy chủ yếu',
    description: '.',
    instructor: '',
    duration: '',
    students: 25,
    startDate: '',
    sessions: [
        { id: 1, title: '', date: '15/01/2024', time: '19:00 - 21:00' },
        { id: 2, title: '', date: '22/01/2024', time: '19:00 - 21:00' },
        { id: 3, title: '', date: '29/01/2024', time: '19:00 - 21:00' },
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
            title: '',
            dueDate: '21/01/2024',
            description: '.',
            subTasks: [
                { id: 1, title: 'Câu 1', description: '' },
                { id: 2, title: 'Câu 2', description: '' },
                { id: 3, title: 'Câu 3', description: '' },
            ]
        },
        {
            id: 2,
            title: '',
            dueDate: '',
            description: '.',
            subTasks: [
                { id: 1, title: '', description: '' },
                { id: 2, title: '', description: '' },
                { id: 3, title: '', description: '' },
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
    const [activeTab, setActiveTab] = useState<string>('assignments')
    const [expandedAssignment, setExpandedAssignment] = useState<number | null>(null)
    const [subTaskCode, setSubTaskCode] = useState<SubTaskCode>({})
    const [classDetails, setClassDetails] = useState<any>(classDetailsV1)
    const pathName = usePathname();
    const classroomId = pathName.split('/')[2];
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [titleModel, setTitleModel] = useState('')
    const [messageModel, setMessageModel] = useState('')
    const [typeModel, setTypeModel] = useState<'success' | 'warning' | 'confirmation'>('confirmation')
    const [urlModel, setUrlModel] = useState('')
    const [role, setRole] = useState('')
    const [userId, setUserId] = useState('')

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
                        { id: 1, title: 'Chào mừng đến với lớp học!', content: classroom.news, date: '**/**/2024' },
                    ]
                    if (classroom.teachers) {
                        const teachers = classroom.teachers;
                        const userId1 = localStorage.getItem('id');
                        if (teachers.includes(userId1)) {
                            setHasRolEdit(true);
                        }
                    }
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
                    setLoading(false);
                }
            }
        }

        callApiClasses();
        setRole(localStorage.getItem('role') || '');
        setUserId(localStorage.getItem('id') || '');
    }, []);

    const [hasRolEdit, setHasRolEdit] = useState(false);

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
        setLoading(true);
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
                setLoading(false);
                setTitleModel('Thành công');
                setMessageModel('Nộp bài thành công ấn tiếp tục để tiếp tục');
                setTypeModel('success');
                setUrlModel('/classes/' + classroomId);
                setIsModalOpen(true);
            } else {
                setLoading(false);
                setTitleModel('Thất bại');
                setMessageModel('Nộp bài thất bại hãy thử lại sau ít phút');
                setTypeModel('warning');
                setUrlModel('');
                setIsModalOpen(true);
            }
        } catch (error) {
            setLoading(false);
            setTitleModel('Thất bại');
            setMessageModel('Nộp bài thất bại hãy thử lại sau ít phút');
            setTypeModel('warning');
            setUrlModel('');
            setIsModalOpen(true);
        }
    }

    const [newProblem, setNewProblem] = useState<any>({
        title: '',
        description: '',
        deadline: '',
        classroomId: null,
        problems: []
    })

    const addAssignment = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        console.log(newProblem);
        try {
            const email: any = localStorage.getItem('email');
            const password: any = localStorage.getItem('password');
            newProblem.classroomId = classroomId;
            const response: any = await axios.post('/api/admins/assignments', {
                classroomId: classroomId,
                title: newProblem.title,
                deadline: newProblem.deadline,
                description: newProblem.description,
                problems: newProblem.problems
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${btoa(`${email}:${password}`)}`
                }
            })
            const data: any = response.data;
            console.log(data);
            if (data.success) {
                setLoading(false);
                setTitleModel('Thành công');
                setMessageModel('Tạo bài tập thành công ấn tiếp tục để tiếp tục');
                setTypeModel('success');
                setUrlModel('/classes/' + classroomId);
                setIsModalOpen(true);
            } else {
                setLoading(false);
                setTitleModel('Thất bại');
                setMessageModel('Tạo bài tập thất bại hãy thử lại sau ít phút');
                setTypeModel('warning');
                setUrlModel('');
                setIsModalOpen(true);
            }
        } catch (error) {
            setLoading(false);
            setTitleModel('Thất bại');
            setMessageModel('Tạo bài tập thất bại hãy thử lại sau ít phút');
            setTypeModel('warning');
            setUrlModel('');
            setIsModalOpen(true);
        }
    }


    return (
        <main className="flex-grow bg-gray-100">
            {
                isModalOpen && (
                    <AlertModel
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        type={typeModel}
                        title={titleModel}
                        message={messageModel}
                        goto={urlModel}
                    />
                )
            }
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
                    <div className="flex items-center mb-6">
                        <Link href="/classes" className="mr-4">
                            <ChevronLeft className="h-6 w-6 text-gray-500" />
                        </Link>
                        <h1 className="text-3xl font-bold text-green-600">{classDetails.title}</h1>
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
                                        Khung
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">18:00 - 20:00</dd>
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
                                                <Link href={'/docs'}>Ấn vào đây để xem tài liệu</Link>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {activeTab === 'members' && (
                            <ul className="divide-y divide-gray-200">
                                {
                                    classDetails.teacher && classDetails.teacher.split(',').map((teacher: any, index: any) => (
                                        <li key={index}>
                                            <div className="px-4 py-4 sm:px-6">
                                                <div className="flex items-center justify-between">
                                                    <div className='flex items-center gap-2'>
                                                        <User className="h-5 w-5 text-gray-600" />
                                                        <p className="text-sm font-bold text-gray-600 truncate">{teacher.trim()}</p>
                                                        <p className="text-sm font-medium text-gray-400 truncate">Ban chuyên môn</p>
                                                    </div>
                                                    <div className="ml-2 flex-shrink-0 flex">
                                                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-300 text-green-800">
                                                            Người đứng lớp
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                }
                                {classDetails.students.map((member: any) => (
                                    <li key={member._id}>
                                        <div className="px-4 py-4 sm:px-6">
                                            <div className="flex items-center justify-between">
                                                <div className='flex items-center gap-2'>
                                                    <User className="h-5 w-5 text-gray-600" />
                                                    <p className="text-sm font-medium text-gray-600 truncate">{member.fullName}</p>
                                                    <p className="text-sm font-medium text-gray-400 truncate">{member.loptruong}</p>
                                                </div>
                                                <div className="ml-2 flex-shrink-0 flex">
                                                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-700">
                                                        Học viên
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {activeTab === 'assignments' && (
                            <div>
                                <ul className="divide-y divide-gray-200">
                                    {classDetails.assignments && classDetails.assignments.map((assignment: any, index: number) => (
                                        <li key={index}>
                                            <div className="px-4 py-4 sm:px-6">
                                                <div className="flex items-center justify-between">
                                                    <div className='flex'>
                                                        <p className="text-sm font-medium text-green-600 truncate">{assignment.title}</p>
                                                    </div>
                                                    <div className="ml-2 flex-shrink-0 flex">
                                                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                            Hạn nộp: {assignment.deadline}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="mt-2">
                                                    {/* <div className="text-sm text-gray-500" dangerouslySetInnerHTML={assignment.description}></div> */}
                                                    <DisplayContent content={assignment.description} className={'text-sm text-gray-500'} />
                                                </div>
                                                <div className="mt-2 flex items-center gap-3">
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
                                                    {
                                                        subTaskCode[assignment._id] ? (
                                                            <>
                                                                <p className="text-sm font-medium text-green-900 bg-green-200 px-2 rounded-xl">Đã làm</p>
                                                                {assignment.ans != null ? (<Link href={`/docs/${assignment.ans}`} className='text-sky-500 text-sm hover:bg-sky-100 hover:text-sky-900 px-1 rounded-md' target="_blank">Đáp án</Link>) : ""}
                                                            </>
                                                        ) : (
                                                            <>
                                                                <p className="text-sm font-medium text-red-900 bg-red-200 px-2 rounded-xl">Chưa làm</p>
                                                                {assignment.ans != null ? (<Link href={`/docs/${assignment.ans}`} className='text-sky-500 text-sm hover:bg-sky-100 hover:text-sky-900 px-1 rounded-md' target="_blank">Đáp án</Link>) : ""}
                                                            </>
                                                        )
                                                    }
                                                </div>
                                                {expandedAssignment === assignment._id && (
                                                    <div className="mt-4 space-y-4 flex flex-col">
                                                        {assignment.problems.map((subTask: any, index: any) => (
                                                            <div key={index} className="border rounded-md p-4">
                                                                {/* <h4 className="text-lg font-medium">{"Bài " + (index + 1)}</h4> */}
                                                                {/* <p className="mt-1 text-sm text-gray-500">{subTask}</p> */}
                                                                <DisplayContent content={subTask} />
                                                                <div className='h-2'>
                                                                </div>
                                                                <p className='text-sm font-medium px-2 py-1 rounded-t-md border border-b-0 w-fit'> bai{index + 1}.c</p>
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
                                                                    className='border rounded-r-md rounded-b-md rounded-se-md outline-none'
                                                                />
                                                            </div>
                                                        ))}
                                                        <button
                                                            onClick={() => submitCode(assignment._id)}
                                                            className='bg-green-500 ml-auto hover:bg-green-600 text-white font-bold py-2 px-4 rounded inline-flex items-center'
                                                            onMouseDown={(e) => e.preventDefault()}
                                                        >
                                                            Nộp bài
                                                        </button>
                                                        <p className="text-sm text-gray-400">* Cẩn thận code lỏ</p>
                                                    </div>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                {(hasRolEdit) ? (<div>
                                    <div className='h-[1px] bg-slate-300 mx-6 mt-6' ></div>
                                    <div className="px-4 py-5 sm:p-6">
                                        <h3 className="text-lg leading-6 font-medium text-green-500 mb-4">Tạo bài tập mới</h3>
                                        <form onSubmit={addAssignment} className="mt-6">
                                            <div className="grid grid-cols-1 gap-y-6 gap--x-4 sm:grid-cols-6">
                                                <div className="sm:col-span-3">
                                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                                        Tiêu đề
                                                    </label>
                                                    <div className="mt-1">
                                                        <input
                                                            type="text"
                                                            name="title"
                                                            id="title"
                                                            placeholder='Điền kiểu: Buổi 1 - Lệnh rẽ nhánh, Toán tử'
                                                            value={newProblem.title}
                                                            onChange={(e) => setNewProblem({ ...newProblem, title: e.target.value })}
                                                            className="py-2 outline-none shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-2">
                                                    <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                                                        Hạn nộp
                                                    </label>
                                                    <div className="mt-1">
                                                        <input
                                                            type="date"
                                                            name="dueDate"
                                                            id="dueDate"
                                                            value={newProblem.deadline}
                                                            onChange={(e) => setNewProblem({ ...newProblem, deadline: e.target.value })}
                                                            className="py-2 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-6">
                                                    <p className="block text-sm font-medium text-gray-700">
                                                        Nội dung
                                                    </p>
                                                    <div className="mt-1">
                                                        {/* <textarea
                                                        id="description"
                                                        name="description"
                                                        rows={3}
                                                        className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                        value={newAssignment.description}
                                                        onChange={(e) => handleInputChange(e, setNewAssignment)}
                                                    /> */}
                                                        <TextEditor content={newProblem.description} setContent={(value) => setNewProblem((pre: any) => {
                                                            return { ...pre, description: value }
                                                        })} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=''>
                                                <div className='flex'>
                                                    <h1 className='text-sm font-medium text-gray-700'>Bài tập con</h1>
                                                </div>
                                                <div className="mt-2 rounded-md bg-gray-100 p-4">
                                                    {
                                                        newProblem.problems && newProblem.problems.map((problem: any, index: any) => (
                                                            <div key={index} className="bg-white p-2 my-2 rounded-md">
                                                                <p className="text-sm font-medium text-gray-700">Bài {index + 1}</p>
                                                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                                                    Nội dung
                                                                </label>
                                                                <div className="mt-1">
                                                                    <TextEditor content={problem} setContent={(value) => setNewProblem((prev: any) => ({ ...prev, problems: prev.problems.map((p: any, i: any) => i === index ? value : p) }))} />
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                    <div className='w-fit flex items-center gap-2 text-gray-100 p-2 rounded-md ml-2 bg-green-500' onClick={() => setNewProblem((newProblem: any) => {
                                                        return { ...newProblem, problems: [...newProblem.problems, 'Bài....'] }
                                                    })}>
                                                        <Plus className='h-5 w-5' />
                                                        Thêm bài tập con
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-6 flex justify-end">
                                                <button
                                                    type="submit"
                                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" >
                                                    <Plus className="mr-2 h-5 w-5" />
                                                    Thêm bài tập
                                                </button>
                                            </div>
                                        </form>
                                        <br />
                                    </div>
                                    <div className='h-[1px] bg-slate-300 mx-6' ></div>
                                    <Problems assignments={classDetails.assignments} classrooms={classDetails} />
                                </div>) : ""}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}