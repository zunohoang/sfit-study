import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { AssignmentDetails } from './AssignmentDetails'

interface AssignmentListItemProps {
    assignment: any
    classrooms: any
}

export function AssignmentListItem({ assignment, classrooms }: AssignmentListItemProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <li className="bg-white shadow overflow-hidden sm:rounded-lg transition-all duration-300 ease-in-out">
            <div className="px-4 py-5 sm:px-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">{assignment.title}</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Hạn nộp: {assignment.deadline}</p>
                    </div>
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex items-center gap-2 text-sm font-medium text-green-600 hover:text-green-700 transition-colors duration-200"
                        aria-expanded={isExpanded}
                        aria-controls={`assignment-${assignment._id}-content`}
                    >
                        {isExpanded ? 'Ẩn chi tiết' : 'Xem chi tiết'}
                        {isExpanded ? (
                            <ChevronUp className="h-5 w-5" />
                        ) : (
                            <ChevronDown className="h-5 w-5" />
                        )}
                    </button>
                </div>
            </div>
            {isExpanded && (
                <AssignmentDetails assignment={assignment} classrooms={classrooms} />
            )}
        </li>
    )
}

