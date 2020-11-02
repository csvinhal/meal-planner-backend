import { IMealDocument, MealType } from './meal.model'

export interface ScheduleDaysOfWeek {
  [x: string]: IMealDocument | null
}

export interface Schedule {
  [MealType.BREAKFAST]: ScheduleDaysOfWeek
  [MealType.SNACK]: ScheduleDaysOfWeek
  [MealType.LUNCH]: ScheduleDaysOfWeek
  [MealType.AFTERNOON_SNACK]: ScheduleDaysOfWeek
  [MealType.DINNER]: ScheduleDaysOfWeek
  [MealType.SUPPER]: ScheduleDaysOfWeek
}
