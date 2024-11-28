import { Loader2 } from 'lucide-react'

export function LoadingSpinner() {
    return (
        <div className="flex justify-center items-center">
            <Loader2 className="h-8 w-8 animate-spin text-green-500" />
        </div>
    )
}

