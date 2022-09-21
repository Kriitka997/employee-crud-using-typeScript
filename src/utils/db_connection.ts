import mongoose from "mongoose";

const uri = 'mongodb+srv://kritika:kritika@cluster0.ysgo71k.mongodb.net/EmployeeUsedTypeScript?retryWrites=true&w=majority'

const connect = mongoose.connect(uri)
    .then(() => {
        console.log("connected...")
    })
    .catch(err => {
        console.log(err.message)
    })

export default connect;