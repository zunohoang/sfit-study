import mongoose from 'mongoose'

const assignmentSchema = new mongoose.Schema({
    title: { type: String },
    problems: {
        type: [
            {
                title: { type: String },
                content: { type: String },
            }
        ]
    }
})

const Assignment = mongoose.models.Assignment || mongoose.model('Assignment', assignmentSchema)

export default Assignment
