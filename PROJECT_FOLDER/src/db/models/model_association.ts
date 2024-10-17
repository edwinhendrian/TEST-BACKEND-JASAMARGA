import { Education } from './education'
import { Employee } from './employee'
import { EmployeeFamily } from './employee_family'
import { EmployeeProfile } from './employee_profile'

Employee.hasOne(EmployeeProfile, { sourceKey: 'id' })
Employee.hasMany(EmployeeFamily, {
  sourceKey: 'id',
  foreignKey: 'employee_id'
})
Employee.hasMany(Education, {
  sourceKey: 'id',
  foreignKey: 'employee_id'
})

EmployeeProfile.belongsTo(Employee, { targetKey: 'id' })

EmployeeFamily.belongsTo(Employee, { targetKey: 'id' })

Education.belongsTo(Employee, { targetKey: 'id' })
