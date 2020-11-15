import { Document, Model, model, Schema } from 'mongoose'
import { IRecipeSchema, RecipeSchema } from './recipe.model'

export enum MealType {
  'BREAKFAST' = 0,
  'SNACK' = 1,
  'LUNCH' = 2,
  'AFTERNOON_SNACK' = 3,
  'DINNER' = 4,
  'SUPPER' = 5,
}

const MealSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
      index: true,
    },
    mealType: {
      type: Number,
      enum: [
        MealType.BREAKFAST,
        MealType.SNACK,
        MealType.LUNCH,
        MealType.AFTERNOON_SNACK,
        MealType.DINNER,
        MealType.SUPPER,
      ],
      required: true,
    },
    recipe: {
      type: RecipeSchema,
      required: true,
    },
    createAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { timestamps: true },
)

export interface IMeal {
  date: Date
  recipe: IRecipeSchema
  mealType: MealType
  createAt?: Date
  updatedAt?: Date
}

type IMealSchema = IMeal & Document 

export interface IMealDocument extends IMeal {}

export const Meal = model<IMealSchema,  Model<IMealSchema>>('Meal', MealSchema)
