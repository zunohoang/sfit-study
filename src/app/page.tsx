'use client';

import React, { useState } from 'react'

interface Class {
  id: number;
  name: string;
  code: string;
}

export default function StudentProfile() {
  const [classes, setClasses] = useState<Class[]>([
    { id: 1, name: "Toán cao cấp", code: "MATH101" },
    { id: 2, name: "Lập trình cơ bản", code: "CS101" },
    { id: 3, name: "Tiếng Anh giao tiếp", code: "ENG201" },
  ])

  const [newClass, setNewClass] = useState<string>("")
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  const handleJoinClass = () => {
    if (newClass) {
      setClasses([...classes, { id: classes.length + 1, name: newClass, code: `CLASS${classes.length + 1}` }])
      setNewClass("")
      setIsDialogOpen(false)
    }
  }

  const handleEnterClass = (classId: number) => {
    // Here you would typically navigate to the class page
    console.log(`Entering class with id: ${classId}`)
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 flex items-center space-x-4">
          <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-2xl font-bold text-white">
            HS
          </div>
          <div>
            <h2 className="text-2xl font-bold">Nguyễn Văn A</h2>
            <p className="text-gray-600">Lớp 12A1 - Trường THPT Chu Văn An</p>
          </div>
        </div>
        <div className="px-6 py-4">
          <h3 className="text-lg font-semibold mb-2">Các lớp học đã tham gia</h3>
          <div className="h-64 overflow-y-auto border rounded-md p-4">
            {classes.map((cls) => (
              <div key={cls.id} className="flex justify-between items-center mb-4 last:mb-0">
                <div>
                  <span className="font-medium">{cls.name}</span>
                  <span className="ml-2 px-2 py-1 bg-gray-200 text-xs rounded-full">{cls.code}</span>
                </div>
                <button
                  onClick={() => handleEnterClass(cls.id)}
                  className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
                >
                  Vào lớp học
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="px-6 py-4 border-t">
          <button
            onClick={() => setIsDialogOpen(true)}
            className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            Tham gia lớp học mới
          </button>
        </div>
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Tham gia lớp học</h3>
            <p className="text-gray-600 mb-4">Nhập tên lớp học bạn muốn tham gia. Nhấn Tham gia khi hoàn tất.</p>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Tên lớp
              </label>
              <input
                type="text"
                id="name"
                value={newClass}
                onChange={(e) => setNewClass(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsDialogOpen(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-100 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleJoinClass}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Tham gia
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}