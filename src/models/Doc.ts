
/**
 * Project: study.sfit.com.vn
 * Author: zunohoang (https://github.com/zunohoang)
 * Email: nguyenvanhoang2005nt@gmail.com
 */

import mongoose from "mongoose";

const docSchema = new mongoose.Schema({
    title: { type: String },
    content: { type: String },
    views: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    author: { type: String }
})

const Doc = mongoose.models.Doc || mongoose.model('Doc', docSchema)

export default Doc