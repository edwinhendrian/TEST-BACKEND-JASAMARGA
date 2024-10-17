import { DataTypes, Model } from 'sequelize'
import connection from '..'

interface EducationAttributes {
  id: number
  employee_id: number
  name: string
  level: string
  description: string
  created_by: string
  updated_by: string
}

interface EducationCreationAttributes {
  employee_id: number
  name: string
  level: string
  description: string
  created_by: string
  updated_by: string
}

class Education extends Model<EducationAttributes, EducationCreationAttributes> implements EducationAttributes {
  public id!: number
  public employee_id!: number
  public name!: string
  public level!: string
  public description!: string
  public created_by!: string
  public updated_by!: string

  public readonly created_at!: Date
  public readonly updated_at!: Date
}

Education.init(
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
    level: {
      type: DataTypes.ENUM('TK', 'SD', 'SMP', 'SMA', 'Strata 1', 'Strata 2', 'Doktor', 'Profesor'),
      allowNull: true
    },
    description: {
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
    modelName: 'Education',
    tableName: 'education',
    timestamps: true,
    underscored: true
  }
)

type EducationUpdateRequest = {
  id: number
  employee_id: number
  name?: string
  level?: string
  description?: string
  created_by?: string
  updated_by?: string
}

type EducationRemoveRequest = {
  id: number
  employee_id: number
}

type EducationIdRequest = {
  id: number
}

export {
  Education,
  EducationAttributes,
  EducationCreationAttributes,
  EducationUpdateRequest,
  EducationRemoveRequest,
  EducationIdRequest
}
