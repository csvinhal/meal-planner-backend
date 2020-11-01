import express, { NextFunction, Request, Response } from 'express'
import { getSchedule } from '../../controllers'

const router = express.Router()

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { date } = req.query
    const schedules = await getSchedule(date as string)
    res.status(200).json(schedules)
  } catch (error) {
    next(error)
  }
})

export default router
