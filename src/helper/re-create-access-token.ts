import jwt from "jsonwebtoken";
import isTokenExit from "../services/employee-service";
import createToken from "./createToken";

// create access token after expire of it.
const reAccessToken = async (req: any, res: any) => {
    const tokenResponse = await isTokenExit.getRefreshToken(req.params.id);
    if (tokenResponse) {
        jwt.verify(tokenResponse.refreshToken, 'refreshToken', (err: any, employee: any) => {
            if (err) {
                res.send({
                    error: err
                });
            }
            else {
                const accessToken = createToken.accessToken(employee.ID);
                res.status(200).cookie('token', accessToken)
                    .send({
                        message: "re genrated access token",
                        token: accessToken
                    });
            };
        });
    };
};

export default reAccessToken;