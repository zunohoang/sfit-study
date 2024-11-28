import { useState, FormEvent, ChangeEvent } from 'react'
import { Plus } from 'lucide-react'

export default function Sessions({ classDetails, setClassDetails }: { classDetails: any; setClassDetails: any }) {
    const [newSession, setNewSession] = useState<Partial<any>>({ title: '', date: '', time: '' })

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setNewSession(prev => ({ ...prev, [name]: value }))
    }

    const addSession = (e: FormEvent) => {
        e.preventDefault()
        const id = classDetails.sessions.length + 1
        setClassDetails((prev: any) => ({
            ...prev,
            sessions: [...prev.sessions, { id, ...newSession }]
        }))
        setNewSession({ title: '', date: '', time: '' })
    }

    return (
        <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Buổi học</h3>
            <ul className="divide-y divide-gray-200">
                {classDetails.sessions && classDetails.sessions.map((session: any) => (
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
                                onChange={handleInputChange}
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
                                onChange={handleInputChange}
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
                                onChange={handleInputChange}
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
    )
}

