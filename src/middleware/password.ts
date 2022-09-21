import bcrypt from 'bcrypt';
import messages from '../utils/constant';
import empService from '../services/employee-service';
const salt = 10;

const password = {
    hashPassword: async (req: any, res: any, next: any) => {
        if (req.body.password) {
            if (req.body.confirm_password) {
                if (req.body.password.match(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,12})"))) {
                    if (req.body.password === req.body.confirm_password) {
                        const hashPass = await bcrypt.hash(req.body.password, salt);
                        req.hashPassword = hashPass;
                        next()
                    }
                    else {
                        return res.send({
                            error: messages.error_messages.comparePass
                        });
                    };
                }
                else {
                    return res.send({
                        error: messages.error_messages.validPassword
                    });
                }
            }
            else {
                return res.send({
                    errorMessage: messages.error_messages.confirmPass
                });
            }
        }
        else {
            return res.send({
                errorMessage: messages.error_messages.required
            });
        }
    },

    empExitAndPassValid: async (req: any, res: any, next: any) => {
        const employeeData: any = await empService.findUserByEmail(req.body.email);
        if (employeeData) {
            const valid = await bcrypt.compare(req.body.password, employeeData["emp_password"]);
            if (valid === true) {
                req.validatePass = valid;
                req.validateEmployee = employeeData
                next()
            }
            else {
                res.send({
                    message: messages.error_messages.wrong_pass
                })
            }
        }
        else {
            return res.send({
                error: messages.error_messages.not_exist
            })
        }
    }
};

export default password;