import { useState } from 'react'
import { Plus } from 'lucide-react'
import TextEditor from './EditerContent'
import axios from 'axios'


export default function EditProblemModal({ isOpen, setIsOpen, problem }: any) {
    if (!isOpen) return null

    const [newProblem, setNewProblem] = useState<any>({
        _id: problem._id,
        title: problem.title,
        description: problem.description,
        deadline: problem.deadline,
        problems: problem.problems
    })

    const submitProblem = async (e: any) => {
        console.log(newProblem);
        const check = confirm('Bạn có chắc chắn muốn cập nhật bài tập này?');
        if (!check) return
        try {
            const email = localStorage.getItem('email')
            const password = localStorage.getItem('password')
            if (newProblem.problems.length === 0 || newProblem.title === '' || newProblem.description === '' || newProblem.deadline === '') {
                alert('Vui lòng điền đầy đủ thông tin')
                return
            }
            const response = await axios.put(`/api/admins/assignments`, {
                _id: newProblem._id,
                title: newProblem.title,
                description: newProblem.description,
                deadline: newProblem.deadline,
                problems: newProblem.problems
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${btoa(`${email}:${password}`)}`
                }
            });

            const data = response.data;
            if (data.success) {
                console.log(data.data.assignment);
                alert('Cập nhật bài tập thành công');
                setIsOpen(false);
                window.location.reload();
            } else {
                alert('Cập nhật bài tập thất bại');
            }
        } catch (error) {
            console.error(error)
        }
    }

    const submitHandle = (e: any) => {
        e.preventDefault();
    }

    return (
        <div className="fixed top-0 left-0  inset-0 bg-black h-full bg-opacity-50 overflow-y-auto flex justify-center z-20">
            <div className="bg-white w-[60%] rounded-lg shadow-lg overflow-y-auto mt-1">
                <div className="relative p-6">
                    <div className="">
                        <button
                            type="button"
                            className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            onClick={() => setIsOpen(false)}
                        >
                            <span className="sr-only">Close</span>
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-lg leading-6 font-medium text-green-500 mb-4">Chỉnh sửa bài tập {problem.title}</h3>
                        <form onSubmit={submitHandle} className="mt-6">
                            <div className="grid grid-cols-1 gap-y-6 gap--x-4 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                        Tiêu đề
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="title"
                                            id="title"
                                            placeholder='Điền kiểu: Buổi 1 - Lệnh rẽ nhánh, Toán tử'
                                            value={newProblem.title}
                                            onChange={(e) => setNewProblem({ ...newProblem, title: e.target.value })}
                                            className="py-2 outline-none shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                                        Hạn nộp
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="date"
                                            name="dueDate"
                                            id="dueDate"
                                            value={newProblem.deadline}
                                            onChange={(e) => setNewProblem({ ...newProblem, deadline: e.target.value })}
                                            className="py-2 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-6">
                                    <p className="block text-sm font-medium text-gray-700">
                                        Nội dung
                                    </p>
                                    <div className="mt-1">
                                        <TextEditor content={newProblem.description} setContent={(value) => setNewProblem((pre: any) => ({ ...pre, description: value }))} />
                                    </div>
                                </div>
                            </div>
                            <div className=''>
                                <div className='flex'>
                                    <h1 className='text-sm font-medium text-gray-700'>Bài tập con</h1>
                                </div>
                                <div className="mt-2 rounded-md bg-gray-100 p-4">
                                    {newProblem.problems && newProblem.problems.map((problem: any, index: any) => (
                                        <div key={index} className="bg-white p-2 my-2 rounded-md">
                                            <p className="text-sm font-medium text-gray-700">Bài {index + 1}</p>
                                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                                Nội dung
                                            </label>
                                            <div className="mt-1">
                                                <TextEditor content={problem} setContent={(value) => setNewProblem((prev: any) => ({ ...prev, problems: prev.problems.map((p: any, i: any) => i === index ? value : p) }))} />
                                            </div>
                                        </div>
                                    ))}
                                    <div className='w-fit flex items-center gap-2 text-gray-100 p-2 rounded-md ml-2 bg-green-500 cursor-pointer' onClick={() => setNewProblem((prev: any) => ({ ...prev, problems: [...prev.problems, 'Bài....'] }))}>
                                        <Plus className='h-5 w-5' />
                                        Thêm bài tập con
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end w-full">
                                <button
                                    onClick={submitProblem}
                                    type="submit"
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    <Plus className="mr-2 h-5 w-5" />
                                    Cập nhật
                                </button>
                            </div>
                        </form>
                        <br />
                    </div>
                </div>
            </div>
        </div>
    )

}