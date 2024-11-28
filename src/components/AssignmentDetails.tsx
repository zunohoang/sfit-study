import { useState, useEffect } from 'react'
import axios from 'axios'
import DisplayContent from './DisplayContent'
import { SubmissionList } from './SubmissionList'
import { LoadingSpinner } from './LoadingSpinner'

interface AssignmentDetailsProps {
    assignment: any
    classrooms: any
}

export function AssignmentDetails({ assignment, classrooms }: AssignmentDetailsProps) {
    const [problem, setProblem] = useState<any | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchProblemDetails = async () => {
            setIsLoading(true)
            const email = localStorage.getItem('email')
            const password = localStorage.getItem('password')

            try {
                const response = await axios.get(`/api/admins/assignments?assignmentId=${assignment._id}`, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Basic ${btoa(`${email}:${password}`)}`
                    }
                })
                const data = response.data
                if (data.success) {
                    const temp = data.data.assignment
                    temp.student = classrooms.students
                    setProblem(temp)
                }
            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchProblemDetails()
    }, [assignment._id, classrooms.students])

    if (isLoading) {
        return <LoadingSpinner />
    }

    return (
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6 animate-fadeIn" id={`assignment-${problem._id}-content`}>
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Mô tả</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                        <DisplayContent content={assignment.description} />
                    </dd>
                </div>
                <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Dữ liệu thống kê</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                        <ul className="list-disc pl-5 space-y-1 text-blue-600">
                            <li>Tổng số học viên: <span className="font-semibold">{problem.classroom.studentNum}</span></li>
                            <li>Tổng số bài nộp: <span className="font-semibold">{problem.codes.length}</span></li>
                            <li>Tổng số học viên đã tham gia lớp: <span className="font-semibold">{problem.student.length}</span></li>
                        </ul>
                    </dd>
                </div>
                <SubmissionList problem={problem} />
            </dl>
        </div>
    )
}

