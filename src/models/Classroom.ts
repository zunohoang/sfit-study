import mongoose from 'mongoose'

const classroomSchema = new mongoose.Schema({
    title: { type: String, required: true },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
    teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }],
    active: { type: Boolean, default: true },
})

const Classroom = mongoose.models.Classroom || mongoose.model('Classroom', classroomSchema)

export default Classroom
