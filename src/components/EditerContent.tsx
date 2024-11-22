
/**
 * Project: study.sfit.com.vn
 * Author: zunohoang (https://github.com/zunohoang)
 * Email: nguyenvanhoang2005nt@gmail.com
 */

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
    'list',
    'link', 'image'
]

// Define the component props
interface TextEditorProps {
    content: string | any;
    setContent: (content: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ content, setContent }) => {
    const [savedContent, setSavedContent] = useState<string>('')

    return (
        <div className="container mx-auto">
            <div className="mb-4">
                <QuillEditor
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    value={content}
                    onChange={setContent}
                    className="bg-white border border-gray-300 rounded-lg"
                />
            </div>
        </div>
    )
}

export default TextEditor
