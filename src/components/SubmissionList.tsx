import { useState } from 'react'
import { User } from 'lucide-react'
import { SubmissionModal } from './SubmissionModal'

interface SubmissionListProps {
    problem: any
}

export function SubmissionList({ problem }: SubmissionListProps) {
    const [selectedSubmission, setSelectedSubmission] = useState<any | null>(null)

    const findUserIdInCodes = (id: string) => {
        return problem.codes.some((code: any) => code.user._id === id)
    }

    return (
        <>
            <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Người chưa nộp</dt>
                <dd className="mt-1 text-sm text-gray-900">
                    <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                        {problem.student && problem.student.map((student: any) =>
                            !findUserIdInCodes(student._id) && (
                                <li key={student._id} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                    <div className="w-0 flex-1 flex items-center">
                                        <User className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                                        <span className="ml-2 flex-1 w-0 truncate">{student.fullName}</span>
                                    </div>
                                </li>
                            )
                        )}
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
                                    onClick={() => setSelectedSubmission(submission)}
                                    className="ml-4 font-medium text-green-600 hover:text-green-500 transition-colors duration-200"
                                >
                                    Xem chi tiết
                                </button>
                            </li>
                        ))}
                    </ul>
                </dd>
            </div>
            {selectedSubmission && (
                <SubmissionModal
                    submission={selectedSubmission}
                    onClose={() => setSelectedSubmission(null)}
                />
            )}
        </>
    )
}

