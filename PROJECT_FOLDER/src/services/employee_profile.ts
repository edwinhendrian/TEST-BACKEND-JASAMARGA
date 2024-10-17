import {
  EmployeeProfileAttributes,
  EmployeeProfileCreationAttributes,
  EmployeeProfileIdRequest,
  EmployeeProfileUpdateRequest
} from '../db/models/employee_profile'
import { EmployeeProfile } from '../db/models'
import { ResponseError } from '../errors/response_error'
import { Validation } from '../validations/validation'
import { EmployeeProfileValidation } from '../validations/employee_profile_validation'
import { EmployeeService } from './employee'

export class EmployeeProfileService {
  static async getOne(request: EmployeeProfileIdRequest): Promise<EmployeeProfileAttributes> {
    const createRequest = Validation.validate(EmployeeProfileValidation.ID, request)
    const employeeProfile = await EmployeeProfile.findOne({ where: { employee_id: createRequest.id } })

    return employeeProfile!
  }

  static async create(request: EmployeeProfileCreationAttributes): Promise<EmployeeProfileAttributes> {
    let createRequest = Validation.validate(EmployeeProfileValidation.CREATE, request)

    await EmployeeService.checkEmployee(createRequest.employee_id)

    const totalEmployeeProfile = await EmployeeProfile.count({
      where: { employee_id: createRequest.employee_id }
    })

    if (totalEmployeeProfile != 0) throw new ResponseError(400, 'Employee Profile with the same NIK already exists')

    createRequest = { ...createRequest, created_by: 'admin', updated_by: 'admin' }
    const employeeProfile = await EmployeeProfile.create(createRequest)

    return employeeProfile
  }

  static async update(request: EmployeeProfileUpdateRequest): Promise<EmployeeProfileAttributes> {
    const createRequest = Validation.validate(EmployeeProfileValidation.CREATE, request)
    const { employee_id, ...data } = createRequest

    await EmployeeService.checkEmployee(employee_id)

    const totalEmployeeProfile = await EmployeeProfile.count({
      where: { employee_id }
    })

    if (totalEmployeeProfile == 0) throw new ResponseError(400, 'Employee Profile not exists')

    const employeeProfile = await EmployeeProfile.update(
      { ...data, created_by: 'admin', updated_by: 'admin' },
      {
        where: { employee_id },
        returning: true
      }
    )

    return employeeProfile[1][0]
  }

  static async deleteEmployeeProfile(employee_id: number): Promise<boolean> {
    await EmployeeProfile.destroy({ where: { employee_id } })

    return true
  }
}
