'use client'

import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import 'react-quill-new/dist/quill.snow.css'

// Dynamically import Quill editor component to avoid SSR issues
const QuillEditor = dynamic(() => import('react-quill-new'), {
    ssr: false,
    loading: () => <p>Đang tải trình soạn thảo...</p>,
})

// Define the modules and formats for the Quill editor
const modules = {
    toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        ['clean'],
    ],
}

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'link', 'image'
]

// Define the component props
interface TextEditorProps {
    content: string;
    setContent: (content: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ content, setContent }) => {
    const [savedContent, setSavedContent] = useState<string>('')

    useEffect(() => {
        const saved = localStorage.getItem('editorContent')
        if (saved) {
            setContent(saved)
            setSavedContent(saved)
        }
    }, [setContent])

    const handleChange = (value: string) => {
        setContent(value)
    }

    const handleSave = () => {
        localStorage.setItem('editorContent', content)
        setSavedContent(content)
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Trình soạn thảo văn bản</h1>
            <div className="mb-4">
                <QuillEditor
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    value={content}
                    onChange={handleChange}
                    className="bg-white border border-gray-300 rounded-lg"
                />
            </div>
            <button
                onClick={handleSave}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
                Lưu nội dung
            </button>
            {savedContent && (
                <div className="mt-4">
                    <h2 className="text-xl font-semibold mb-2">Nội dung đã lưu:</h2>
                    <div
                        className="border border-gray-300 p-4 rounded-lg prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: savedContent }}
                    />
                </div>
            )}
        </div>
    )
}

export default TextEditor
