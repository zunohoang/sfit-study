'use client';

import { Bell, Calendar, Cog } from "lucide-react"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import axios from "axios";

export default function Component() {
    const params = useParams();
    const { id } = params;

    const [classroom, setClassroom] = useState({});
    useEffect(() => {
        async function callAPI() {

            const { id } = params;
            const response = await axios.get('http://localhost:3000/api/getClassroomsById', {
                params: {
                    email: localStorage.getItem('email'),
                    password: localStorage.getItem('password'),
                    classId: id
                }
            });

            if (response.data.code) {
                console.log(response.data.classes);
                setClassroom(response.data.classes);
            }
        }

        callAPI();
    }, []);


    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="relative h-48 bg-gray-600">
                    <div className="absolute bottom-4 left-4">
                        <h1 className="text-4xl font-bold text-white">{classroom.title}</h1>
                    </div>
                    <button className="absolute top-4 right-4 bg-white text-blue-600 px-4 py-2 rounded-md text-sm font-medium">
                        Tùy chỉnh
                    </button>
                </div>

                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                            <div className="text-sm font-medium text-gray-500">Mã lớp</div>
                            <div className="text-lg font-semibold text-blue-600">{id}</div>
                        </div>
                        <button className="text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Options</span>
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                            </svg>
                        </button>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                        <div className="flex items-start space-x-4">
                            <div className="min-w-0 flex-1">
                                <p className="text-sm text-gray-500">Thông báo nội dung ...</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-lg font-medium text-gray-900">Sắp đến hạn</h2>
                        <p className="mt-1 text-sm text-gray-500">Không có bài tập nào sắp đến hạn</p>
                        <a href="#" className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-500">
                            Xem tất cả
                        </a>
                    </div>

                    <div className="mt-8">
                        <div className="flex items-center space-x-4">
                            <div>
                                <h2 className="text-lg font-medium text-gray-900">Đây là nơi bạn... </h2>
                                <p className="mt-1 text-sm text-gray-500">
                                    Sử dụng bảng tin để thông báo, đăng bài tập và trả lời câu hỏi của học viên
                                </p>
                            </div>
                        </div>
                        <button className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                            Cài đặt bảng tin
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}