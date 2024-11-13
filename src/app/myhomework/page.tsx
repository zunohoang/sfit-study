'use client';

import React, { useState } from 'react'

const SubmitAssignment: React.FC = () => {
    const [file, setFile] = useState<File | null>(null)
    const [fileName, setFileName] = useState<string>('')

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files ? e.target.files[0] : null
        if (selectedFile) {
            setFile(selectedFile)
            setFileName(selectedFile.name)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!file) {
            alert('Vui lòng chọn tệp để nộp!')
            return
        }
        // Logic nộp bài tập ở đây (ví dụ: gọi API để gửi tệp)
        const formData = new FormData()
        formData.append('file', file)

        try {
            // Giả sử bạn có API để gửi tệp lên server
            const response = await fetch('/api/submit-assignment', {
                method: 'POST',
                body: formData,
            })
            if (response.ok) {
                alert('Nộp bài tập thành công!')
            } else {
                alert('Có lỗi xảy ra, vui lòng thử lại!')
            }
        } catch (error) {
            alert('Lỗi kết nối: ' + error)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center">Nộp Bài Tập</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="file" className="block text-sm font-medium text-gray-700">Chọn tệp để nộp</label>
                        <input
                            type="file"
                            id="file"
                            name="file"
                            onChange={handleFileChange}
                            accept=".pdf,.docx,.pptx,.txt,.jpg,.png"
                            required
                            className="mt-1 block w-full text-sm text-gray-900 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {fileName && <p className="mt-2 text-sm text-gray-600">Tệp đã chọn: {fileName}</p>}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Nộp Bài
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SubmitAssignment
