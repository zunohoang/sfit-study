import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    deadline: { type: Number },
    problems: { type: [String] },
    classroom: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' },
})

const Assignment = mongoose.models.Assignment || mongoose.model('Assignment', assignmentSchema)

export default Assignment