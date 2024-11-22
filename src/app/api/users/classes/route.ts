
/**
 * Project: study.sfit.com.vn
 * Author: zunohoang (https://github.com/zunohoang)
 * Email: nguyenvanhoang2005nt@gmail.com
 */

import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import Assignment from '@/models/Assignment';
import Classroom from '@/models/Classroom';
import Code from '@/models/Code';
import path from 'path';

export async function GET(request: Request) {
    if (request.method == 'GET') {
        await connectToDatabase();
        // lay username password trong header basic auth
        const auth: any = request.headers.get('authorization');
        const base64Credentials: any = auth.split(' ')[1];
        const credentials: any = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [email, password]: any = credentials.split(':');

        const user = await User.findOne({ email, password }).populate({ path: 'classroom', model: Classroom });
        console.log(user.classroom);
        if (!user) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const url = new URL(request.url);
        if (url.searchParams.get('id')) {
            const id: any = url.searchParams.get('id');
            console.log(id);

            const classroom: any = await Classroom.findOne({ _id: id }).populate({
                path: 'assignments',
                model: Assignment,
                options: { sort: { createdAt: -1 } } // Sort assignments by createdAt in descending order
            }).populate({
                path: 'students',
                model: User,
                select: 'fullName _id loptruong'
            });

            let codes: Array<any> = [];
            for (let i = 0; i < classroom.assignments.length; i++) {
                const assignment = classroom.assignments[i];
                const code = await Code.findOne({ assignment: assignment._id, user: user._id });
                if (code) {
                    codes.push(code);
                }
            }
            if (!classroom) {
                return NextResponse.json({ success: false, message: 'Classroom not found' }, { status: 404 });
            }
            return NextResponse.json({
                success: true, data: {
                    classroom: classroom,
                    codes: codes
                }
            }, { status: 200 });
        }


        if (user.classroom) {
            return NextResponse.json({
                success: true, data: {
                    classrooms: user.classroom
                }
            }, { status: 200 });
        } else {
            return NextResponse.json({ success: false }, { status: 400 });
        }


    } else {
        return NextResponse.json({ message: `Method ${request.method} Not Allowed` }, { status: 405 });
    }
}


export async function POST(request: Request) {
    if (request.method == 'POST') {
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

        const { classroomCode } = await request.json();
        const classroom = await Classroom.findById(classroomCode);
        if (!classroom) {
            return NextResponse.json({ success: false, message: 'Classroom not found' }, { status: 404 });
        }

        if (classroom.students.includes(user._id)) {
            return NextResponse.json({ success: true, message: 'You are already in this classroom' }, { status: 400 });
        }

        classroom.students.push(user._id);

        await classroom.save();
        user.classroom.push(classroom._id);
        await user.save();

        return NextResponse.json({
            success: true, data: {
                classroom: classroom
            }
        }, { status: 200 });
    }
}