import express from 'express';
import schemaValidate from '../middleware/schema_validate';
import passwordValid from '../middleware/password';
import employeeController from '../controller/empl-create';
import multerFile from '../middleware/multerFile';
import loginCont from '../controller/emp-login';
import authFile from '../middleware/authenticateUser';
import accessTokenCreate from '../helper/re-create-access-token';
let route = express.Router();

// create employee path
route.post('/create-employee', multerFile.single('images'),
    schemaValidate, passwordValid.hashPassword, employeeController.createEmpl);

// login route
route.post('/login', passwordValid.empExitAndPassValid, loginCont.loginEmp);

//get all employees data
route.get('/get-all-employees', authFile, employeeController.getAllEmployee);

//employee get by specific id
route.get('/employee-by-id/:id', authFile, employeeController.getEmployeeById);

// employee edit by id after authentication
route.put('/edit-employee/:id', authFile, multerFile.single('images'), schemaValidate, employeeController.updateEmployee);

// delete employee by specific id and with authentication
route.delete('/delete-by-id/:id', authFile, employeeController.deleteEmployee);

//create access token after expire of it using refresh token
route.post('/create-token/:id', accessTokenCreate)

export default route;