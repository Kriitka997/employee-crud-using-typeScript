import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email_id: {
        type: String,
        required: true
    },
    profile: {
        type: String
    },
    phone_number: {
        type: String,
        required: true
    },
    emp_password: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    })

const employee = mongoose.model('employee-details', Schema);
export default employee;