const jwt = require("jsonwebtoken");

// creating employee JWT token.
const token =
{
    accessToken: (employeeId:any) => {

        let accessToken = jwt.sign({ ID: employeeId }, "accessToken", {
            expiresIn: "1h"
        });
        return accessToken;
    },

    refreshToken: (employeeId:any) => {
        let refreshToken = jwt.sign({ ID: employeeId }, "refreshToken", {
            expiresIn: "365d"
        });
        return refreshToken
    }
}

export default token;