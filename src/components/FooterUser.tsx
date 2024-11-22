
/**
 * Project: study.sfit.com.vn
 * Author: zunohoang (https://github.com/zunohoang)
 * Email: nguyenvanhoang2005nt@gmail.com
 */

import Link from "next/link";
import { Bell, Book, Github, User, Users, Youtube, Facebook } from 'lucide-react'


export default function Footer() {
    return (
        <footer className="bg-white">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
                <div className="flex justify-center space-x-6 md:order-2">
                    <Link href="#" className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Facebook</span>
                        <Facebook className="h-6 w-6" />
                    </Link>
                    <Link href="#" className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">GitHub</span>
                        <Github className="h-6 w-6" />
                    </Link>
                </div>
                <div className="mt-8 md:mt-0 md:order-1">
                    <p className="text-center text-base text-gray-400">
                        &copy; 2024 SFIT, Inc. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}