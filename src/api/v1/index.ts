import express, { NextFunction, Request, Response } from 'express'
import meals from './meal.routes'
import recipes from './recipe.routes'
import schedules from './schedule.routes'

const router = express.Router()

router.use('/v1/recipes', recipes)
router.use('/v1/meals', meals)
router.use('/v1/schedule', schedules)

router.use(function (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function (errors: any, key: any) {
        errors[key] = err.errors[key].message

        return errors
      }, {}),
    })
  }

  return next(err)
})

export default router
