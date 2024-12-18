
/**
 * Project: study.sfit.com.vn
 * Author: zunohoang (https://github.com/zunohoang)
 * Email: nguyenvanhoang2005nt@gmail.com
 */

'use client'

import { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import Link from 'next/link'
import { Book, Clock, Users, CalendarDays, MessageSquare, Code, ChevronLeft, ChevronDown, ChevronUp, Bell, User, Facebook, Youtube, Github, Plus, Trash2, X, ChevronDownIcon } from 'lucide-react'
import axios from 'axios'
import TextEditor from '@/components/EditerContent'
import { useRouter } from 'next/navigation'
import DisplayContent from '@/components/DisplayContent'
import { useParams } from 'next/navigation'
import Problems from '@/components/Problems'
interface Session {
    id: number
    title: string
    date: string
    time: string
}

interface Announcement {
    id: number
    title: string
    content: string
    date: string
}

interface Member {
    id: number
    name: string
    role: string
}

interface SubTask {
    id: number
    title: string
    description: string
}

interface Submission {
    id: string
    studentName: string
    submissionDate: string
    content: string
}

interface Assignment {
    id: number
    title: string
    dueDate: string
    description: string
    subTasks: SubTask[]
    submissions?: Submission[]
}

interface ClassDetails {
    id: number
    title: string
    deadline: number
    description: string
    teacher: string
    time: string
    studentNum: number
    sessions: Session[]
    announcements: Announcement[]
    students: Member[]
    assignments: Assignment[]
}

export default function ManageClass() {
    const [classDetails, setClassDetails] = useState<ClassDetails>({
        id: 1,
        title: 'Lập trình Web với React',
        description: 'Học cách xây dựng ứng dụng web hiện đại với React và các công nghệ liên quan.',
        teacher: 'Nguyễn Văn A',
        time: '8 tuần',
        studentNum: 25,
        deadline: 1242343,
        sessions: [
            { id: 1, title: 'Giới thiệu về React', date: '2024-01-15', time: '19:00 - 21:00' },
            { id: 2, title: 'Components và Props', date: '2024-01-22', time: '19:00 - 21:00' },
            { id: 3, title: 'State và Lifecycle', date: '2024-01-29', time: '19:00 - 21:00' },
        ],
        announcements: [
            { id: 1, title: 'Chào mừng đến với khóa học!', content: 'Chúng ta sẽ bắt đầu vào tuần tới. Hãy chuẩn bị sẵn sàng!', date: '2024-01-10' },
            { id: 2, title: 'Bài tập tuần 1', content: 'Bài tập đã được đăng tải. Hạn nộp là 21/01/2024.', date: '2024-01-15' },
        ],
        students: [
            { id: 1, name: 'Trần Thị B', role: 'Học viên' },
            { id: 2, name: 'Lê Văn C', role: 'Học viên' },
            { id: 3, name: 'Phạm Thị D', role: 'Trợ giảng' },
        ],
        assignments: [
            {
                id: 1,
                title: 'Tạo component đầu tiên',
                dueDate: '2024-01-21',
                description: 'Tạo một component React đơn giản hiển thị thông tin cá nhân.',
                subTasks: [
                    { id: 1, title: 'Tạo functional component', description: 'Tạo một functional component có tên là PersonalInfo' },
                    { id: 2, title: 'Thêm props', description: 'Thêm props cho tên, tuổi, và sở thích' },
                    { id: 3, title: 'Styling', description: 'Sử dụng CSS module để tạo style cho component' },
                ],
                submissions: [
                    {
                        id: "1",
                        studentName: "Nguyễn Văn A",
                        submissionDate: "2024-11-18",
                        content: "Link đến repository: https://github.com/nguyenvana/react-component"
                    },
                    {
                        id: "2",
                        studentName: "Trần Thị B",
                        submissionDate: "2024-11-19",
                        content: "Link đến CodeSandbox: https://codesandbox.io/s/react-component-tranthib"
                    }
                ]
            },
            {
                id: 2,
                title: 'Xây dựng ứng dụng Todo',
                dueDate: '2024-01-28',
                description: 'Xây dựng một ứng dụng Todo sử dụng React hooks.',
                subTasks: [
                    { id: 1, title: 'Tạo component TodoList', description: 'Tạo một component để hiển thị danh sách các todo' },
                    { id: 2, title: 'Thêm chức năng thêm todo', description: 'Tạo form và xử lý việc thêm todo mới' },
                    { id: 3, title: 'Thêm chức năng xóa todo', description: 'Thêm nút và xử lý việc xóa todo' },
                ],
                submissions: []
            },
        ],
    })
    const params = useParams();
    const id = params.id;
    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            const email = localStorage.getItem('email')
            const password = localStorage.getItem('password');
            try {
                const response = await axios.get('/api/admins/classes?id=' + id, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Basic ${btoa(`${email}:${password}`)}`
                    }
                });

                const data = response.data;
                console.log(data)
                if (data.success) {
                    setClassDetails(data.data.classroom);
                }

            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [])

    const [activeTab, setActiveTab] = useState<string>('info')
    const [expandedAssignment, setExpandedAssignment] = useState<number | null>(null)
    const [newSession, setNewSession] = useState<Partial<Session>>({ title: '', date: '', time: '' })
    const [newAnnouncement, setNewAnnouncement] = useState<Partial<Announcement>>({ title: '', content: '' })
    const [newMember, setNewMember] = useState<Partial<Member>>({ name: '', role: '' })
    const [newAssignment, setNewAssignment] = useState<Partial<Assignment>>({ title: '', dueDate: '', description: '' })
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)
    const [newSubTask, setNewSubTask] = useState<Partial<SubTask>>({ title: '', description: '' })
    const [newProblem, setNewProblem] = useState<any>({
        title: '',
        description: '',
        deadline: '',
        classroomId: id,
        problems: []
    })

    const TabButton = ({ id, label }: { id: string, label: string }) => (
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

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setter: React.Dispatch<React.SetStateAction<any>>) => {
        const { name, value } = e.target
        setter((prev: any) => ({ ...prev, [name]: value }))
    }

    const addSession = (e: FormEvent) => {
        e.preventDefault()
        const id = classDetails.sessions.length + 1
        setClassDetails(prev => ({
            ...prev,
            sessions: [...prev.sessions, { id, ...newSession } as Session]
        }))
        setNewSession({ title: '', date: '', time: '' })
    }

    const addAnnouncement = (e: FormEvent) => {
        e.preventDefault()
        const id = classDetails.announcements.length + 1
        const date = new Date().toISOString().split('T')[0]
        setClassDetails(prev => ({
            ...prev,
            announcements: [...prev.announcements, { id, ...newAnnouncement, date } as Announcement]
        }))
        setNewAnnouncement({ title: '', content: '' })
    }

    const addAssignment = async (e: FormEvent) => {
        e.preventDefault()
        const email = localStorage.getItem('email')
        const password = localStorage.getItem('password');
        try {
            console.log(newProblem)

            if (newProblem.problems.length == 0 || newProblem.title == '' || newProblem.description == '' || newProblem.deadline == '') {
                alert('Vui lòng điền đầy đủ thông tin')
                return;
            }

            const check = confirm('Bạn có chắc chắn muốn thêm bài tập này?');

            if (!check) return;

            const response = await axios.post('/api/admins/assignments', {
                title: newProblem.title,
                description: newProblem.description,
                deadline: newProblem.deadline,
                problems: newProblem.problems,
                classroomId: id
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${btoa(`${email}:${password}`)}`
                }
            });

            const data = response.data;
            if (data.success) {
                alert('Thêm bài tập thành công')
                router.refresh();
            }
        } catch (error) {
            console.error(error)
            alert('Có lỗi xảy ra')
        }
    }

    const openModal = (submission: Submission) => {
        setSelectedSubmission(submission)
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false)
        setSelectedSubmission(null)
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <header className="">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center">
                        <Link href="/admins/classes" className="mr-4">
                            <ChevronLeft className="h-6 w-6 text-gray-500" />
                        </Link>
                        <h1 className="text-3xl font-bold text-green-600">{classDetails.title}</h1>
                    </div>
                </div>
            </header>

            <main className="flex-grow">
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
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
                                    <option value="info">Thông tin</option>
                                    <option value="sessions">Buổi học</option>
                                    <option value="announcements">Bảng tin</option>
                                    <option value="members">Thành viên</option>
                                    <option value="assignments">Bài tập</option>
                                </select>
                            </div>
                            <div className="hidden sm:block">
                                <div className="border-b border-gray-200">
                                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                                        <TabButton id="info" label="Thông tin" />
                                        <TabButton id="sessions" label="Buổi học" />
                                        <TabButton id="announcements" label="Bảng tin" />
                                        <TabButton id="members" label="Thành viên" />
                                        <TabButton id="assignments" label="Bài tập" />
                                    </nav>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                            {activeTab === 'info' && (
                                <div className="px-4 py-5 sm:p-6">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Thông tin khóa học</h3>
                                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                        <div className="sm:col-span-1">
                                            <dt className="text-sm font-medium text-gray-500">Giảng viên</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{classDetails.teacher}</dd>
                                        </div>
                                        <div className="sm:col-span-1">
                                            <dt className="text-sm font-medium text-gray-500">Thời lượng</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{classDetails.time}</dd>
                                        </div>
                                        <div className="sm:col-span-1">
                                            <dt className="text-sm font-medium text-gray-500">Số lượng học viên</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{classDetails.studentNum}</dd>
                                        </div>
                                        <div className="sm:col-span-1">
                                            <dt className="text-sm font-medium text-gray-500">Ngày bắt đầu</dt>
                                            <dd className="mt-1 text-sm text-gray-900">**/**/2024</dd>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <dt className="text-sm font-medium text-gray-500">Mô tả</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{classDetails.description}</dd>
                                        </div>
                                    </dl>
                                </div>
                            )}

                            {activeTab === 'sessions' && (
                                <div className="px-4 py-5 sm:p-6">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Buổi học</h3>
                                    <ul className="divide-y divide-gray-200">
                                        {classDetails.sessions && classDetails.sessions.map((session) => (
                                            <li key={session.id} className="py-4">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">{session.title}</p>
                                                        <p className="text-sm text-gray-500">{session.date} | {session.time}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <form onSubmit={addSession} className="mt-6">
                                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                            <div className="sm:col-span-3">
                                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                                    Tiêu đề
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        type="text"
                                                        name="title"
                                                        id="title"
                                                        value={newSession.title}
                                                        onChange={(e) => handleInputChange(e, setNewSession)}
                                                        className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-2">
                                                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                                                    Ngày
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        type="date"
                                                        name="date"
                                                        id="date"
                                                        value={newSession.date}
                                                        onChange={(e) => handleInputChange(e, setNewSession)}
                                                        className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-2">
                                                <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                                                    Thời gian
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        type="text"
                                                        name="time"
                                                        id="time"
                                                        value={newSession.time}
                                                        onChange={(e) => handleInputChange(e, setNewSession)}
                                                        placeholder="VD: 19:00 - 21:00"
                                                        className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-6">
                                            <button
                                                type="submit"
                                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                            >
                                                <Plus className="mr-2 h-5 w-5" />
                                                Thêm buổi học
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {activeTab === 'announcements' && (
                                <div className="px-4 py-5 sm:p-6">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Bảng tin</h3>
                                    <ul className="divide-y divide-gray-200">
                                        {classDetails.announcements && classDetails.announcements.map((announcement) => (
                                            <li key={announcement.id} className="py-4">
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-900">{announcement.title}</h4>
                                                    <p className="mt-1 text-sm text-gray-600">{announcement.content}</p>
                                                    <p className="mt-1 text-xs text-gray-500">{announcement.date}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <form onSubmit={addAnnouncement} className="mt-6">
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
                                                        value={newAnnouncement.title}
                                                        onChange={(e) => handleInputChange(e, setNewAnnouncement)}
                                                        className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-6">
                                                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                                                    Nội dung
                                                </label>
                                                <div className="mt-1">
                                                    <textarea
                                                        name="content"
                                                        id="content"
                                                        value={newAnnouncement.content}
                                                        onChange={(e) => handleInputChange(e, setNewAnnouncement)}
                                                        className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-6 flex justify-end">
                                            <button
                                                type="submit"
                                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                            >
                                                Thêm thông báo
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {activeTab === 'assignments' && (
                                <div>
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
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </main>
        </div>
    )
}

// function Problems() {
//     return (
//         <div className="px-4 py-5 sm:p-6">
//             <p className='text-lg font-semibold text-green-500'>Danh sách bài tập</p>
//             <ul className="flex flex-col gap-2 mt-2">
//                 <li className="py-4 p-2 bg-slate-100 rounded-xl">
//                     <div className="flex items-center justify-between">
//                         <div>
//                             <p className="text-sm font-medium text-gray-900">Tạo component đầu tiên</p>
//                             <p className="text-sm text-gray-500">Hạn nộp: 21/01/2024</p>
//                         </div>
//                         <button
//                             className="flex items-center gap-2 text-sm font-medium text-green-600 hover:text-green-700"
//                         >
//                             Xem chi tiết
//                             <ChevronDownIcon className="h-5 w-5" />
//                         </button>
//                     </div>
//                 </li>
//                 <li className="py-4 p-2 bg-slate-100 rounded-xl">
//                     <div className="flex items-center justify-between">
//                         <div>
//                             <p className="text-sm font-medium text-gray-900">Tạo component đầu tiên</p>
//                             <p className="text-sm text-gray-500">Hạn nộp: 21/01/2024</p>
//                         </div>
//                         <button
//                             className="text-sm font-medium text-green-600 hover:text-green-700"
//                         >
//                             Xem chi tiết
//                         </button>
//                     </div>
//                 </li>
//             </ul>
//         </div>
//     );
// }