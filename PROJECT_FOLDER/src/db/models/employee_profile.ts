import { DataTypes, Model } from 'sequelize'
import connection from '..'

interface EmployeeProfileAttributes {
  id: number
  employee_id: number
  place_of_birth: string
  date_of_birth: Date
  gender: string
  is_married: boolean
  prof_pict: string
  created_by: string
  updated_by: string
}

interface EmployeeProfileCreationAttributes {
  employee_id: number
  place_of_birth: string
  date_of_birth: Date
  gender: string
  is_married: boolean
  prof_pict: string
  created_by: string
  updated_by: string
}

class EmployeeProfile
  extends Model<EmployeeProfileAttributes, EmployeeProfileCreationAttributes>
  implements EmployeeProfileAttributes
{
  public id!: number
  public employee_id!: number
  public place_of_birth!: string
  public date_of_birth!: Date
  public gender!: string
  public is_married!: boolean
  public prof_pict!: string
  public created_by!: string
  public updated_by!: string

  public readonly created_at!: Date
  public readonly updated_at!: Date
}

EmployeeProfile.init(
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
    place_of_birth: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    gender: {
      type: DataTypes.ENUM('Laki-Laki', 'Perempuan'),
      allowNull: true
    },
    is_married: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    prof_pict: {
      type: DataTypes.STRING(255),
      allowNull: true
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
    modelName: 'Employee_Profile',
    tableName: 'employee_profile',
    timestamps: true,
    underscored: true
  }
)

type EmployeeProfileUpdateRequest = {
  employee_id: number
  place_of_birth?: string
  date_of_birth?: Date
  gender?: string
  is_married?: boolean
  prof_pict?: string
  created_by?: string
  updated_by?: string
}

type EmployeeProfileIdRequest = {
  id: number
}

export {
  EmployeeProfile,
  EmployeeProfileAttributes,
  EmployeeProfileCreationAttributes,
  EmployeeProfileUpdateRequest,
  EmployeeProfileIdRequest
}
