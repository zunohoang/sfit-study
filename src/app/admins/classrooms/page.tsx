'use client'

import { Menu, Plus, Settings, Home, Calendar, GraduationCap, HelpCircle } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { get } from 'http'

export default function Component() {
    const [classes, setClasses] = useState<any>([]);

    useEffect(() => {
        async function callAPIclasses() {
            const response = await axios.get('/api/classrooms', {
                params: {
                    email: localStorage.getItem('email'),
                    password: localStorage.getItem('password')
                }
            });

            if (response.data.code) {
                console.log(response.data.classes);
                setClasses(response.data.classes);
            }
        }

        callAPIclasses();
    }, [])

    return (
        <main className="flex-1 p-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {classes.map((classItem: any) => (
                    <Link href={`/admins/classrooms/${classItem._id}/views`} key={classItem._id} className="overflow-hidden rounded-lg border bg-white shadow-sm">
                        <div className={`h-24 relative bg-sky-800 p-4`}>
                            <div className="flex justify-between">
                                <h2 className="text-lg font-medium text-white">{classItem.title}</h2>
                                <button className="text-white/80 hover:text-white">
                                    <Settings className="h-5 w-5" />
                                </button>
                            </div>
                            <p className="text-sm text-white/90">Ban chuyên môn</p>
                        </div>
                        <div className="relative h-[100px]">
                            <div className="absolute -top-8 right-4 h-16 w-16 rounded-full bg-purple-600 flex items-center justify-center text-white text-xl">
                                {classItem.title[classItem.title.length - 2]}
                            </div>
                        </div>
                        <div className="border-t p-3 flex justify-end space-x-4">
                            <button className="p-2 hover:bg-gray-100 rounded-full">
                                <GraduationCap className="h-5 w-5 text-gray-600" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-full">
                                <Settings className="h-5 w-5 text-gray-600" />
                            </button>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    )
}