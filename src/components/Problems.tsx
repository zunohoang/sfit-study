
/**
 * Project: study.sfit.com.vn
 * Author: zunohoang (https://github.com/zunohoang)
 * Email: nguyenvanhoang2005nt@gmail.com
 */

'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp, User, Calendar, FileText, X, Edit } from 'lucide-react'
import axios from 'axios'
import { set } from 'mongoose'
import DisplayContent from './DisplayContent'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-cpp'
import 'prismjs/themes/prism.css'
import EditProblemModal from './EditProblemModal'
import Link from 'next/link'



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
                console.log("SUB: ", temp);
                console.log("Tổng số bài nộp: ", temp.codes.length);
                console.log("Tổng số học viên: ", temp.classroom.studentNum);
                console.log("Tổng số học viên đã tham gia lớp", temp.student.length);
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

    const handleEditProblem = (id: string) => {
        console.log(id);
        setEditProblem(assignments.find((assignment: any) => assignment._id == id));
        setEditOpen(true);
    }

    const [ansOpen, setAnsOpen] = useState(false);

    const [editProblem, setEditProblem] = useState<any>({});

    const [editOpen, setEditOpen] = useState(false);

    return (
        <div className="px-4 py-5 sm:p-6">
            <EditProblemModal isOpen={editOpen} setIsOpen={setEditOpen} problem={editProblem} />
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
                                <div className='flex gap-8'>
                                    <button className="text-green-700 hover:text-green-500" onClick={() => handleEditProblem(assignment._id)}>
                                        <Edit className="h-6 w-6" />
                                    </button>
                                    <Link className="text-green-700 hover:text-green-500" href={'/admins/docs?assignmentId=' + assignment._id + "&title=" + assignment.title} target='_blank'>
                                        Thêm đáp án
                                    </Link>
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
                        </div>
                        {expandedAssignment == assignment._id && (
                            <div className="border-t border-gray-200 px-4 py-5 sm:px-6" id={`assignment-${problem._id}-content`}>
                                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                    <div className="sm:col-span-2">
                                        <dt className="text-sm font-medium text-gray-500">Mô tả</dt>
                                        <dd className="mt-1 text-sm text-gray-900 flex justify-between">
                                            <DisplayContent content={assignment.description} />
                                        </dd>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <dt className="text-sm font-medium text-gray-500">Dữ liệu thống kê</dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            <ul className="list-disc pl-5 space-y-1 text-blue-600">
                                                <li>Tổng số học viên: <span className="font-semibold">{problem.classroom ? problem.classroom.studentNum : ""}</span></li>
                                                <li>Tổng số bài nộp: <span className="font-semibold">{problem.codes ? problem.codes.length : ""}</span></li>
                                                <li>Tổng số học viên đã tham gia lớp: <span className="font-semibold">{problem.student ? problem.student.length : ""}</span></li>
                                            </ul>
                                        </dd>
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
                                                        <p className='text-gray-400'>{new Date(submission.createdAt).toLocaleString()}</p>
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
                                            <p><strong>Học viên:</strong> {selectedSubmission.user.fullName} - {new Date(selectedSubmission.createdAt).toLocaleString()}</p>
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

/*

0
67361ddebd590241faa0b7f9
1
67362a4e61e9745b71cc40ee
2
67362d0461e9745b71cc4110
3
67362f7561e9745b71cc412b
4
67363e910ed9c01470a71971
5
67364dda9d773c32bb1468e5
6
6736974ca8f2d8119fed433e
7
6736a301dcaf30181a886bc7
8
6736a63342ba3b48034565eb
9
6736b8c3c65398b5e9e26a30
10
6737075d45423ab6a23aa19c
11
67370d3c6e1116eed477f949
12
673761bd0a745af51ecac531
13
673761cb7a1c067a204df397
14
673777c78ba5db2e9c2354ef
15
67362d8d61e9745b71cc4116
16
673781bb57f5ab4fb4aab4f1
17
6737838257f5ab4fb4aab519
18
6738526a2a06ab1400a2c522
19
6736a33242ba3b48034565d9
20
6739a0c70c3ccc9f17e4fd9c
21
673b22eb4fbeda9fc0ac7b80
22
673675e050f81707f2d6f28b
23
673b2434104ecfe28c8dffe4
24
673b24b4af9af25f7a9ed5e9
25
673b2486af9af25f7a9ed5dd
26
673b22e14fbeda9fc0ac7b7c
27
673b2cdef14a8849c5cf1d4a
28
673b25e7104ecfe28c8e0044
29
673c395b3c9736594f7a75e3
30
673c38f6d24e089cbf309984
31
673d816894456c39b901ef10
32
673de5ac39898b2461b4b4aa
33
673b2e2e5ab40d73f848a030
34
67405efe0750e9d5906199bb
35
6741735d4127cbcb832231c0
*/