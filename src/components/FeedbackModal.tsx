'use client'

import React, { useState } from 'react'
import { Send, X } from 'lucide-react';
import Link from 'next/link';

export default function FeedbackModal() {
    const [isOpen, setIsOpen] = useState(false)
    const [feedback, setFeedback] = useState('')

    return (
        <>
            <Link
                href={'https://forms.gle/yYqSzGJgVGL9t3mR8'}
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#4CAF50] rounded-md hover:bg-[#45a049] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#45a049]"
            >
                <Send className="w-4 h-4" />
                Góp ý
            </Link>
        </>
    )
}

