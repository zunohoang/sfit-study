import { NextResponse } from 'next/server'
import User from '@/models/User'
import connectToDatabase from '@/lib/mongodb'

export async function POST(request: Request) {
    await connectToDatabase();
    const { password, fullName, loptruong, msv, email } = await request.json()

    const user = await User.create({ password, email, fullName, loptruong, msv, role: 'STUDENT', classRoom: [] });

    if (user) {
        return NextResponse.json({ message: 'Đăng ký thành công', code: true }, { status: 200 });
    }

    return NextResponse.json({ message: 'Sai tên người dùng hoặc mật khẩu', code: false }, { status: 401 })
}
