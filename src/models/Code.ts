import mongoose from "mongoose";

const codeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    assignment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' },
    codes: { type: [String] },
});

const Code = mongoose.models.Code || mongoose.model('Code', codeSchema)

export default Code