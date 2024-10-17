import {
  EmployeeAttributes,
  EmployeeCreationAttributes,
  EmployeeIdRequest,
  EmployeeUpdateRequest
} from '../db/models/employee'
import { Education, Employee, EmployeeFamily, EmployeeProfile } from '../db/models'
import { ResponseError } from '../errors/response_error'
import { Validation } from '../validations/validation'
import { EmployeeValidation } from '../validations/employee_validation'
import { EmployeeProfileService } from './employee_profile'
import { EmployeeFamilyService } from './employee_family'
import { EducationService } from './education'

export class EmployeeService {
  static async getAll(): Promise<Array<EmployeeAttributes>> {
    const employees = await Employee.findAll({
      include: [
        {
          model: EmployeeProfile
        },
        {
          model: EmployeeFamily
        },
        {
          model: Education
        }
      ]
    })

    return employees
  }

  static async getOne(request: EmployeeIdRequest): Promise<EmployeeAttributes> {
    const createRequest = Validation.validate(EmployeeValidation.ID, request)
    const employee = await Employee.findOne({
      where: { id: createRequest.id },
      include: [
        {
          model: EmployeeProfile
        },
        {
          model: EmployeeFamily
        },
        {
          model: Education
        }
      ]
    })

    return employee!
  }

  static async create(request: EmployeeCreationAttributes): Promise<EmployeeAttributes> {
    let createRequest = Validation.validate(EmployeeValidation.CREATE, request)
    const totalEmployee = await Employee.count({ where: { nik: createRequest.nik } })

    if (totalEmployee != 0) throw new ResponseError(400, 'Employee with the same NIK already exists')

    createRequest = { ...createRequest, created_by: 'admin', updated_by: 'admin' }
    const employee = await Employee.create(createRequest)

    return employee
  }

  static async checkEmployee(employee_id: number): Promise<boolean> {
    const totalEmployee = await Employee.count({ where: { id: employee_id } })

    if (totalEmployee == 0) throw new ResponseError(400, 'Employee not exists')

    return true
  }

  static async update(request: EmployeeUpdateRequest): Promise<EmployeeAttributes> {
    const createRequest = Validation.validate(EmployeeValidation.UPDATE, request)
    const { id, ...data } = createRequest

    await this.checkEmployee(id)

    const employee = await Employee.update(
      { ...data, created_by: 'admin', updated_by: 'admin' },
      {
        where: { id },
        returning: true
      }
    )

    return employee[1][0]
  }

  static async remove(request: EmployeeIdRequest): Promise<string> {
    const createRequest = Validation.validate(EmployeeValidation.ID, request)

    await this.checkEmployee(createRequest.id)

    // Note: delete association table data
    await EmployeeProfileService.deleteEmployeeProfile(createRequest.id)
    await EmployeeFamilyService.deleteEmployeeFamily(createRequest.id)
    await EducationService.deleteEducation(createRequest.id)
    await Employee.destroy({ where: { id: createRequest.id } })

    return 'OK'
  }

  static async getReport(): Promise<any> {
    const [employees, metadata]: any = await Employee.sequelize
      ?.query(`select e.id employee_id, e.nik, e."name", e.is_active, ep.gender, 
        concat(date_part('year', age(current_date, ep.date_of_birth)), ' years old') age,
        ed."name" as school_name, ed."level", case when ef.family_data isnull then '-' else ef.family_data end 
        from employee e left join employee_profile ep on e.id = ep.employee_id 
        left join education ed on e.id = ed.employee_id 
        left join (select employee_id, string_agg(relation_count || ' ' || relation_status, ' & ' order by relation_status) family_data
        from (select employee_id, relation_status, count(*) relation_count 
        from employee_family group by relation_status, employee_id) 
        group by employee_id) ef on e.id = ef.employee_id`)

    return employees
  }
}
