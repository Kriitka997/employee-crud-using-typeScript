import emplServices from '../services/employee-service';
import messages from '../utils/constant';

const employeeController = {

    // create employee 
    createEmpl: async (req: any, res: any) => {
        const employeePayload = {
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email_id: req.body.email,
            profile: req.file.path,
            phone_number: req.body.number,
            emp_password: req.body.password
        };
        employeePayload["emp_password"] = req.hashPassword;
        const emplCreated = await emplServices.createAndUpdate(employeePayload);
        if (emplCreated) {
            res.send({
                message: messages.responses.succeeded,
                payload: emplCreated
            })
        }
        else {
            res.send({
                message: messages.error_messages.not_done,
            })
        }
    },

    // get all employee by pagination
    getAllEmployee: async (req: any, res: any) => {
        const Employee: any = await emplServices.findUserByID(req.employee.ID);
        if (Employee) {
            let { page, limit } = req.query
            const employeeList = await emplServices.getAllEmployees(page, limit);
            if (employeeList) {
                return res.send({
                    message: messages.responses.AllEmployeeList,
                    meta_data: employeeList
                })
            }
            else {
                return res.send({
                    error: messages.error_messages.not_done
                })
            }
        }
        else {
            return res.send({
                error: messages.error_messages.login
            });
        };
    },

    // get employee by specific id
    getEmployeeById: async (req: any, res: any) => {
        const Employee: any = await emplServices.findUserByID(req.employee.ID);
        if (Employee) {
            const findById: any = await emplServices.findUserByID(req.params.id);
            if (findById) {
                return res.send({
                    message: messages.responses.Employee,
                    meta_data: findById
                });
            }
            else {
                return res.send({
                    error: messages.error_messages.not_exist
                });
            };
        }
        else {
            return res.send({
                error: messages.error_messages.login
            });
        };
    },

    // update logged in user by specific id after authentication
    updateEmployee: async (req: any, res: any) => {
        const employeeUpdateData: any = await emplServices.findUserByID(req.employee.ID);
        if (employeeUpdateData["_id"] == req.params.id) {

            employeeUpdateData.first_name = req.body.firstName;
            employeeUpdateData.last_name = req.body.lastName;
            employeeUpdateData.email_id = req.body.email;
            employeeUpdateData.profile = req.file.path;
            employeeUpdateData.phone_number = req.body.number;
            const UpdateEmployee = await emplServices.createAndUpdate(employeeUpdateData)
            if (UpdateEmployee) {
                return res.send({
                    message: messages.responses.succeeded,
                    meta_data: UpdateEmployee
                })
            }
            else {
                return res.send({
                    error: messages.error_messages.not_done
                })
            }
        }
        else {
            return res.send({
                error: messages.error_messages.un_authorized
            })
        }
    },

    // delete spesicif employee by id with authentication
    deleteEmployee: async (req: any, res: any) => {
        const employeeAuth: any = await emplServices.findUserByID(req.employee.ID);
        if (employeeAuth["_id"] == req.params.id) {
            const deleteEmployee = await emplServices.deleteEmpById(req.params.id);
            if (deleteEmployee) {
                return res.send({
                    message: messages.responses.deleted
                });
            }
            else {
                return res.send({
                    error: messages.error_messages.not_done
                });
            };
        }
        else {
            return res.send({
                error: messages.error_messages.un_authorized
            });
        };
    }
};

export default employeeController;