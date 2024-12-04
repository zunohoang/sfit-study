import { Suspense } from 'react'
import MarkdownEditorContent from './markdown-editor-content'
import { LoadingSpinner } from './loading-spinner'

export default function MarkdownEditorPage() {
    return (
        <Suspense fallback={<LoadingSpinner className="flex h-[100vh] items-center justify-center" />}>
            <MarkdownEditorContent />
        </Suspense>
    )
}

