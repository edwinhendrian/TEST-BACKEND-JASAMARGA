import { DataTypes, Model } from 'sequelize'
import connection from '..'

interface EmployeeAttributes {
  id: number
  nik: string
  name: string
  is_active: boolean
  start_date: Date
  end_date: Date
  created_by: string
  updated_by: string
}

interface EmployeeCreationAttributes {
  nik: string
  name: string
  is_active: boolean
  start_date: Date
  end_date: Date
  created_by: string
  updated_by: string
}

class Employee extends Model<EmployeeAttributes, EmployeeCreationAttributes> implements EmployeeAttributes {
  public id!: number
  public nik!: string
  public name!: string
  public is_active!: boolean
  public start_date!: Date
  public end_date!: Date
  public created_by!: string
  public updated_by!: string

  public readonly created_at!: Date
  public readonly updated_at!: Date
}

Employee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nik: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATE,
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
    modelName: 'Employee',
    tableName: 'employee',
    timestamps: true,
    underscored: true
  }
)

type EmployeeUpdateRequest = {
  id: number
  nik?: string
  name?: string
  is_active?: boolean
  start_date?: Date
  end_date?: Date
  created_by?: string
  updated_by?: string
}

type EmployeeIdRequest = {
  id: number
}

export { Employee, EmployeeAttributes, EmployeeCreationAttributes, EmployeeUpdateRequest, EmployeeIdRequest }
