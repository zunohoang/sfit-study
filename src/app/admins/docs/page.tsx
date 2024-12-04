'use client'

import { useState, useEffect } from 'react'
import MarkdownDisplay from '@/components/markdown-display'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import { Navbar } from '@/components/navbar'

export default function MarkdownEditorPage() {
    const searchParams = useSearchParams()
    const [assignmentId, setAssignmentId] = useState(searchParams.get('assignmentId') || '')
    const [title, setTitle] = useState(searchParams.get('title') || '')

    const [markdown, setMarkdown] = useState('')
    const [isAutoPreview, setIsAutoPreview] = useState(true)
    const [documentTitle, setDocumentTitle] = useState(title)
    const [documentAuthor, setDocumentAuthor] = useState('zunohoang')
    const [isNavbarOpen, setIsNavbarOpen] = useState(false)

    useEffect(() => {
        setDocumentTitle(title)
    }, [title])

    const handleSave = async () => {
        const email = localStorage.getItem('email')
        const password = localStorage.getItem('password')

        if (!email || !password) {
            alert('Vui lòng đăng nhập để thực hiện thao tác này')
            return
        }

        if (!documentTitle || !documentAuthor || !markdown) {
            alert('Vui lòng điền đầy đủ thông tin')
            return
        }

        const check = confirm('Bạn có chắc chắn muốn lưu tài liệu này?')
        if (!check) return

        try {
            const response = await axios.post('/api/users/docs?assignmentId=' + assignmentId, {
                title: documentTitle,
                content: markdown,
                author: documentAuthor,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${btoa(`${email}:${password}`)}`
                }
            })

            console.log(response)
            if (response.data.success) {
                alert('Lưu thành công')
                const checkContinue = confirm('Bạn có muốn đến tài liệu')
                if (checkContinue) {
                    window.open(`${response.data.data.url}`, '_blank')
                }

            } else {
                alert('Lưu thất bại')
            }

        } catch (error) {
            console.error("Lỗi khi lưu tài liệu:", error)
            alert('Lưu thất bại')
        }
    }

    const handleDownload = () => {
        const content = `# ${documentTitle}\nAuthor: ${documentAuthor}\n\n${markdown}`
        const element = document.createElement('a')
        const file = new Blob([content], { type: 'text/markdown' })
        element.href = URL.createObjectURL(file)
        element.download = `${documentTitle || 'document'}-${Date.now()}.md`
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
    }

    const toggleNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar isOpen={isNavbarOpen} toggleNavbar={toggleNavbar} />
            <div className={`transition-all duration-300 ease-in-out ${isNavbarOpen ? 'ml-64' : 'ml-0'}`}>
                <div className="container mx-auto px-4 py-8">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <button onClick={toggleNavbar} className="p-2 rounded-md hover:bg-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            <h1 className="text-3xl font-bold text-gray-800">
                                {assignmentId
                                    ? `Thêm lời giải cho bài tập [${title}] - [id:${assignmentId}]`
                                    : "Thêm tài liệu mới"}
                            </h1>
                        </div>

                        {/* Document Info Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div className="space-y-2">
                                <label htmlFor="documentTitle" className="block text-sm font-medium text-gray-700">Tiêu đề tài liệu</label>
                                <div className="relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        id="documentTitle"
                                        className="focus:ring-green-500 focus:border-green-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                                        placeholder="Nhập tiêu đề tài liệu"
                                        value={documentTitle}
                                        onChange={(e) => setDocumentTitle(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="documentAuthor" className="block text-sm font-medium text-gray-700">Tác giả</label>
                                <div className="relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        id="documentAuthor"
                                        className="focus:ring-green-500 focus:border-green-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                                        placeholder="Nhập tên tác giả"
                                        value={documentAuthor}
                                        onChange={(e) => setDocumentAuthor(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Editor Section */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center space-x-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <span className="text-sm font-medium text-gray-600">Editor</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <label className="flex items-center cursor-pointer">
                                            <div className="relative">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only"
                                                    checked={isAutoPreview}
                                                    onChange={() => setIsAutoPreview(!isAutoPreview)}
                                                />
                                                <div className={`block w-10 h-6 rounded-full ${isAutoPreview ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform ${isAutoPreview ? 'translate-x-4' : ''}`}></div>
                                            </div>
                                            <span className="ml-2 text-sm text-gray-600">Auto Preview</span>
                                        </label>
                                    </div>
                                </div>

                                <textarea
                                    placeholder="Nhập Markdown ở đây..."
                                    className="w-full h-[calc(100vh-450px)] resize-none p-4 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none font-mono text-gray-700"
                                    value={markdown}
                                    onChange={(e) => setMarkdown(e.target.value)}
                                />
                            </div>

                            {/* Preview Section */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center space-x-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        <span className="text-sm font-medium text-gray-600">Preview</span>
                                    </div>
                                </div>
                                <div className="border rounded-lg p-6 bg-white overflow-auto h-[calc(100vh-450px)] shadow-inner">
                                    {documentTitle && <h1 className="text-2xl font-bold mb-2">{documentTitle}</h1>}
                                    {documentAuthor && <p className="text-gray-600 mb-4">Tác giả: {documentAuthor}</p>}
                                    <div className="border-t border-gray-300"></div>
                                    <MarkdownDisplay content={markdown} />
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-between mt-6">
                            <button
                                onClick={handleDownload}
                                className="px-4 py-2  hover:text-gray-800 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors flex items-center space-x-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                <span>Tải xuống</span>
                            </button>

                            <button
                                onClick={handleSave}
                                className="px-6 py-2 bg-green-500 hover:bg-gray-700 text-white rounded-md transition-colors flex items-center space-x-2 shadow-sm"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                                </svg>
                                <span>Lưu</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

