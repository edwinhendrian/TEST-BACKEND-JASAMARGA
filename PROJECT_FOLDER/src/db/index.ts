import { Sequelize } from 'sequelize'

import 'dotenv/config'

const username = (process.env.DB_USER as string) || 'postgres'
const password = process.env.DB_PASSWORD
const database = process.env.DB_NAME as string
const host = process.env.DB_HOST
const dialect = 'postgres'

const sequelizeConnection = new Sequelize(database, username, password, {
  host,
  dialect
})

export default sequelizeConnection
