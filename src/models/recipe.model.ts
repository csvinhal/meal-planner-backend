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
    recipeImage: {
      type: Buffer,
      get: (value: Buffer) => {
        return Buffer.from(value).toString('base64')
      },
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
  { timestamps: true, toJSON: { getters: true } },
)

export interface IRecipe {
  recipeName: string
  description: string
  recipeImage: Buffer
  createdAt?: Date
  updatedAt?: Date
}

export interface IRecipeInputDTO {
  recipeName: string
  description: string
}

export interface IRecipeInputQueryParamsDTO {
  recipeName?: string
}

export interface IRecipeOutputDTO {
  recipeName: string
  description: string
  recipeImage?: string
}

export type IRecipeSchema = IRecipe & Document

export type IRecipeModel = Model<IRecipeSchema>

export const Recipe = model<IRecipeSchema, Model<IRecipeSchema>>(
  'Recipe',
  RecipeSchema,
)
