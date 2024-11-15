import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import Class from '@/models/Classroom';
import Assignment from '@/models/Assignment';


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

        const { title, description, teacher, students, time, studentNum, teachers } = await request.json();

        for (let i = 0; i < teachers.length; i++) {
            // check if teacher is valid
            const teacher: any = await User.findOne({
                email: teachers[i]
            });
            console.log(teacher);
            if (!teacher) {
                return NextResponse.json({ success: false, message: 'Teacher not found' }, { status: 400 });
            }

            teachers[i] = teacher._id
            teacher.role = 'TEACHER';
            teacher.save();
        }

        const classroom = new Class({ title, description, teacher, students, time, studentNum, teachers });
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

        if (user.role == 'TEACHER') {
            const classrooms = await Class.find({ teachers: user._id }).populate({ path: 'assignments', model: Assignment }).populate({ path: 'students', model: User });

            if (classrooms) {
                return NextResponse.json({
                    success: true, data: {
                        classrooms: classrooms
                    }
                }, { status: 200 });
            } else {
                return NextResponse.json({ success: false }, { status: 400 });
            }
        }

        if (user.role != 'ADMIN') {
            return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
        }

        const url = new URL(request.url);
        const searchParams = url.searchParams;
        const id = searchParams.get('id');
        if (id) {
            const classroom = await Class.findById(id).populate({
                path: 'assignments',
                model: Assignment
            }).populate({
                path: 'students',
                model: User
            });
            if (classroom) {
                return NextResponse.json({
                    success: true, data: {
                        classroom: classroom
                    }
                }, { status: 200 });
            } else {
                return NextResponse.json({ success: false }, { status: 400 });
            }
        }

        const classrooms = await Class.find();
        if (classrooms) {
            return NextResponse.json({
                success: true, data: {
                    classrooms: classrooms
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
        console.log('PUT /api/admins/postClass');
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

        const { id, title, description, teacher, students, time, studentNum } = await request.json();
        const room = await Class.findByIdAndUpdate(id, { title, description, teacher, students, time, studentNum }, { new: true });
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

        const { id } = await request.json();
        const result = await Class.findByIdAndDelete(id);
        if (result) {
            return NextResponse.json({
                success: true, data: {
                    classroom: result
                }
            }, { status: 200 });
        } else {
            return NextResponse.json({ success: false }, { status: 400 });
        }

    } else {
        return NextResponse.json({ message: `Method ${request.method} Not Allowed` }, { status: 405 });
    }
}

