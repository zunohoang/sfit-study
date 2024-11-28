
/**
 * Project: study.sfit.com.vn
 * Author: zunohoang (https://github.com/zunohoang)
 * Email: nguyenvanhoang2005nt@gmail.com
 */

import mongoose from 'mongoose'
import Assignment from './Assignment'
import User from './User'


const classroomSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    teacher: { type: String },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    teachers: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], default: [] },
    time: { type: String },
    news: [{ type: String }],
    studentNum: { type: Number },
    assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }],
    createdAt: { type: Date, default: Date.now },
})

const Classroom = mongoose.models.Classroom || mongoose.model('Classroom', classroomSchema)

export default Classroom
