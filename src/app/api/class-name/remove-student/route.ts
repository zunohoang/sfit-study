
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

        const url = new URL(request.url);
        const id: any = url.searchParams.get('id');

        // get name of class
        const classroom: any = await Classroom.findOne({ _id: id });

        if (!classroom) {
            return NextResponse.json({ success: false, message: 'Classroom not found' }, { status: 404 });
        }

        return NextResponse.json({
            success: true, data: {
                name: classroom.title,
            }
        });
    }
}