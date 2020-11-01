import express, { NextFunction, Request, Response } from 'express'
import { createMeal, listMeals } from '../../controllers'

const router = express.Router()

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { startDate, endDate } = req.query
    const schedules = await listMeals(startDate as string, endDate as string)
    res.status(200).json(schedules)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { date, mealType, recipe } = req.body
    const schedule = await createMeal({ date, mealType, recipe })
    res.status(200).json(schedule)
  } catch (error) {
    next(error)
  }
})

export default router
