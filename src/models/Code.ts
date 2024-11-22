
/**
 * Project: study.sfit.com.vn
 * Author: zunohoang (https://github.com/zunohoang)
 * Email: nguyenvanhoang2005nt@gmail.com
 */

import { create } from "domain";
import mongoose from "mongoose";

const codeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    assignment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' },
    codes: { type: [String] },
    createdAt: { type: Date, default: Date.now },
});

const Code = mongoose.models.Code || mongoose.model('Code', codeSchema)

export default Code