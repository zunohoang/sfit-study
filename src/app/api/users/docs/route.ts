
/**
 * Project: study.sfit.com.vn
 * Author: zunohoang (https://github.com/zunohoang)
 * Email: nguyenvanhoang2005nt@gmail.com
 */

import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import Classroom from '@/models/Classroom';
import Assignment from '@/models/Assignment';
import Code from '@/models/Code';
import Doc from '@/models/Doc';
import { randomInt } from 'crypto';


export async function GET(request: Request) {

    try {
        connectToDatabase();

        const url = new URL(request.url);
        const assignmentId = url.searchParams.get('assignmentId');

        const assignment = await Assignment.findById(assignmentId).populate('ans');

        if (!assignment) {
            return NextResponse.json({ success: false, message: 'Assignment not found' }, { status: 404 });
        }

        return NextResponse.json({
            success: true, data: {
                ans: {
                    title: assignment.ans.title,
                    content: assignment.ans.content,
                    views: assignment.ans.views,
                    createdAt: assignment.ans.createdAt,
                    author: assignment.ans.author
                }
            }
        }, { status: 200 });

    } catch {
        return NextResponse.json({ success: false, message: "Loi server" }, { status: 500 });
    }

}

export async function POST(request: Request) {
    try {
        connectToDatabase();

        const auth: any = request.headers.get('authorization');
        const base64Credentials: any = auth.split(' ')[1];
        const credentials: any = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [email, password]: any = credentials.split(':');

        const user = await User.findOne({ email, password });
        if (!user) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }
        if (user.role == 'STUDENT') return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

        const data = await request.json();

        const newDoc = new Doc({
            title: data.title,
            content: data.content,
            author: data.author,
            views: randomInt(50)
        });

        await newDoc.save();

        const url = new URL(request.url);

        const assignmentId = url.searchParams.get('assignmentId');
        if (!assignmentId) {
            return NextResponse.json({
                success: true, message: 'Successfully submitted', data: {
                    url: `/docs/${newDoc._id}`
                }
            }, { status: 200 });
        }

        const assignment = await Assignment.findById(assignmentId);

        if (!assignment) {
            return NextResponse.json({
                success: true, message: 'Assignment not found but submitok', data: {
                    url: `/docs/${newDoc._id}`
                }
            }, { status: 200 });
        }
        assignment.ans = newDoc._id;
        await assignment.save();

        return NextResponse.json({
            success: true, message: 'Successfully submitted', data: {
                url: `/docs/${newDoc._id}`
            }
        }, { status: 200 });

    }

    catch {
        return NextResponse.json({ success: false, message: "Loi server" }, { status: 500 });
    }

}