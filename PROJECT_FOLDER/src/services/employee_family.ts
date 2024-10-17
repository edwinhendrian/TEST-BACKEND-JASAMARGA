import {
  EmployeeFamilyAttributes,
  EmployeeFamilyCreationAttributes,
  EmployeeFamilyIdRequest,
  EmployeeFamilyRemoveRequest,
  EmployeeFamilyUpdateRequest
} from '../db/models/employee_family'
import { EmployeeFamily } from '../db/models'
import { ResponseError } from '../errors/response_error'
import { Validation } from '../validations/validation'
import { EmployeeFamilyValidation } from '../validations/employee_family_validation'
import { EmployeeService } from './employee'

export class EmployeeFamilyService {
  static async getAll(request: EmployeeFamilyIdRequest): Promise<Array<EmployeeFamilyAttributes>> {
    const createRequest = Validation.validate(EmployeeFamilyValidation.ID, request)

    await EmployeeService.checkEmployee(createRequest.id)

    const employeeFamily = await EmployeeFamily.findAll({
      where: { employee_id: createRequest.id }
    })

    return employeeFamily
  }

  static async create(request: EmployeeFamilyCreationAttributes): Promise<EmployeeFamilyAttributes> {
    let createRequest = Validation.validate(EmployeeFamilyValidation.CREATE, request)

    await EmployeeService.checkEmployee(createRequest.employee_id)

    const totalEmployeeFamily = await EmployeeFamily.count({
      where: { identifier: createRequest.identifier }
    })

    if (totalEmployeeFamily != 0)
      throw new ResponseError(400, "Employee's Family with the same identifier already exists")

    createRequest = { ...createRequest, created_by: 'admin', updated_by: 'admin' }
    const employeeFamily = await EmployeeFamily.create(createRequest)

    return employeeFamily
  }

  static async update(request: EmployeeFamilyUpdateRequest): Promise<EmployeeFamilyAttributes> {
    const createRequest = Validation.validate(EmployeeFamilyValidation.UPDATE, request)
    const { id, employee_id, ...data } = createRequest

    const totalEmployeeFamily = await EmployeeFamily.count({
      where: { id, employee_id }
    })

    if (totalEmployeeFamily == 0) throw new ResponseError(400, "Employee's Family not exists")

    if (data.identifier) {
      const totalEmployeeFamily = await EmployeeFamily.count({
        where: { identifier: data.identifier }
      })

      if (totalEmployeeFamily != 0)
        throw new ResponseError(400, "Employee's Family with the same identifier already exists")
    }

    const employeeFamily = await EmployeeFamily.update(
      { ...data, created_by: 'admin', updated_by: 'admin' },
      {
        where: { id },
        returning: true
      }
    )

    return employeeFamily[1][0]
  }

  static async remove(request: EmployeeFamilyRemoveRequest): Promise<string> {
    const createRequest = Validation.validate(EmployeeFamilyValidation.REMOVE, request)

    const totalEmployeeFamily = await EmployeeFamily.count({
      where: { id: createRequest.id, employee_id: createRequest.employee_id }
    })

    if (totalEmployeeFamily == 0) throw new ResponseError(400, "Employee's Family not exists")

    await EmployeeFamily.destroy({ where: { id: createRequest.id } })

    return 'OK'
  }

  static async deleteEmployeeFamily(employee_id: number): Promise<boolean> {
    await EmployeeFamily.destroy({ where: { employee_id } })

    return true
  }
}
