'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from 'axios'

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter();

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)
        console.log(email, password);

        try {

            const response = await axios.post('/api/login', {
                email: email,
                password: password
            });

            if (response.data.code) {
                setIsLoading(false);
                localStorage.setItem('email', email);
                localStorage.setItem('fullName', response.data.user.fullName);
                localStorage.setItem('team', response.data.user.team);
                localStorage.setItem('msv', response.data.user.msv);
                localStorage.setItem('loptruong', response.data.user.loptruong);
                localStorage.setItem('role', response.data.user.role);
                localStorage.setItem('password', password);
                if (response.data.user.role == 'ADMIN') {
                    router.push('/admins/classes')
                } else {
                    router.push('/classes')
                }
            } else {
                setIsLoading(false)
                alert('Sai tên người dùng hoặc mật khẩu')
            }
        } catch (error) {
            setIsLoading(false)
            alert('Sai tên người dùng hoặc mật khẩu')
        }

        // Simulating an API call
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    }

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const key = event.target.id;
        const value = event.target.value;
        switch (key) {
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
        }
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
            <div className="flex items-center justify-center px-8 py-12 md:px-12 order-2">
                <div className="mx-auto w-full max-w-sm space-y-6">
                    <div className="space-y-2 text-center">
                        <h1 className="text-4xl font-bold tracking-tighter text-green-600">SFIT</h1>
                        <h2 className="text-xl font-semibold tracking-tight">UTC&apos;S IT CLUB</h2>
                        <p className="text-sm text-gray-500">
                            Đăng nhập vào tài khoản của bạn
                        </p>
                    </div>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                id="email"
                                name="email"
                                value={email}
                                onChange={onChangeInput}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 py-2 px-3 h-10"
                                placeholder="example@gmail.com"
                                required
                                type="email"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mật khẩu</label>
                            <input
                                id="password"
                                name="password"
                                value={password}
                                onChange={onChangeInput}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 py-2 px-3 h-10"
                                required
                                type="password"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Ghi nhớ đăng nhập
                                </label>
                            </div>
                            <div className="text-sm">
                                <a href="#" className="font-medium text-green-600 hover:text-green-500">
                                    Quên mật khẩu?
                                </a>
                            </div>
                        </div>
                        <button
                            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Đang đăng nhập...
                                </>
                            ) : 'Đăng nhập'}
                        </button>
                    </form>
                    <div className="text-center text-sm text-gray-500">
                        Chưa có tài khoản?{" "}
                        <Link href="/register" className="text-green-600 hover:underline">
                            Đăng ký
                        </Link>
                    </div>
                </div>
            </div>
            <div className="hidden lg:block">
                <div className="h-full bg-[url('/bgclb.jpg')] bg-cover bg-center bg-no-repeat order-1" />
            </div>
        </div>
    )
}