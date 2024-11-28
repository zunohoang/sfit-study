import { X } from 'lucide-react'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-cpp'
import 'prismjs/themes/prism.css'

interface SubmissionModalProps {
    submission: any
    onClose: () => void
}

export function SubmissionModal({ submission, onClose }: SubmissionModalProps) {
    return (
        <div className="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full sm:p-6 animate-fadeIn">
                    <div className="absolute top-0 right-0 pt-4 pr-4">
                        <button
                            type="button"
                            className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                            onClick={onClose}
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
                                    <strong>Học viên:</strong> {submission.user.fullName} - {new Date(submission.createdAt).toLocaleString()}
                                </p>
                                {submission.codes && submission.codes.map((code: string, index: number) => (
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
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:w-auto sm:text-sm transition-colors duration-200"
                            onClick={onClose}
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

