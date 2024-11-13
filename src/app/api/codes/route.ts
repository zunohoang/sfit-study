import { NextResponse } from 'next/server'
import User from '@/models/User'
import Code from '@/models/Code';

export async function GET(request: Request) {
    const url = new URL(request.url);
    const username = url.searchParams.get("username");
    const password = url.searchParams.get("password");
    const assignmentId = url.searchParams.get("assignmentId");

    const user = await User.findOne({ username, password });

    if (!user) {
        return NextResponse.json({ message: 'Xác thực thất bại', code: false }, { status: 200 });
    }

    const codes = await Code.find({ userId: user._id, assignmentId });

    return NextResponse.json({
        code: true,
        codes
    }, { status: 200 });
}
