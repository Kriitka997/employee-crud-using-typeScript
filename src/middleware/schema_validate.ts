import EmpSchema from '../model/employee-schema';
import messages from '../utils/constant';

const employeeSchema = (req: any, res: any, next: any) => {
    if (req.body.email) {
        if (/[^\s@]+@[^\s@]+\.[^\s@]+/.test(req.body.email)) {
            EmpSchema.findOne({ email_id: req.body.email }).exec((err, empEmail) => {
                if (empEmail) {
                    return res.send({ errorMessage: messages.error_messages.al_exist, error: err })
                }
                if (req.body.number) {
                    if (/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(req.body.number)) {
                        next()
                    }
                    else {
                        return res.send({
                            errorMessage: messages.error_messages.numberNotValid
                        });
                    };
                }
                else {
                    return res.send({
                        errorMessage: messages.error_messages.required
                    });
                };
            });
        }
        else {
            return res.send({
                errorMessage: messages.error_messages.emailRequired
            });
        };
    }
    else {
        return res.send({
            errorMessage: messages.error_messages.required
        });
    };
};

export default employeeSchema;