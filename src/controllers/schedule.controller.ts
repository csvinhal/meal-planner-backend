import { addDays, endOfWeek, parseJSON, startOfWeek } from 'date-fns'
import { MealType } from '../models'
import { Schedule, ScheduleDaysOfWeek } from '../models/schedule.model'
import { listMeals } from './meal.controller'

const getSchedule = async (date: string): Promise<any> => {
  const parsedDate = parseJSON(date)
  const startOfWeekDate = startOfWeek(parsedDate)
  const endOfWeekDate = endOfWeek(parsedDate)

  const scheduleDaysOfWeek = getScheduleDaysOfWeek(startOfWeekDate)

  const schedule: Schedule = {
    [MealType.BREAKFAST]: scheduleDaysOfWeek,
    [MealType.SNACK]: scheduleDaysOfWeek,
    [MealType.LUNCH]: scheduleDaysOfWeek,
    [MealType.AFTERNOON_SNACK]: scheduleDaysOfWeek,
    [MealType.DINNER]: scheduleDaysOfWeek,
    [MealType.SUPPER]: scheduleDaysOfWeek,
  }

  const meals = await listMeals(startOfWeekDate, endOfWeekDate)

  meals.forEach((meal) => {
    schedule[meal.mealType] = {
      ...schedule[meal.mealType],
      [meal.date.toISOString()]: meal,
    }
  })

  return schedule
}

const getScheduleDaysOfWeek = (startOfWeekDate: Date): ScheduleDaysOfWeek => {
  const weekList: ScheduleDaysOfWeek = { [startOfWeekDate.toISOString()]: null }

  let currentDay = startOfWeekDate

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 6; i++) {
    const nextDay = addDays(currentDay, 1)
    currentDay = nextDay
    weekList[nextDay.toISOString()] = null
  }
  return weekList
}

export { getSchedule }
