import jwt from 'jsonwebtoken';

const authenticateUser = (req: any, res: any, next: any) => {
    const authToken = req.headers.authorization;
    if (authToken) {

        let sliceToken = authToken.slice(13, authToken.length - 9);
        jwt.verify(sliceToken, 'accessToken', (err:any, employee:any) => {
            if (err) {
                res.send({
                    status: 404,
                    error: err
                })
            }
            else {
                req.employee = employee;
                next()
            }
        });
    };
};

export default authenticateUser;