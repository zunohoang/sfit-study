'use client'

import { X } from 'lucide-react'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'success' | 'warning' | 'confirmation';
    message: string;
    title: string;
    goto: string;
}

export default function Modal({ isOpen, onClose, type, title, message, goto }: ModalProps) {
    if (!isOpen) return null

    const getColor = () => {
        switch (type) {
            case 'success':
                return 'bg-[#4CAF50] text-white';
            case 'warning':
                return 'bg-red-500 text-white';
            case 'confirmation':
                return 'bg-green-500 text-white';
            default:
                return 'bg-gray-500 text-white';
        }
    }

    const textColor = () => {
        switch (type) {
            case 'success':
                return 'text-[#4CAF50]';
            case 'warning':
                return 'text-red-500';
            case 'confirmation':
                return 'text-green-500';
            default:
                return 'text-gray-500';
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
            <div className={`w-full max-w-md rounded-lg shadow-lg ${getColor()}`}>
                <div className="relative p-6 bg-white rounded-lg">
                    <h1 className={`text-xl font-bold ${textColor()}`}>{title}</h1>
                    <div className="space-x-2 text-gray-700 px-2 mt-4">
                        {message}
                    </div>
                    <div className="flex justify-end space-x-2 mt-5">
                        <button
                            className="px-2 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                            onClick={onClose}
                        >
                            Đóng
                        </button>
                        <button
                            onClick={() => {
                                if (goto) {
                                    window.location.href = goto
                                } else {
                                    onClose()
                                }
                            }}
                            className={`px-2 py-1 ${getColor()} text-white rounded-md hover:scale-105 duration-200`}>
                            Tiếp tục
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}