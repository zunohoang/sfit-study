'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import Link from 'next/link'
import { Book, Clock, Users, CalendarDays, MessageSquare, Code, ChevronLeft, ChevronDown, ChevronUp, Bell, User, Facebook, Youtube, Github, Plus, Trash2 } from 'lucide-react'
import TextEditor from '@/components/EditerContent'

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

interface Assignment {
    id: number
    title: string
    dueDate: string
    description: string
    subTasks: SubTask[]
    submissions?: {
        id: string
        studentName: string
        submissionDate: string
    }[]
}

interface ClassDetails {
    id: number
    name: string
    description: string
    instructor: string
    duration: string
    students: number
    startDate: string
    sessions: Session[]
    announcements: Announcement[]
    members: Member[]
    assignments: Assignment[]
}

export default function ManageSpecificClass() {
    const [classDetails, setClassDetails] = useState<ClassDetails>({
        id: 1,
        name: 'Lập trình Web với React',
        description: 'Học cách xây dựng ứng dụng web hiện đại với React và các công nghệ liên quan.',
        instructor: 'Nguyễn Văn A',
        duration: '8 tuần',
        students: 25,
        startDate: '2024-01-15',
        sessions: [
            { id: 1, title: 'Giới thiệu về React', date: '2024-01-15', time: '19:00 - 21:00' },
            { id: 2, title: 'Components và Props', date: '2024-01-22', time: '19:00 - 21:00' },
            { id: 3, title: 'State và Lifecycle', date: '2024-01-29', time: '19:00 - 21:00' },
        ],
        announcements: [
            { id: 1, title: 'Chào mừng đến với khóa học!', content: 'Chúng ta sẽ bắt đầu vào tuần tới. Hãy chuẩn bị sẵn sàng!', date: '2024-01-10' },
            { id: 2, title: 'Bài tập tuần 1', content: 'Bài tập đã được đăng tải. Hạn nộp là 21/01/2024.', date: '2024-01-15' },
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
                dueDate: '2024-01-21',
                description: 'Tạo một component React đơn giản hiển thị thông tin cá nhân.',
                subTasks: [
                    { id: 1, title: 'Tạo functional component', description: 'Tạo một functional component có tên là PersonalInfo' },
                    { id: 2, title: 'Thêm props', description: 'Thêm props cho tên, tuổi, và sở thích' },
                    { id: 3, title: 'Styling', description: 'Sử dụng CSS module để tạo style cho component' },
                ],
                submissions: [
                    {
                        "id": "1",
                        "studentName": "Nguyễn Văn A",
                        "submissionDate": "2024-11-18"
                    },
                    {
                        "id": "2",
                        "studentName": "Trần Thị B",
                        "submissionDate": "2024-11-19"
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
                ]
            },
        ],
    })

    const [activeTab, setActiveTab] = useState<string>('info')
    const [expandedAssignment, setExpandedAssignment] = useState<number | null>(null)
    const [newSession, setNewSession] = useState<Partial<Session>>({ title: '', date: '', time: '' })
    const [newAnnouncement, setNewAnnouncement] = useState<Partial<Announcement>>({ title: '', content: '' })
    const [newMember, setNewMember] = useState<Partial<Member>>({ name: '', role: '' })
    const [newAssignment, setNewAssignment] = useState<Partial<Assignment>>({ title: '', dueDate: '', description: '' })

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

    const addMember = (e: FormEvent) => {
        e.preventDefault()
        const id = classDetails.members.length + 1
        setClassDetails(prev => ({
            ...prev,
            members: [...prev.members, { id, ...newMember } as Member]
        }))
        setNewMember({ name: '', role: '' })
    }

    const addAssignment = (e: FormEvent) => {
        e.preventDefault()
        const id = classDetails.assignments.length + 1
        setClassDetails(prev => ({
            ...prev,
            assignments: [...prev.assignments, { id, ...newAssignment, subTasks: [] } as Assignment]
        }))
        setNewAssignment({ title: '', dueDate: '', description: '' })
    }

    return (
        <main className="flex-grow bg-gray-100">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="flex items-center mb-6">
                        <Link href="/manage-classes" className="mr-4">
                            <ChevronLeft className="h-6 w-6 text-gray-500" />
                        </Link>
                        <h1 className="text-3xl font-bold text-green-600">{classDetails.name}</h1>
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
                                        <dd className="mt-1 text-sm text-gray-900">{classDetails.instructor}</dd>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <dt className="text-sm font-medium text-gray-500">Thời lượng</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{classDetails.duration}</dd>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <dt className="text-sm font-medium text-gray-500">Số lượng học viên</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{classDetails.students}</dd>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <dt className="text-sm font-medium text-gray-500">Ngày bắt đầu</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{classDetails.startDate}</dd>
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
                                    {classDetails.sessions.map((session) => (
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
                                    {classDetails.announcements.map((announcement) => (
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
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg leading-6 font- text-green-500 mb-4">Tạo bài tập mới</h3>
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
                                                    value={newAssignment.title}
                                                    onChange={(e) => handleInputChange(e, setNewAssignment)}
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
                                                    value={newAssignment.dueDate}
                                                    onChange={(e) => handleInputChange(e, setNewAssignment)}
                                                    className="py-2 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-6">
                                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                                Nội dung
                                            </label>
                                            <div className="mt-1">
                                                {/* <textarea
                                                    name="description"
                                                    id="description"
                                                    value={newAssignment.description}
                                                    onChange={(e) => handleInputChange(e, setNewAssignment)}
                                                    className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                /> */}
                                                <TextEditor content={newAssignment.description} setContent={(value) => setNewAssignment({ ...newAssignment, description: value })} />
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
                                <h2 className='text-lg font-semibold text-green-500'>Danh sách bài tập</h2>
                                <ul className="divide-y divide-gray-200">
                                    {classDetails.assignments.map((assignment) => (
                                        <li key={assignment.id} className="py-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{assignment.title}</p>
                                                    <p className="text-sm text-gray-500">Hạn nộp: {assignment.dueDate}</p>
                                                </div>
                                                <button
                                                    onClick={() => handleAssignmentToggle(assignment.id)}
                                                    className="text-sm font-medium text-green-600 hover:text-green-700"
                                                >
                                                    {expandedAssignment === assignment.id ? 'Ẩn' : 'Xem chi tiết'}
                                                </button>
                                            </div>
                                            {expandedAssignment === assignment.id && (
                                                <div className="mt-4">
                                                    <p className="text-sm text-gray-600">{assignment.description}</p>
                                                    <ul className="mt-4 divide-y divide-gray-200">
                                                        {assignment.subTasks.map((subTask) => (
                                                            <li key={subTask.id} className="py-4">
                                                                <div>
                                                                    <p className="text-sm font-medium text-gray-900">{subTask.title}</p>
                                                                    <p className="mt-1 text-sm text-gray-600">{subTask.description}</p>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    {assignment.submissions && (
                                                        <div className="mt-4">
                                                            <h4 className="text-sm font-medium text-gray-900">Bài nộp</h4>
                                                            <ul className="mt-2 divide-y divide-gray-200">
                                                                {assignment.submissions.map((submission) => (
                                                                    <li key={submission.id} className="py-4">
                                                                        <div>
                                                                            <p className="text-sm font-medium text-gray-900">{submission.studentName}</p>
                                                                            <p className="mt-1 text-sm text-gray-600">{submission.submissionDate}</p>
                                                                        </div>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}

