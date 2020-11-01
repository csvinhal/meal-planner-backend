import { addDays, endOfWeek, parseJSON, startOfWeek } from 'date-fns'
import { listMeals } from './meal.controller'
import { Schedule } from '../models/schedule.model'

const getSchedule = async (date: string): Promise<any> => {
  const parsedDate = parseJSON(date)
  const startOfWeekDate = startOfWeek(parsedDate)
  const endOfWeekDate = endOfWeek(parsedDate)
  let currentDay = startOfWeekDate

  const schedule: Schedule = {
    [currentDay.toISOString()]: getEmptyDayMeals(),
  }

  for (let i = 0; i < 6; i++) {
    const nextDay = addDays(currentDay, 1)
    schedule[nextDay.toISOString()] = getEmptyDayMeals()
    currentDay = nextDay
  }

  const meals = await listMeals(startOfWeekDate, endOfWeekDate)

  meals.forEach((meal) => {
    schedule[meal.date.toISOString()] = {
      ...schedule[meal.date.toISOString()],
      [meal.mealType]: meal,
    }
  })

  return schedule
}

const getEmptyDayMeals = () => ({
  0: null,
  1: null,
  2: null,
  3: null,
  4: null,
  5: null,
})

export { getSchedule }
