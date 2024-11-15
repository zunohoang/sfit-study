'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import axios from 'axios'
import { useRouter } from "next/navigation"

export default function Component() {
    const [isLoading, setIsLoading] = useState(false)
    const [name, setName] = useState('')
    const [loptruong, setLoptruong] = useState('')
    const [studentId, setStudentId] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [team, setTeam] = useState('')
    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem('email') && localStorage.getItem('password')) {
            const check = confirm('Phiên sử dụng của bận chưa hết hạn, bạn có muốn đăng xuất để đăng kí tài khoản khác không?\nChọn "OK" để đăng xuất rồi đăng kí lại hoặc "Cancel" để tiếp tục sử dụng tài khoản đã từng đăng nhập');
            if (check) {
                localStorage.removeItem('email');
                localStorage.removeItem('fullName');
                localStorage.removeItem('team');
                localStorage.removeItem('msv');
                localStorage.removeItem('loptruong');
                localStorage.removeItem('role');
                localStorage.removeItem('password');
            } else {
                router.push('/classes')
            }
        }
    }, [])

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const key = event.target.id;
        const value = event.target.value;
        switch (key) {
            case 'name':
                setName(value);
                break;
            case 'loptruong':
                setLoptruong(value);
                break;
            case 'studentId':
                setStudentId(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'confirmPassword':
                setConfirmPassword(value);
                break;
            case 'team':
                setTeam(value);
                break;
        }
    }

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)

        if (password != confirmPassword) {
            alert('Mật khẩu không khớp')
            setIsLoading(false);
        }

        // Simulating an API call
        const response = await axios.post('/api/register', {
            email: email,
            password: password,
            fullName: name,
            loptruong: loptruong,
            msv: studentId,
            team: team
        });

        const data = response.data;
        if (data.code) {
            alert('Đăng ký thành công');
            router.push('/login');
        } else {
            alert('Đăng ký thất bại');
        }

        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }

    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-green-50 to-white lg:grid lg:grid-cols-2">
            {
                isLoading && (
                    <div className="fixed z-10 top-0 flex justify-center items-center w-full bg-black bg-opacity-80 h-screen">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
                        <div className="text-green-700 fixed font-black animate-pulse">
                            SFIT
                        </div>
                        <div className="animate-spin rounded-full h-20 w-20 border-r-2 fixed border-l-2 border-green-400"></div>
                    </div>
                )
            }
            <div className="flex items-center justify-center px-8 py-12 md:px-12">
                <div className="mx-auto w-full max-w-sm space-y-6">
                    <div className="space-y-2 text-center">
                        <h1 className="text-4xl font-bold tracking-tighter text-green-600">SFIT</h1>
                        <h2 className="text-xl font-semibold tracking-tight">UTC&apos;S IT CLUB</h2>
                        <p className="text-sm text-gray-500">
                            Đăng ký tài khoản SFIT CLASSROOM ngay hôm nay
                        </p>
                    </div>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Họ và tên</label>
                            <input
                                id="name"
                                name="name"
                                onChange={onChangeInput}
                                value={name}
                                className="py-2 px-3 h-10 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                                placeholder="Nguyễn Văn A"
                                required
                            />
                        </div>
                        <div className="flex space-x-4">
                            <div className="flex-1 space-y-2">
                                <label htmlFor="loptruong" className="block text-sm font-medium text-gray-700">Lớp (Ở trường)</label>
                                <input
                                    id="loptruong"
                                    name="loptruong"
                                    onChange={onChangeInput}
                                    value={loptruong}
                                    className="py-2 px-3 h-10 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                                    placeholder="Lớp của bạn"
                                    required
                                />
                            </div>
                            <div className="flex-1 space-y-2">
                                <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">Mã sinh viên</label>
                                <input
                                    id="studentId"
                                    name="studentId"
                                    onChange={onChangeInput}
                                    value={studentId}
                                    className="py-2 px-3 h-10 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                                    placeholder="123456789"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                id="email"
                                name="email"
                                onChange={onChangeInput}
                                value={email}
                                className="py-2 px-3 h-10 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                                placeholder="example@gmail.com"
                                required
                                type="email"
                            />
                        </div>
                        <div className="flex space-x-4">
                            <div className="space-y-2">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mật khẩu</label>
                                <input
                                    id="password"
                                    name="password"
                                    onChange={onChangeInput}
                                    value={password}
                                    className="py-2 px-3 h-10 mt-1 block w-full rounded-md border-gray-400 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                                    required
                                    type="password"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Xác nhận mật khẩu</label>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    onChange={onChangeInput}
                                    value={confirmPassword}
                                    className="py-2 px-3 h-10 mt-1 block w-full rounded-md border-gray-400 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                                    required
                                    type="password"
                                />
                            </div>
                        </div>
                        <button
                            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={isLoading}
                        >
                            {isLoading && (
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            )}
                            Đăng ký
                        </button>
                    </form>
                    <div className="text-center text-sm text-gray-500">
                        Đã có tài khoản?{" "}
                        <Link href="/login" className="text-green-600 hover:underline">
                            Đăng nhập
                        </Link>
                    </div>
                </div>
            </div>
            <div className="hidden lg:block">
                <div className="h-full bg-[url('/bgclb.jpg')] bg-cover bg-center bg-no-repeat" />
            </div>
        </div>
    )
}