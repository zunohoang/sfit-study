
/**
 * Project: study.sfit.com.vn
 * Author: zunohoang (https://github.com/zunohoang)
 * Email: nguyenvanhoang2005nt@gmail.com
 */

'use client'

import { Menu, Plus, Settings, Home, Calendar, GraduationCap, HelpCircle, Baby, UserCheck } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Bell, Book, Github, User, Users, Facebook } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Footer from '@/components/FooterUser'
import Header from '@/components/HeaderUser'


export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {


    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            {children}
            <Footer />
        </div>
    )
}