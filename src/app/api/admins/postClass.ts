import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import Class from '@/models/Classroom';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        console.log('POST /api/admins/postClass');
        connectToDatabase();
        // lay username password trong header basic auth
        const auth: any = req.headers.authorization;
        const base64Credentials: any = auth.split(' ')[1];
        const credentials: any = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [email, password]: any = credentials.split(':');

        const user = await User.findOne({ email: email, password: password });
        if (!user) {
            res.status(401).json({ success: false, message: 'Unauthorized' });
            return;
        }

        if (user.role != 'ADMIN') {
            res.status(403).json({ success: false, message: 'Forbidden' });
            return;
        }

        const { title, description, teacher, students, time, studentNum } = req.body;
        const classroom = new Class({ title, description, teacher, students, time, studentNum });
        const room = await classroom.save();

        if (room) {
            res.status(200).json({
                success: true, data: {
                    classroom: room
                }
            });
        } else {
            res.status(400).json({ success: false });
        }

    } else {
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}