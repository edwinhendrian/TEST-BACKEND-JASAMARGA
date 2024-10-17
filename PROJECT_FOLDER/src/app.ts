import 'dotenv/config'
import express, { Application } from 'express'
import http from 'http'
import database from './db'
import { apiRouter } from './routes/api'
import { logger } from './apps/logging'
import { errorMiddleware } from './middlewares/error_middlewares'

export default class App {
  public express!: Application

  public httpServer!: http.Server

  public async init(): Promise<void> {
    this.express = express()
    this.httpServer = http.createServer(this.express)

    // Assert database connection
    await this.assertDatabaseConnection()

    // add all global middleware
    this.middleware()

    // register the all routes
    this.routes()

    // add the middleware to handle error
    this.express.use(errorMiddleware)
  }

  // Routes
  private routes(): void {
    this.express.use('/api', apiRouter)
  }

  // Middlewares
  private middleware(): void {
    this.express.use(express.json({ limit: '100mb' }))
    this.express.use(express.urlencoded({ limit: '100mb', extended: true }))
  }

  private async assertDatabaseConnection(): Promise<void> {
    try {
      await database.authenticate()
      await database.sync()
      logger.info('Connection has been established successfully.')
    } catch (error) {
      logger.error('Unable to connect to the database:', error)
    }
  }
}
