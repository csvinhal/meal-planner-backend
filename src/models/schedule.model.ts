import { MealType, IMealDocument } from './meal.model'

export interface Schedule {
  [x: string]: {
    [MealType.BREAKFAST]: IMealDocument | null
    [MealType.SNACK]: IMealDocument | null
    [MealType.LUNCH]: IMealDocument | null
    [MealType.AFTERNOON_SNACK]: IMealDocument | null
    [MealType.DINNER]: IMealDocument | null
    [MealType.SUPPER]: IMealDocument | null
  }
}
