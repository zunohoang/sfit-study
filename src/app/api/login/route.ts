import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User'

export async function POST(request: Request) {
    await connectToDatabase();
    const { email, password } = await request.json()

    console.log(email, password);
    const user = await User.findOne({ email: email, password: password });
    console.log(user);
    if (user) {
        return NextResponse.json({ message: 'Đăng nhập thành công', code: true, user: user }, { status: 200 });
    }

    return NextResponse.json({ message: 'Sai tên người dùng hoặc mật khẩu', code: false }, { status: 401 })
}
