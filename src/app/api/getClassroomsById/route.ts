import { NextResponse } from 'next/server'
import User from '@/models/User'
import Classroom from '@/models/Classroom';
import connectToDatabase from '@/lib/mongodb'

export async function GET(request: Request) {
    await connectToDatabase();

    // Lấy thông tin từ query
    const url = new URL(request.url);
    const email = url.searchParams.get('email');
    const password = url.searchParams.get('password');
    const classId = url.searchParams.get('classId');
    console.log(email, password);

    const user = await User.findOne({ email, password });
    if (user.role === 'ADMIN') {
        const classroom = await Classroom.findOne({ _id: classId });
        return NextResponse.json({ code: true, classes: classroom }, { status: 200 });
    }

    return NextResponse.json({ message: 'Sai tên người dùng hoặc mật khẩu or khong du quyen', code: false }, { status: 401 })
}