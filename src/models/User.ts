
/**
 * Project: study.sfit.com.vn
 * Author: zunohoang (https://github.com/zunohoang)
 * Email: nguyenvanhoang2005nt@gmail.com
 */

import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    fullName: { type: String },
    password: { type: String },
    role: { type: String, default: 'STUDENT' },
    email: { type: String },
    loptruong: { type: String },
    msv: { type: String },
    team: { type: String },
    classroom: {
        type: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' },
        ], default: []
    },
    createdAt: { type: Date, default: Date.now },
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User
