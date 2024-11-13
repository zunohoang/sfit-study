'use client';

import { useState } from 'react';
import axios from 'axios';
import { title } from 'process';
import { useRouter } from 'next/navigation';

export default function AddCourse() {
    const [courseName, setCourseName] = useState<string>('');
    const [courseCode, setCourseCode] = useState<string>('');
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        // Handle form submission logic here
        console.log('Course Name:', courseName);

        // call api
        const response = await axios.post('/api/classrooms', {
            title: courseName,
            students: [],
            teachers: [],
            email: localStorage.getItem('email'),
            password: localStorage.getItem('password')
        });

        console.log('Response:', response);
        const data = response.data;

        if (data.code) {
            alert('Thêm lớp thành công');
            router.push('/admins/classrooms');

        } else {
            alert('Thêm lớp thất bại');
        }
    };

    return (
        <div className="p-4 bg-gray-100 min-h-screen flex">
            <div className="p-6 w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4">Thêm lớp mới</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="courseName" className="block text-sm font-medium text-gray-700">
                            Tên lớp
                        </label>
                        <input
                            type="text"
                            id="courseName"
                            value={courseName}
                            onChange={(e) => setCourseName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Thêm
                    </button>
                </form>
            </div>
        </div >
    );
}