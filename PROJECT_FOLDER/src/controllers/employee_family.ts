import { Request, Response, NextFunction } from 'express'
import {
  EmployeeFamilyCreationAttributes,
  EmployeeFamilyIdRequest,
  EmployeeFamilyRemoveRequest,
  EmployeeFamilyUpdateRequest
} from '../db/models/employee_family'
import { EmployeeFamilyService } from '../services/employee_family'

export class EmployeeFamilyController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const request: EmployeeFamilyIdRequest = { id: Number(req.params.employee_id) }
      const response = await EmployeeFamilyService.getAll(request)
      res.status(200).json({
        data: response
      })
    } catch (e) {
      next(e)
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: EmployeeFamilyCreationAttributes = req.body as EmployeeFamilyCreationAttributes
      request.employee_id = Number(req.params.employee_id)
      const response = await EmployeeFamilyService.create(request)
      res.status(200).json({
        data: response
      })
    } catch (e) {
      next(e)
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const request: EmployeeFamilyUpdateRequest = req.body as EmployeeFamilyUpdateRequest
      request.employee_id = Number(req.params.employee_id)
      request.id = Number(req.params.family_id)
      const response = await EmployeeFamilyService.update(request)
      res.status(200).json({
        data: response
      })
    } catch (e) {
      next(e)
    }
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const request: EmployeeFamilyRemoveRequest = {
        employee_id: Number(req.params.employee_id),
        id: Number(req.params.family_id)
      }
      const response = await EmployeeFamilyService.remove(request)
      res.status(200).json({
        data: response
      })
    } catch (e) {
      next(e)
    }
  }
}
