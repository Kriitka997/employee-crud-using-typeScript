import mongoose from "mongoose";

const Token = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'employee-details'
    },
    refreshToken: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    })

const refreshToken = mongoose.model('refresh-token', Token);
export default refreshToken;