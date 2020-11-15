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

export interface IRecipe {
  recipeName: string
  description: string
  createdAt?: Date
  updatedAt?: Date
}

export interface IRecipeInputDTO {
  recipeName: string
  description: string
}

export type IRecipeSchema = IRecipe & Document

export type IRecipeModel = Model<IRecipeSchema>

export const Recipe = model<IRecipeSchema, Model<IRecipeSchema>>(
  'Recipe',
  RecipeSchema,
)
