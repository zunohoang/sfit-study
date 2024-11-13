'use client'

import { useState, useEffect } from 'react'
import DisplayContent from '@/components/DisplayContent'
import TextEditor from '@/components/EditerContent'

type SubExercise = {
    id: string
    name: string
    description: string
    sets: number
    reps: number
}

type Exercise = {
    id: string
    name: string
    description: string
    subExercises: SubExercise[]
}

export default function HierarchicalExerciseCreator() {
    const [exercises, setExercises] = useState<Exercise[]>([])
    const [currentExercise, setCurrentExercise] = useState<Exercise>({
        id: '',
        name: '',
        description: '',
        subExercises: []
    })
    const [subExercise, setSubExercise] = useState<SubExercise>({
        id: '',
        name: '',
        description: '',
        sets: 0,
        reps: 0
    })

    const handleExerciseChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCurrentExercise({ ...currentExercise, [e.target.name]: e.target.value })
    }

    const handleSubExerciseChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSubExercise({ ...subExercise, [e.target.name]: e.target.value })
    }

    const [content, setContent] = useState<string>('')

    useEffect(() => {
        setSubExercise({ ...subExercise, description: 'dsvd' })
    }, [content])

    const addSubExercise = (e: React.FormEvent) => {
        e.preventDefault()
        const newSubExercise = { ...subExercise, id: Date.now().toString() }
        setCurrentExercise({
            ...currentExercise,
            subExercises: [...currentExercise.subExercises, newSubExercise]
        })
        setSubExercise({ id: '', name: '', description: '', sets: 0, reps: 0 })
    }

    const addExercise = (e: React.FormEvent) => {
        e.preventDefault()
        if (currentExercise.name) {
            const newExercise = { ...currentExercise, id: Date.now().toString() }
            console.log(newExercise)
            setExercises([...exercises, newExercise])
            setCurrentExercise({ id: '', name: '', description: '', subExercises: [] })
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">Thêm bài tập</h1>

                    <form onSubmit={addExercise} className="space-y-6 mb-8">
                        <div>
                            <label htmlFor="exerciseName" className="block text-sm font-medium text-gray-700">
                                Tiêu đề
                            </label>
                            <input
                                type="text"
                                id="exerciseName"
                                name="name"
                                value={currentExercise.name}
                                onChange={handleExerciseChange}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        {currentExercise.subExercises.length > 0 && (
                            <div className="mt-4">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Bài tập con</h3>
                                <ul className="space-y-2">
                                    {currentExercise.subExercises.map((sub, index) => (
                                        <li key={sub.id} className="bg-gray-50 p-3 rounded-md">
                                            <h4 className="font-medium">{sub.name}</h4>
                                            <DisplayContent content={sub.description} />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="bg-gray-50 p-4 rounded-md">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Thêm bài tập con</h3>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="subExerciseName" className="block text-sm font-medium text-gray-700">
                                        Tiêu đề
                                    </label>
                                    <input
                                        type="text"
                                        id="subExerciseName"
                                        name="name"
                                        value={subExercise.name}
                                        onChange={handleSubExerciseChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="subExerciseDescription" className="block text-sm font-medium text-gray-700">
                                        Nội dung
                                    </label>
                                    <TextEditor content={content} setContent={setContent} />
                                </div>
                                <button
                                    type="button"
                                    onClick={addSubExercise}
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Thêm bài tập con
                                </button>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                Tạo bài tập con
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}