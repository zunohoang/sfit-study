import mongoose from 'mongoose'

const codeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    codes: {
        type: [
            {
                index: { type: Number },
                content: { type: String },
            }
        ]
    },
    assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true },
})

const Code = mongoose.models.Code || mongoose.model('Code', codeSchema)

export default Code
