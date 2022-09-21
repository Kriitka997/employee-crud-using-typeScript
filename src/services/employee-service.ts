import empSchema from '../model/employee-schema';
import messages from '../utils/constant';
import refreshTokenSchema from '../model/refreshToken';


const employee = {

    // db service for create and update employee
    createAndUpdate: (employeeData: any) => {
        try {
            return empSchema.create(employeeData);
        }
        catch (err) {
            console.log({
                message: messages.error_messages.db_err,
                error: err
            })
        }
    },

    //db service for find employee by email
    findUserByEmail: (employee: any) => {
        try {
            return empSchema.findOne({ email_id: employee });
        }
        catch (err) {
            console.log({
                message: messages.error_messages.db_err,
                error: err
            })
        }
    },

    //save refresh token in db
    saveToken: (token: any) => {
        try {
            return refreshTokenSchema.create(token);
        }
        catch (err) {
            console.log({
                message: messages.error_messages.db_err,
                error: err
            })
        }
    },

    //db service for find employee by id
    findUserByID: (employeeID: any) => {
        try {
            return empSchema.findOne({ _id: employeeID });
        }
        catch (err) {
            console.log({
                message: messages.error_messages.db_err,
                error: err
            })
        }
    },

    //db service for find all employees
    getAllEmployees: (page: any, limit: any) => {
        try {
            return empSchema.find().skip((page - 1) * limit).limit(limit * 1)
                .exec();
        }
        catch (err) {
            console.log({
                errorMessage: messages.error_messages.db_err,
                error: err
            })
        }
    },

    // delete query
    deleteEmpById: (deleteDataId: any) => {
        try {
            return empSchema.findByIdAndRemove({ _id: deleteDataId })
        }
        catch (err) {
            console.log({
                message: messages.error_messages.db_err,
                error: err
            })
        }
    },

    // create access token query using refresh query
    getRefreshToken: (empId: any) => {
        try {
            return refreshTokenSchema.findOne({ EmployeeID: empId })
        }
        catch (err) {
            console.log({
                message: messages.error_messages.db_err,
                error: err
            })
        }
    }
}

export default employee;