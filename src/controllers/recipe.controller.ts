import escapeStringRegexp from 'escape-string-regexp'
import fs from 'fs'
import { UpdateQuery } from 'mongoose'
import { cleanDirectory } from '../utils/clean-directory'
import {
  IRecipe,
  IRecipeInputDTO,
  IRecipeInputQueryParamsDTO,
  IRecipeOutputDTO,
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
  console.log(recipeName)
  const recipes = await Recipe.find(params).lean()
  return recipes.map((recipe) => convertRecipeSchemaToOutput(recipe))
}

const getRecipe = async (id: string): Promise<IRecipeOutputDTO | null> => {
  const recipe = await Recipe.findById(id).lean()
  return recipe ? convertRecipeSchemaToOutput(recipe) : null
}

const createRecipe = async (
  { recipeName, description }: IRecipeInputDTO,
  recipeImage: Express.Multer.File,
): Promise<IRecipeInputDTO> => {
  try {
    const newRecipe = new Recipe({
      recipeName,
      description,
      recipeImage: recipeImage
        ? {
            data: fs.readFileSync(recipeImage.path),
            contentType: recipeImage.mimetype,
          }
        : null,
    })

    const created = await Recipe.create(newRecipe)

    cleanDirectory()

    return created
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
        recipeImage: {
          data: fs.readFileSync(recipeImage.path),
          contentType: recipeImage.mimetype,
        },
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
    }).lean()

    cleanDirectory()

    return updatedRecipe ? convertRecipeSchemaToOutput(updatedRecipe) : null
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

const convertRecipeSchemaToOutput = (recipe: IRecipe): IRecipeOutputDTO => ({
  ...recipe,
  recipeImage: recipe.recipeImage
    ? Buffer.from(recipe.recipeImage.data.buffer).toString('base64')
    : undefined,
})

export { listRecipes, getRecipe, createRecipe, updateRecipe, deleteRecipe }
