'use client'

import { X } from 'lucide-react'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Modal({ isOpen, onClose }: ModalProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
            <div className="bg-white w-full max-w-md rounded-lg shadow-lg">
                <div className="relative p-6">
                    <button
                        className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                        onClick={onClose}
                    >
                        <X className="h-6 w-6" />
                    </button>
                    <h2 className="text-3xl font-bold text-[#4CAF50] mb-2">Chào ae</h2>
                    <p className="text-gray-600 mb-4">UTC's IT Club</p>
                    <p className="text-gray-600 mb-1">
                        Đây là phiên bản đầu tiên v.0.0 và sử dụng máy chủ, database miễn phí nên có thể không ổn định.
                    </p>
                    <p className="text-gray-600 mb-4">
                        Nếu có bất cứ lỗi gì, vui lòng liên hệ với người chịu trách nhiệm nội dung qua <a href="https://www.facebook.com/zunohoang" className="text-[#4CAF50]">zunohoang</a>.
                    </p>
                    <blockquote className="border-l-4 border-[#4CAF50] pl-4 text-gray-600 italic mb-6">
                        Phiên bản v.0.1 có thể không phải do K65 code, nhưng chắc chắn phiên bản v.0.2 trở đi sẽ do một(n) trong số các e code
                    </blockquote>
                    <div className="flex justify-end space-x-2">
                        <button
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                            onClick={onClose}
                        >
                            Đóng
                        </button>
                        <button className="px-4 py-2 bg-[#4CAF50] text-white rounded-md hover:bg-[#45a049]">
                            Bắt đầu
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}