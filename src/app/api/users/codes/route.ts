import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import Classroom from '@/models/Classroom';
import Assignment from '@/models/Assignment';
import Code from '@/models/Code';

export async function POST(request: Request) {
    if (request.method == 'POST') {
        await connectToDatabase();
        // lay username password trong header basic auth
        const auth: any = request.headers.get('authorization');
        const base64Credentials: any = auth.split(' ')[1];
        const credentials: any = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [email, password]: any = credentials.split(':');

        const user = await User.findOne({ email: email, password: password }).populate({ path: 'classroom', model: Classroom });
        if (!user) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        // add code
        // kiem tra xem nguoi dung da nop bai tap cho assignmentId chua
        const { assignmentId, codes }: any = await request.json();

        const code = await Code.findOne({ assignment: assignmentId, user: user._id });
        if (code) {
            code.codes = codes;
            code.save();

            return NextResponse.json({
                success: true, data: {
                    code: code
                }
            }, { status: 200 });
        }
        const newCode: any = await Code.create({ assignment: assignmentId, codes, user: user._id });
        newCode.save();

        if (newCode) {
            return NextResponse.json({
                success: true, data: {
                    assignment: newCode
                }
            }, { status: 200 });
        } else {
            return NextResponse.json({ success: false }, { status: 400 });
        }


    } else {
        return NextResponse.json({ message: `Method ${request.method} Not Allowed` }, { status: 405 });
    }
}