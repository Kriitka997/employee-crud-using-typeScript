import empService from '../services/employee-service';
import messages from '../utils/constant';
import createToken from '../helper/createToken';

const loginEmployee = {
    // login end Point
    loginEmp: async (req: any, res: any) => {
        if (req.validatePass && req.validateEmployee) {

            const accessToken = await createToken.accessToken(req.validateEmployee._id);
            const refreshToken = await createToken.refreshToken(req.validateEmployee._id);

            if (accessToken && refreshToken) {
                const refreshTokData = {
                    employeeId: req.validateEmployee._id,
                    refreshToken: refreshToken
                }
                empService.saveToken(refreshTokData)
                return res.
                    cookie("token", accessToken)
                    .send({
                        message: messages.responses.succeeded,
                        token: accessToken,
                    });
            }
            else {
                return res.send({
                    error: messages.error_messages.no_token
                })
            }
        }
        else {
            res.send({
                message: messages.error_messages.not_exist,
            });
        };
    },
}

export default loginEmployee;