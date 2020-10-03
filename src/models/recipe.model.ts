import { Document, model, Model, Schema } from 'mongoose'

export const RecipeSchema = new Schema(
  {
    recipeName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdAt: {
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

interface IRecipe {
  recipeName: string
  description: string
  createdAt?: Date
  updatedAt?: Date
}

interface IRecipeSchema extends IRecipe, Document {}

export interface IRecipeDocument extends IRecipeSchema {}

export interface IRecipeModel extends Model<IRecipeDocument> {}

export const Recipe = model<IRecipeDocument, IRecipeModel>(
  'Recipe',
  RecipeSchema,
)
