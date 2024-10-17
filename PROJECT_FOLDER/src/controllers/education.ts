import { Request, Response, NextFunction } from 'express'
import {
  EducationCreationAttributes,
  EducationIdRequest,
  EducationRemoveRequest,
  EducationUpdateRequest
} from '../db/models/education'
import { EducationService } from '../services/education'

export class EducationController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const request: EducationIdRequest = { id: Number(req.params.employee_id) }
      const response = await EducationService.getAll(request)
      res.status(200).json({
        data: response
      })
    } catch (e) {
      next(e)
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: EducationCreationAttributes = req.body as EducationCreationAttributes
      request.employee_id = Number(req.params.employee_id)
      const response = await EducationService.create(request)
      res.status(200).json({
        data: response
      })
    } catch (e) {
      next(e)
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const request: EducationUpdateRequest = req.body as EducationUpdateRequest
      request.employee_id = Number(req.params.employee_id)
      request.id = Number(req.params.family_id)
      const response = await EducationService.update(request)
      res.status(200).json({
        data: response
      })
    } catch (e) {
      next(e)
    }
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const request: EducationRemoveRequest = {
        employee_id: Number(req.params.employee_id),
        id: Number(req.params.education_id)
      }
      const response = await EducationService.remove(request)
      res.status(200).json({
        data: response
      })
    } catch (e) {
      next(e)
    }
  }
}
