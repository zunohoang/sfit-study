'use client';

import { useState, useCallback, useEffect } from 'react'
import { Calendar, AlertTriangle, Menu, User, ChevronDown, ChevronUp, Link } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-cpp'
import 'prismjs/themes/prism.css'
import axios from 'axios'
import qs from 'qs'
import DisplayContent from '@/components/DisplayContent';
import EditerContent from '@/components/EditerContent';

interface Assignment {
    _id: number
    title: string
    dueDate: string
    content: string
    isExpanded?: boolean
    code: string
}

export default function ClassroomAssignments() {
    const [activeTab, setActiveTab] = useState('assignments')
    const [assignments, setAssignments] = useState<Assignment[]>([
        { _id: 1, title: 'Câu 1', dueDate: '**/**/2024', content: 'Giải phương trình bậc hai (Nhập vào a,b,c)', code: '#include <stdio.h>\nint main(){\n\tprintf("Hello SFIT");\n\treturn 0;\n}' },
        { _id: 2, title: 'Câu 2', dueDate: '**/**/2024', content: 'Giải hệ phương trình 2 ẩn', code: '// Your C++ code here\n' },
        { _id: 3, title: 'Câu 3', dueDate: '**/**/2024', content: "Kiểm tra học lực: <p>Nhập vào một số thực là điểm của học sinh.</p><p> + Nếu lớn hơn hoặc bằng 9 thì đem ra giỏi </p><p> + Lớn hơn hoặc bằng 8 bé hơn 9 thì đem ra khá </p><p> + Lớn hơn hoặc bằng 5 bé hơn 8 thì đem ra trung bình  </p><p> + Bé hơn 5 đem ra yếu", code: '// Your C++ code here\n' },
    ])
    const router = useRouter();

    const [content, setContent] = useState<string>('');

    useEffect(() => {
        console.log(content);
    }, [content]);

    const toggleAssignment = (id: number) => {
        setAssignments(assignments.map(assignment =>
            assignment._id === id ? { ...assignment, isExpanded: !assignment.isExpanded } : assignment
        ))
    }

    const handleCodeChange = useCallback((id: number, code: string) => {
        setAssignments(assignments.map(assignment =>
            assignment._id === id ? { ...assignment, code } : assignment
        ))
    }, [assignments])

    const handleSubmitHomework = async () => {
        const codes = assignments.map(assignment => assignment.code);

        const response = await fetch('/api/assignment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: localStorage.getItem('username'),
                password: localStorage.getItem('password'),
                codes: codes,
                assignmentId: "67322b1b15405740d45cc753",
            }),
        });

        const data = await response.json();

        if (data.code) {
            alert('Nộp bài tập thành công!');
        } else {
            alert('Có lỗi xảy ra, vui lòng thử lại!');
        }
    }

    const runCode = async () => {
        var data = qs.stringify({
            'code': '#include <bits/stdc++.h> \nusing namespace std;\nint main(){\nint n; \ncin >> n;\ncout << n;\nreturn 0;\n}',
            'language': 'cpp',
            'input': '7'
        });
        var config = {
            method: 'post',
            url: 'https://api.codex.jaagrav.in',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className="w-full mx-auto bg-white min-h-screen">


            <div className='p-4'>
                <button onClick={() => router.back()} className="text-gray-500 p-2 rounded hover:bg-gray-200">
                    ← Quay lại
                </button>
                <h1 className="text-xl font-medium">
                    Tin Đại Cương (Thứ 2)
                </h1>
                <p className="text-gray-600 leading-relaxed">
                    Buổi 2
                </p>
            </div>
            {/* Content */}
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-4">Danh sách bài tập</h2>                <div className="space-y-4">
                    {assignments.map((assignment) => (
                        <div key={assignment._id} className="bg-gray-100 rounded-md overflow-hidden">
                            <div
                                className="flex justify-between items-center p-4 cursor-pointer"
                                onClick={() => toggleAssignment(assignment._id)}
                            >
                                <div>
                                    <h3 className="text-lg font-semibold">{assignment.title}</h3>
                                    <p className="text-sm text-gray-600">Hạn nộp: {assignment.dueDate}</p>
                                </div>
                                {assignment.isExpanded ? <ChevronUp /> : <ChevronDown />}
                            </div>
                            {assignment.isExpanded && (
                                <div className="p-4 border-t border-gray-200">
                                    <div className="mb-4">
                                        <DisplayContent content={assignment.content} />
                                    </div>
                                    <div className="border border-gray-300 rounded-md overflow-hidden">
                                        <Editor
                                            value={assignment.code}
                                            onValueChange={code => handleCodeChange(assignment._id, code)}
                                            highlight={code => highlight(code, languages.cpp, 'cpp')}
                                            padding={10}
                                            style={{
                                                fontFamily: '"Fira code", "Fira Mono", monospace',
                                                fontSize: 14,
                                            }}
                                        />
                                    </div>
                                    <textarea name="input" id="input" placeholder="Nhập Input" className="w-full bg-slate-50 border border-solid border-gray-200 mt-3 p-5"></textarea>
                                    <div>Output:</div>
                                    <div className="w-full bg-slate-50 border border-solid border-gray-200 mt-3 p-5"></div>
                                    <button onClick={() => runCode()} className="mt-2 w-full py-2 bg-blue-600 text-white rounded-b-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        Chạy code
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                    <button
                        onClick={() => handleSubmitHomework()}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Nộp bài
                    </button>
                </div>
            </div>
        </div>
    )
}