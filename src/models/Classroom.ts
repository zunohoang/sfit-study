import mongoose from 'mongoose'

const classroomSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    teacher: { type: String },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    time: { type: String },
    studentNum: { type: Number },
    assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }]
})

const Classroom = mongoose.models.Classroom || mongoose.model('Classroom', classroomSchema)

export default Classroom
