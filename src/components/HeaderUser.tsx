'use client';

/**
 * Project: study.sfit.com.vn
 * Author: zunohoang (https://github.com/zunohoang)
 * Email: nguyenvanhoang2005nt@gmail.com
 */

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Bell, User } from 'lucide-react'

export default function Header() {

    const [showMenu, setShowMenu] = useState(false);
    const router = useRouter();

    const [fullName, setFullName] = useState('');
    const [role, setRole] = useState('');
    const [team, setTeam] = useState('');
    const [msv, setMsv] = useState('');
    const [loptruong, setLoptruong] = useState('');

    useEffect(() => {
        setFullName(localStorage.getItem('fullName') || '');
        setRole(localStorage.getItem('role') || '');
        setTeam(localStorage.getItem('team') || '');
        setMsv(localStorage.getItem('msv') || '');
        setLoptruong(localStorage.getItem('loptruong') || '');
    }, [])

    const pathName = usePathname();
    const navItems: any = [
        {
            title: "Lớp học",
            href: '/classes'
        },
        {
            title: "Bảng tin",
            href: '/news'
        },
        {
            title: "Liên hệ",
            href: 'https://www.facebook.com/sfit.utc'
        }
    ]
    const active = 'border-green-500 text-gray-900 inline-flex items-center p-5 border-b-2 text-sm font-medium';
    const unActive = 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium';

    return (
        <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0">
                            <span className="text-2xl font-bold text-green-600">SFIT</span>
                        </Link>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            {
                                navItems && navItems.map((item: any, index: number) => (
                                    <Link href={item.href} key={index} className={item.href == pathName ? active : unActive} >
                                        {item.title}
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                            <span className="sr-only">Xem thông báo</span>
                            <Bell className="h-6 w-6" />
                        </button>
                        <p className='text-green-900 bg-green-400 px-2 rounded-xl'>{role}</p>
                        <p className='hidden md:block'>|</p>
                        <p className='hidden md:block text-green-700 font-medium'>{fullName}</p>
                        <div className="ml-3 relative">
                            <div>
                                <div className="relative"></div>
                                <button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" onClick={() => setShowMenu(!showMenu)}>
                                    <span className="sr-only">Mở menu người dùng</span>
                                    <User className="h-8 w-8 rounded-full text-white bg-green-600 p-1" />
                                </button>
                                {showMenu && (
                                    <div className="z-10 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                                        <div className="block px-4 py-2 text-sm text-gray-700">
                                            <p className="font-medium">Người dùng: {localStorage.getItem('fullName') || ''}</p>
                                            <p className="text-gray-500">{localStorage.getItem('team') || ''}</p>
                                            <p className="text-gray-500">{localStorage.getItem('msv') || ''}</p>
                                            <p className="text-gray-500">{localStorage.getItem('loptruong') || ''}</p>
                                        </div>
                                        <div>
                                            { role == "TEACHER" &&
                                            <Link href="/admins/docs">
                                                <p className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Tạo tài liệu</p>
                                            </Link>
                                            }
                                        </div>
                                        <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => {
                                            localStorage.clear();
                                            router.push('/login');
                                        }}>Đăng xuất</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header >
    )
}