import { Request, Response, NextFunction } from 'express'
import {
  EmployeeProfileCreationAttributes,
  EmployeeProfileIdRequest,
  EmployeeProfileUpdateRequest
} from '../db/models/employee_profile'
import { EmployeeProfileService } from '../services/employee_profile'

export class EmployeeProfileController {
  static async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const request: EmployeeProfileIdRequest = { id: Number(req.params.employee_id) }
      const response = await EmployeeProfileService.getOne(request)
      res.status(200).json({
        data: response
      })
    } catch (e) {
      next(e)
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: EmployeeProfileCreationAttributes = req.body as EmployeeProfileCreationAttributes
      request.employee_id = Number(req.params.employee_id)
      const response = await EmployeeProfileService.create(request)
      res.status(200).json({
        data: response
      })
    } catch (e) {
      next(e)
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const request: EmployeeProfileUpdateRequest = req.body as EmployeeProfileUpdateRequest
      request.employee_id = Number(req.params.employee_id)
      const response = await EmployeeProfileService.update(request)
      res.status(200).json({
        data: response
      })
    } catch (e) {
      next(e)
    }
  }
}
