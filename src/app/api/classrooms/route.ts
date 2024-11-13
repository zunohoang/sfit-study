import { NextResponse } from 'next/server'
import User from '@/models/User'
import Classroom from '@/models/Classroom';
import connectToDatabase from '@/lib/mongodb'

export async function POST(request: Request) {
    await connectToDatabase();

    const { email, password, title, students, teachers } = await request.json()
    const user = await User.findOne({ email, password });

    if (user) {
        return NextResponse.json({ message: 'Đăng nhập thành công', code: true, user }, { status: 200 });
    }

    const classroom = await Classroom.create({ title, students, teachers });

    if (classroom) {
        return NextResponse.json({ message: 'Tạo lớp thành công', code: true }, { status: 200 });
    }

    return NextResponse.json({ message: 'Sai tên người dùng hoặc mật khẩu', code: false }, { status: 401 })
}


export async function GET(request: Request) {
    await connectToDatabase();

    // Lấy thông tin từ query
    const url = new URL(request.url);
    const email = url.searchParams.get('email');
    const password = url.searchParams.get('password');

    console.log(email, password);

    const user = await User.findOne({ email, password });
    if (user.role === 'ADMIN') {
        const classrooms = await Classroom.find({});
        return NextResponse.json({ code: true, classes: classrooms }, { status: 200 });
    }

    return NextResponse.json({ message: 'Sai tên người dùng hoặc mật khẩu or khong du quyen', code: false }, { status: 401 })
}