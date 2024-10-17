import {
  EducationAttributes,
  EducationCreationAttributes,
  EducationIdRequest,
  EducationRemoveRequest,
  EducationUpdateRequest
} from '../db/models/education'
import { Education } from '../db/models'
import { ResponseError } from '../errors/response_error'
import { Validation } from '../validations/validation'
import { EducationValidation } from '../validations/education_validation'
import { EmployeeService } from './employee'

export class EducationService {
  static async getAll(request: EducationIdRequest): Promise<Array<EducationAttributes>> {
    const createRequest = Validation.validate(EducationValidation.ID, request)

    await EmployeeService.checkEmployee(createRequest.id)

    const educations = await Education.findAll({
      where: { employee_id: createRequest.id }
    })

    return educations
  }

  static async create(request: EducationCreationAttributes): Promise<EducationAttributes> {
    let createRequest = Validation.validate(EducationValidation.CREATE, request)

    await EmployeeService.checkEmployee(createRequest.employee_id)

    createRequest = { ...createRequest, created_by: 'admin', updated_by: 'admin' }
    const education = await Education.create(createRequest)

    return education
  }

  static async update(request: EducationUpdateRequest): Promise<EducationAttributes> {
    const createRequest = Validation.validate(EducationValidation.UPDATE, request)
    const { id, employee_id, ...data } = createRequest

    const totalEducation = await Education.count({
      where: { id, employee_id }
    })

    if (totalEducation == 0) throw new ResponseError(400, "Employee's Education not exists")

    const education = await Education.update(
      { ...data, created_by: 'admin', updated_by: 'admin' },
      {
        where: { id },
        returning: true
      }
    )

    return education[1][0]
  }

  static async remove(request: EducationRemoveRequest): Promise<string> {
    const createRequest = Validation.validate(EducationValidation.REMOVE, request)

    const totalEducation = await Education.count({
      where: { id: createRequest.id, employee_id: createRequest.employee_id }
    })

    if (totalEducation == 0) throw new ResponseError(400, "Employee's Education not exists")

    await Education.destroy({ where: { id: createRequest.id } })

    return 'OK'
  }

  static async deleteEducation(employee_id: number): Promise<boolean> {
    await Education.destroy({ where: { employee_id } })

    return true
  }
}
