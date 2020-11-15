import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import routesV1 from './api/v1'
import './db'

const app: Application = express()
app.use(helmet())
app.use(morgan('common'))
app.use(cors())
app.use(express.json())

app.use(routesV1)

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error.status) {
    res.status(error.status)
  } else {
    res.status(500)
  }
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
  })
})

export default app
