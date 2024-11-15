'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp, User, Calendar, FileText, X } from 'lucide-react'
import axios from 'axios'
import { set } from 'mongoose'
import DisplayContent from './DisplayContent'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-cpp'
import 'prismjs/themes/prism.css'



export default function Problems({ assignments, classrooms }: any) {
    const [expandedAssignment, setExpandedAssignment] = useState<string | null>(null)
    const [selectedSubmission, setSelectedSubmission] = useState<any | null>(null)
    const [problem, setProblem] = useState<any | null>({})

    const toggleAssignment = async (id: string) => {

        const email = localStorage.getItem('email')
        const password = localStorage.getItem('password')

        try {
            const response = await axios.get(`/api/admins/assignments?assignmentId=${id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${btoa(`${email}:${password}`)}`
                }
            })
            const data = response.data;
            console.log(data)

            if (data.success) {
                console.log(data.data.assignment)
                const temp = data.data.assignment
                temp.student = classrooms.students
                setProblem(temp)
            }

        } catch (error) {
            console.log(error)
        }

        setExpandedAssignment(expandedAssignment == id ? null : id)
    }

    const openSubmissionModal = (submission: any) => {
        setSelectedSubmission(submission)
    }

    const closeSubmissionModal = () => {
        setSelectedSubmission(null)
    }

    function findUserIdInCodes(id: string) {
        console.log(id)
        for (let i = 0; i < problem.codes.length; i++) {
            if (problem.codes[i].user._id == id) {
                return true
            }
        }
        return false
    }

    return (
        <div className="px-4 py-5 sm:p-6">
            <h2 className='text-lg font-semibold text-green-500 mb-4'>Danh sách bài tập</h2>
            <ul className="flex flex-col gap-4">
                {assignments && assignments.map((assignment: any, index: number) => (
                    <li key={index} className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <div className="px-4 py-5 sm:px-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">{assignment.title}</h3>
                                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Hạn nộp: {assignment.deadline}</p>
                                </div>
                                <button
                                    onClick={() => toggleAssignment(assignment._id)}
                                    className="flex items-center gap-2 text-sm font-medium text-green-600 hover:text-green-700"
                                    aria-expanded={expandedAssignment == assignment._id}
                                    aria-controls={`assignment-${assignment._id}-content`}
                                >
                                    {expandedAssignment == assignment._id ? 'Ẩn chi tiết' : 'Xem chi tiết'}
                                    {expandedAssignment == assignment._id ? (
                                        <ChevronUp className="h-5 w-5" />
                                    ) : (
                                        <ChevronDown className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>
                        {expandedAssignment == assignment._id && (
                            <div className="border-t border-gray-200 px-4 py-5 sm:px-6" id={`assignment-${problem._id}-content`}>
                                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                    <div className="sm:col-span-2">
                                        <dt className="text-sm font-medium text-gray-500">Mô tả</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{problem.description}</dd>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <dt className="text-sm font-medium text-gray-500">Người chưa nộp</dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                                                {
                                                    problem.student && problem.student.map((student: any) =>
                                                        (findUserIdInCodes(student._id) == false) ? (
                                                            <li key={student._id} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                                                <div className="w-0 flex-1 flex items-center">
                                                                    <User className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                    <span className="ml-2 flex-1 w-0 truncate">{student.fullName}</span>
                                                                </div>
                                                            </li>
                                                        ) : '')
                                                }
                                            </ul>
                                        </dd>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <dt className="text-sm font-medium text-gray-500">Thống kê bài nộp</dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                                                {problem.codes && problem.codes.map((submission: any) => (
                                                    <li key={submission._id} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                                        <div className="w-0 flex-1 flex items-center">
                                                            <User className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                            <span className="ml-2 flex-1 w-0 truncate">{submission.user.fullName}</span>
                                                        </div>
                                                        <button
                                                            onClick={() => openSubmissionModal(submission)}
                                                            className="ml-4 font-medium text-green-600 hover:text-green-500"
                                                        >
                                                            Xem chi tiết
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        )}
                    </li>
                ))}
            </ul>

            {selectedSubmission && (
                <div className="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all w-full sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full sm:p-6">
                            <div className="absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                    onClick={closeSubmissionModal}
                                >
                                    <span className="sr-only">Đóng</span>
                                    <X className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                        Chi tiết bài nộp
                                    </h3>
                                    <div className="mt-2 w-full">
                                        <p className="text-sm text-gray-500">
                                            <strong>Học viên:</strong> {selectedSubmission.user.fullName}
                                        </p>
                                        {
                                            selectedSubmission.codes && selectedSubmission.codes.map((code: any, index: any) => (
                                                <div key={index} className="mt-2 w-full flex flex-col gap-1">
                                                    <p className="text-sm text-gray-500">
                                                        <strong>Câu {index + 1}:</strong>
                                                    </p>
                                                    <Editor
                                                        value={code}
                                                        onValueChange={() => { }}
                                                        highlight={(code: string) => highlight(code || "", languages.cpp, 'cpp')}
                                                        padding={10}
                                                        style={{
                                                            fontFamily: '"Fira code", "Fira Mono", monospace',
                                                            fontSize: 12,
                                                            border: '1px solid #d1d5db',
                                                            borderRadius: 4,
                                                            width: '100%'
                                                        }}
                                                        readOnly={true}
                                                    />
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:w-auto sm:text-sm"
                                    onClick={closeSubmissionModal}
                                >
                                    Đóng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}