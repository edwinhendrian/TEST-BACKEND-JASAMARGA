import { Router } from 'express'
import { EmployeeController } from '../controllers/employee'
import { EmployeeProfileController } from '../controllers/employee_profile'
import { EmployeeFamilyController } from '../controllers/employee_family'
import { EducationController } from '../controllers/education'

export const apiRouter = Router()

// Report Employee Route
apiRouter.get('/employee/report', EmployeeController.getReport)

// Employee Routes
apiRouter.get('/employee', EmployeeController.getAll)
apiRouter.get('/employee/:employee_id', EmployeeController.getOne)
apiRouter.post('/employee', EmployeeController.create)
apiRouter.patch('/employee/:employee_id', EmployeeController.update)
apiRouter.delete('/employee/:employee_id', EmployeeController.remove)

// Employee Profile Routes
apiRouter.get('/employee/:employee_id/profile', EmployeeProfileController.getOne)
apiRouter.post('/employee/:employee_id/profile', EmployeeProfileController.create)
apiRouter.patch('/employee/:employee_id/profile', EmployeeProfileController.update)

// Employee Family Routes
apiRouter.get('/employee/:employee_id/family', EmployeeFamilyController.getAll)
apiRouter.post('/employee/:employee_id/family', EmployeeFamilyController.create)
apiRouter.patch('/employee/:employee_id/family/:family_id', EmployeeFamilyController.update)
apiRouter.delete('/employee/:employee_id/family/:family_id', EmployeeFamilyController.remove)

// Employee Education Routes
apiRouter.get('/employee/:employee_id/education', EducationController.getAll)
apiRouter.post('/employee/:employee_id/education', EducationController.create)
apiRouter.patch('/employee/:employee_id/education/:education_id', EducationController.update)
apiRouter.delete('/employee/:employee_id/education/:education_id', EducationController.remove)
