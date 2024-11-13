'use client';

import { Bell, Calendar, Cog } from "lucide-react"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import axios from "axios";
import Link from "next/link";

export default function Component() {

    const params = useParams()
    const classroomId = params.id;

    const [classroom, setClassroom] = useState({});
    useEffect(() => {
        async function fetchClassroom() {
            const response = await axios.get('http://localhost:3000/api/getClassroomsById', {
                params: {
                    email: localStorage.getItem('email'),
                    password: localStorage.getItem('password'),
                    classId: classroomId
                }
            });

            if (response.data.code) {
                setClassroom(response.data.classes);
            }
        }

        fetchClassroom();
    }, []);

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <section>
                <h1 className="text-2xl font-bold mb-4">Bài tập lớp {classroom.title}</h1>
                <Link href={"./createProblem"} className="bg-blue-500 text-white px-4 py-2 rounded-md">Thêm bài tập</Link>
                <ul className="space-y-4 mt-4">
                    <li className="p-4 border rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold">Problem 1</h2>
                        <p className="mt-2 text-gray-600">Description of problem 1...</p>
                    </li>
                    <li className="p-4 border rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold">Problem 2</h2>
                        <p className="mt-2 text-gray-600">Description of problem 2...</p>
                    </li>
                </ul>
            </section>
        </main>
    )
}