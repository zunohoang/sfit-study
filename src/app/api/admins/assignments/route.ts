import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import Class from '@/models/Classroom';
import Assignment from '@/models/Assignment';
import Code from '@/models/Code';


export async function POST(request: Request) {
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

        // tao assignment
        const { classroomId, title, description, deadline, problems } = await request.json();
        const assignment = new Assignment({ classroom: classroomId, title, description, deadline, problems });
        const classroom = await Class.findById(classroomId);
        classroom.assignments.push(assignment);
        classroom.save();
        const result = await assignment.save();

        if (result) {
            return NextResponse.json({
                success: true, data: {
                    assignment: result
                }
            }, { status: 200 });
        } else {
            return NextResponse.json({ success: false }, { status: 400 });
        }


    } else {
        return NextResponse.json({ message: `Method ${request.method} Not Allowed` }, { status: 405 });
    }
}

export async function GET(request: Request) {
    if (request.method == 'GET') {
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

        const url = new URL(request.url);
        if (url.searchParams.get('assignmentId')) {
            const assignmentId: any = url.searchParams.get('assignmentId');
            const assignment = await Assignment.findById(assignmentId);
            const codes = await Code.find({ assignment: assignmentId });
            assignment.codes = codes;
            if (!assignment) {
                return NextResponse.json({ success: false, message: 'Assignment not found' }, { status: 404 });
            }
            return NextResponse.json({
                success: true, data: {
                    assignment: assignment
                }
            }, { status: 200 });
        }

        const classroomId: any = url.searchParams.get('classroomId');
        const assignments = await Assignment.find({ classroom: classroomId });

        if (assignments) {
            return NextResponse.json({
                success: true, data: {
                    assignments: assignments
                }
            }, { status: 200 });
        } else {
            return NextResponse.json({ success: false }, { status: 400 });
        }

    } else {
        return NextResponse.json({ message: `Method ${request.method} Not Allowed` }, { status: 405 });
    }
}



export async function PUT(request: Request) {
    if (request.method == 'PUT') {
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

        const { assignmentId, title, description, deadline, problems } = await request.json();
        const result = await Assignment.findByIdAndUpdate(assignmentId, { title, description, deadline, problems });

        if (result) {
            return NextResponse.json({
                success: true, data: {
                    assignment: result
                }
            }, { status: 200 });
        } else {
            return NextResponse.json({ success: false }, { status: 400 });
        }

    } else {
        return NextResponse.json({ message: `Method ${request.method} Not Allowed` }, { status: 405 });
    }
}

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

        if (user.role != 'ADMIN') {
            return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
        }

        const { assignmentId } = await request.json();
        const result = await Assignment.findByIdAndDelete(assignmentId);

        if (result) {
            return NextResponse.json({
                success: true, data: {
                    assignment: result
                }
            }, { status: 200 });
        } else {
            return NextResponse.json({ success: false }, { status: 400 });
        }

    } else {
        return NextResponse.json({ message: `Method ${request.method} Not Allowed` }, { status: 405 });
    }
}