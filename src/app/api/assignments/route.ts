import { NextResponse } from 'next/server'
import User from '@/models/User'
import Assignment from '@/models/Assignment';
import Code from '@/models/Code';

export async function GET(request: Request) {
    const url = new URL(request.url);
    const username = url.searchParams.get("username");
    const password = url.searchParams.get("password");

    const user = await User.findOne({ username, password });

    if (!user) {
        return NextResponse.json({ message: 'Xác thực thất bại', code: false }, { status: 200 });
    }

    const assignments = await Assignment.find();

    return NextResponse.json({
        code: true,
        assignments
    }, { status: 200 });
}


export async function POST(request: Request) {
    const { username, password, codes, assignmentId } = await request.json()
    console.log(username, password, codes, assignmentId);

    const user = await User.findOne({ username, password });

    if (!user) {
        return NextResponse.json({ message: 'Xác thực thất bại', code: false }, { status: 200 });
    }

    const code = await Code.create({ userId: user._id, codes, assignmentId });
    const assignment = await Assignment.findOne({ _id: assignmentId });
    assignment.codes.push(code._id);
    assignment.save();

    if (!code) {
        return NextResponse.json({ message: 'Lưu bài tập thất bại', code: false }, { status: 200 });
    }

    return NextResponse.json({
        code: true
    }, { status: 200 });
}