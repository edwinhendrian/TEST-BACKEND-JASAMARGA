import { Request, Response, NextFunction } from 'express'
import { EmployeeCreationAttributes, EmployeeIdRequest, EmployeeUpdateRequest } from '../db/models/employee'
import { EmployeeService } from '../services/employee'

export class EmployeeController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await EmployeeService.getAll()
      res.status(200).json({
        data: response
      })
    } catch (e) {
      next(e)
    }
  }

  static async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const request: EmployeeIdRequest = { id: Number(req.params.employee_id) }
      const response = await EmployeeService.getOne(request)
      res.status(200).json({
        data: response
      })
    } catch (e) {
      next(e)
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: EmployeeCreationAttributes = req.body as EmployeeCreationAttributes
      const response = await EmployeeService.create(request)
      res.status(200).json({
        data: response
      })
    } catch (e) {
      next(e)
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const request: EmployeeUpdateRequest = req.body as EmployeeUpdateRequest
      request.id = Number(req.params.employee_id)
      const response = await EmployeeService.update(request)
      res.status(200).json({
        data: response
      })
    } catch (e) {
      next(e)
    }
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const request: EmployeeIdRequest = { id: Number(req.params.employee_id) }
      const response = await EmployeeService.remove(request)
      res.status(200).json({
        data: response
      })
    } catch (e) {
      next(e)
    }
  }

  static async getReport(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await EmployeeService.getReport()
      res.status(200).json({
        data: response
      })
    } catch (e) {
      next(e)
    }
  }
}
