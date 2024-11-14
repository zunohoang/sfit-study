import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import Class from '@/models/Classroom';


export default async function POST(request: Request) {
    if (request.method == 'POST') {
        console.log('POST /api/admins/postClass');
        await connectToDatabase();
        // lay username password trong header basic auth
        const auth: any = request.headers.get('authorization');
        const base64Credentials: any = auth.split(' ')[1];
        const credentials: any = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [email, password]: any = credentials.split(':');

        const user = await User.findOne({ email: email, password: password });
        if (!user) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        if (user.role != 'ADMIN') {
            return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
        }

        const { title, description, teacher, students, time, studentNum } = await request.json();
        const classroom = new Class({ title, description, teacher, students, time, studentNum });
        const room = await classroom.save();

        if (room) {
            return NextResponse.json({
                success: true, data: {
                    classroom: room
                }
            }, { status: 200 });
        } else {
            return NextResponse.json({ success: false }, { status: 400 });
        }

    } else {
        return NextResponse.json({ message: `Method ${request.method} Not Allowed` }, { status: 405 });
    }
}