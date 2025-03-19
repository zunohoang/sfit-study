
/**
 * Project: study.sfit.com.vn
 * Author: zunohoang (https://github.com/zunohoang)
 * Email: nguyenvanhoang2005nt@gmail.com
 */

import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import Class from '@/models/Classroom';
import Assignment from '@/models/Assignment';


export async function DELETE(request: Request) {
    if (request.method == 'DELETE') {
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


        const url = new URL(request.url);
        const id: any = url.searchParams.get('id');
        const classroom: any = await Class.findOne({ _id: id });

        if (!classroom) {
            return NextResponse.json({ success: false, message: 'Classroom not found' }, { status: 404 });
        }

        // check if user is teacher of class
        if (classroom.teacher.toString() !== user._id.toString()) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const studentId: any = url.searchParams.get('studentId');
        const index: any = classroom.students.indexOf(studentId);
        if (index > -1) {
            classroom.students.splice(index, 1);
        }

        classroom.save();

        return NextResponse.json({ success: true, message: 'Student removed from class' });

    } else {
        return NextResponse.json({ message: `Method ${request.method} Not Allowed` }, { status: 405 });
    }
}

