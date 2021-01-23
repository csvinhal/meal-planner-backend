import escapeStringRegexp from 'escape-string-regexp'
import fs from 'fs'
import { UpdateQuery } from 'mongoose'
import { cleanDirectory } from '../utils/clean-directory'
import {
  IRecipeInputDTO,
  IRecipeInputQueryParamsDTO,
  IRecipeOutputDTO,
  IRecipeSchema,
  Recipe,
} from './../models'

const listRecipes = async ({
  recipeName,
}: IRecipeInputQueryParamsDTO): Promise<IRecipeOutputDTO[]> => {
  let params = {}

  if (recipeName) {
    params = {
      ...params,
      recipeName: new RegExp(escapeStringRegexp(recipeName), 'i'),
    }
  }
  const recipes = await Recipe.find(params)
  return recipes.map((recipe) => recipe.toJSON())
}

const getRecipe = async (id: string): Promise<IRecipeOutputDTO | null> => {
  const recipe = await Recipe.findById(id)
  return recipe ? recipe.toJSON() : null
}

const createRecipe = async (
  { recipeName, description }: IRecipeInputDTO,
  recipeImage: Express.Multer.File,
): Promise<IRecipeSchema> => {
  try {
    const newRecipe = new Recipe({
      recipeName,
      description,
      recipeImage: recipeImage ? fs.readFileSync(recipeImage.path) : null,
    })

    const created = await Recipe.create(newRecipe)

    cleanDirectory()

    return created.toJSON()
  } catch (error) {
    throw Error(error)
  }
}

const updateRecipe = async (
  id: string,
  { recipeName, description }: UpdateQuery<IRecipeInputDTO>,
  recipeImage?: Express.Multer.File,
): Promise<IRecipeOutputDTO | null> => {
  try {
    let newRecipeImage = {}

    if (recipeImage) {
      newRecipeImage = {
        recipeImage: fs.readFileSync(recipeImage.path),
      }
    }
    const recipe = new Recipe({
      _id: id,
      recipeName,
      description,
      updatedAt: new Date(),
      ...newRecipeImage,
    })

    const updatedRecipe = await Recipe.findByIdAndUpdate(id, recipe, {
      new: true,
    })

    cleanDirectory()

    return updatedRecipe ? updatedRecipe.toJSON() : null
  } catch (error) {
    throw Error(error)
  }
}

const deleteRecipe = async (
  id: string,
): Promise<
  { ok?: number | undefined; n?: number | undefined } & {
    deletedCount?: number | undefined
  }
> => {
  try {
    return await Recipe.deleteOne({ _id: id })
  } catch (error) {
    throw Error(error)
  }
}

export { listRecipes, getRecipe, createRecipe, updateRecipe, deleteRecipe }
