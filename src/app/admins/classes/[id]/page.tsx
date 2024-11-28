'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import axios from 'axios'
import ClassInfo from '@/components/ClassInfo'
import Sessions from '@/components/Sessions'
import Announcements from '@/components/Announcements'
import Assignments from '@/components/Assignments'

export default function ManageClass() {
    const [classDetails, setClassDetails] = useState<any>(null)
    const [activeTab, setActiveTab] = useState<string>('info')
    const params = useParams()
    const id = params.id
    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            const email = localStorage.getItem('email')
            const password = localStorage.getItem('password')
            try {
                const response = await axios.get('/api/admins/classes?id=' + id, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Basic ${btoa(`${email}:${password}`)}`
                    }
                })
                const data = response.data
                if (data.success) {
                    console.log(data);
                    setClassDetails(data.data.classroom)
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [id])

    const TabButton = ({ id, label }: { id: string; label: string }) => (
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

    if (!classDetails) return <div>Loading...</div>

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
                            <div className="hidden sm:block">
                                <div className="border-b border-gray-200">
                                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                                        <TabButton id="info" label="Thông tin" />
                                        <TabButton id="sessions" label="Buổi học" />
                                        <TabButton id="announcements" label="Bảng tin" />
                                        <TabButton id="assignments" label="Bài tập" />
                                    </nav>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                            {activeTab === 'info' && <ClassInfo classDetails={classDetails} />}
                            {activeTab === 'sessions' && <Sessions classDetails={classDetails} setClassDetails={setClassDetails} />}
                            {activeTab === 'announcements' && <Announcements classDetails={classDetails} setClassDetails={setClassDetails} />}
                            {activeTab === 'assignments' && <Assignments classDetails={classDetails} setClassDetails={setClassDetails} />}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

