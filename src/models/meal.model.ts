import { Document, Model, model, Schema, Types } from 'mongoose'
import { IRecipeDocument, RecipeSchema } from './recipe.model'

enum MealType {
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
    recipes: {
      type: [RecipeSchema],
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

interface IMealSchema extends Document {
  date: Date
  mealType: MealType
  createAt?: Date
  updatedAt?: Date
}

export interface IMeal extends IMealSchema {
  recipes: Types.DocumentArray<IRecipeDocument>
}

export interface IMealDocument extends IMeal {}

export interface IMeal_populated extends IMeal {
  recipes: Types.DocumentArray<IRecipeDocument>
}

export interface IMealModel extends Model<IMeal> {
  getMeal(id: string): Promise<IMeal_populated>
}

export const Meal = model<IMealDocument, IMealModel>('Meal', MealSchema)
