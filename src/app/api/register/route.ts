
/**
 * Project: study.sfit.com.vn
 * Author: zunohoang (https://github.com/zunohoang)
 * Email: nguyenvanhoang2005nt@gmail.com
 */

import { NextResponse } from 'next/server'
import User from '@/models/User'
import connectToDatabase from '@/lib/mongodb'

export async function POST(request: Request) {
    await connectToDatabase();
    const { password, fullName, loptruong, msv, email, team } = await request.json()

    const user = await User.create({ password, email, fullName, loptruong, msv, role: 'STUDENT', classRoom: [], team });

    if (user) {
        return NextResponse.json({ message: 'Đăng ký thành công', code: true }, { status: 200 });
    }

    return NextResponse.json({ message: 'Sai tên người dùng hoặc mật khẩu', code: false }, { status: 401 })
}
