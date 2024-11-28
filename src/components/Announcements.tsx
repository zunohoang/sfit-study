import { useState, FormEvent, ChangeEvent } from 'react'

export default function Announcements({ classDetails, setClassDetails }: { classDetails: any; setClassDetails: any }) {
    const [newAnnouncement, setNewAnnouncement] = useState<Partial<any>>({ title: '', content: '' })

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setNewAnnouncement(prev => ({ ...prev, [name]: value }))
    }

    const addAnnouncement = (e: FormEvent) => {
        e.preventDefault()
        const id = classDetails.announcements.length + 1
        const date = new Date().toISOString().split('T')[0]
        setClassDetails((prev: any) => ({
            ...prev,
            announcements: [...prev.announcements, { id, ...newAnnouncement, date }]
        }))
        setNewAnnouncement({ title: '', content: '' })
    }

    return (
        <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Bảng tin</h3>
            <ul className="divide-y divide-gray-200">
                {classDetails.announcements && classDetails.announcements.map((announcement: any) => (
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
                                onChange={handleInputChange}
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
                                onChange={handleInputChange}
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
    )
}

