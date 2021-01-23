import { endOfDay, parseJSON, startOfDay } from 'date-fns'
import { IMealDocument, IMealInputDTO, Meal } from '../models'

const listMeals = async (
  startDate: string | Date,
  endDate: string | Date,
): Promise<IMealDocument[]> => {
  const startOfWeekDate = startOfDay(parseJSON(startDate))
  const endOfWeekDate = endOfDay(parseJSON(endDate))
  return await Meal.find({
    date: { $gte: startOfWeekDate, $lte: endOfWeekDate },
  })
    .populate({ path: 'recipe' })
    .exec()
}

const createMeal = async ({
  date,
  mealType,
  recipeId,
}: IMealInputDTO): Promise<IMealDocument> => {
  try {
    const newMeal = new Meal({
      date: startOfDay(parseJSON(date)),
      mealType,
      recipe: recipeId,
    })

    const created = await Meal.create(newMeal)
    return created
  } catch (error) {
    throw Error(error)
  }
}

export { createMeal, listMeals }
