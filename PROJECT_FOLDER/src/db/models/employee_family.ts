import { DataTypes, Model } from 'sequelize'
import connection from '..'

interface EmployeeFamilyAttributes {
  id: number
  employee_id: number
  name: string
  identifier: string
  job: string
  place_of_birth: string
  date_of_birth: Date
  religion: string
  is_life: boolean
  is_divorced: boolean
  relation_status: string
  created_by: string
  updated_by: string
}

interface EmployeeFamilyCreationAttributes {
  employee_id: number
  name: string
  identifier: string
  job: string
  place_of_birth: string
  date_of_birth: Date
  religion: string
  is_life: boolean
  is_divorced: boolean
  relation_status: string
  created_by: string
  updated_by: string
}

class EmployeeFamily
  extends Model<EmployeeFamilyAttributes, EmployeeFamilyCreationAttributes>
  implements EmployeeFamilyAttributes
{
  public id!: number
  public employee_id!: number
  public name!: string
  public identifier!: string
  public job!: string
  public place_of_birth!: string
  public date_of_birth!: Date
  public religion!: string
  public is_life!: boolean
  public is_divorced!: boolean
  public relation_status!: string
  public created_by!: string
  public updated_by!: string

  public readonly created_at!: Date
  public readonly updated_at!: Date
}

EmployeeFamily.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    identifier: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    job: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    place_of_birth: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    religion: {
      type: DataTypes.ENUM('Islam', 'Katolik', 'Budha', 'Protestan', 'Hindu', 'Konghucu'),
      allowNull: false
    },
    is_life: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    is_divorced: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    relation_status: {
      type: DataTypes.ENUM('Suami', 'Istri', 'Anak', 'Anak Sambung'),
      allowNull: false
    },
    created_by: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    updated_by: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  },
  {
    sequelize: connection,
    modelName: 'Employee_Family',
    tableName: 'employee_family',
    timestamps: true,
    underscored: true
  }
)

type EmployeeFamilyUpdateRequest = {
  id: number
  employee_id: number
  name?: string
  identifier?: string
  job?: string
  place_of_birth?: string
  date_of_birth?: Date
  religion?: string
  is_life?: boolean
  is_divorced?: boolean
  relation_status?: string
  created_by?: string
  updated_by?: string
}

type EmployeeFamilyRemoveRequest = {
  id: number
  employee_id: number
}

type EmployeeFamilyIdRequest = {
  id: number
}

export {
  EmployeeFamily,
  EmployeeFamilyAttributes,
  EmployeeFamilyCreationAttributes,
  EmployeeFamilyUpdateRequest,
  EmployeeFamilyRemoveRequest,
  EmployeeFamilyIdRequest
}
