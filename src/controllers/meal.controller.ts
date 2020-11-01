import { parseJSON, startOfDay, endOfDay } from 'date-fns'
import { CreateQuery } from 'mongoose'
import { IMealDocument, Meal } from '../models'

const listMeals = async (
  startDate: string | Date,
  endDate: string | Date,
): Promise<IMealDocument[]> => {
  const startOfWeekDate = startOfDay(parseJSON(startDate))
  const endOfWeekDate = endOfDay(parseJSON(endDate))
  return await Meal.find({
    date: { $gte: startOfWeekDate, $lte: endOfWeekDate },
  })
}

const createMeal = async ({
  date,
  mealType,
  recipe,
}: CreateQuery<IMealDocument>): Promise<IMealDocument> => {
  try {
    const newMeal = new Meal({
      date: startOfDay(parseJSON(date)),
      mealType,
      recipe,
    })

    const created = await Meal.create(newMeal)
    return created
  } catch (error) {
    throw Error(error)
  }
}

export { createMeal, listMeals }
