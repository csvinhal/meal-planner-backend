import { CreateQuery, UpdateQuery } from 'mongoose'
import { IRecipeDocument, Recipe } from '../models'

const listRecipes = async (): Promise<IRecipeDocument[]> => {
  return await Recipe.find({})
}

const getRecipe = async (id: string): Promise<IRecipeDocument | null> => {
  return await Recipe.findById(id)
}

const createRecipe = async ({
  recipeName,
  description,
}: CreateQuery<IRecipeDocument>): Promise<IRecipeDocument> => {
  try {
    const newRecipe = new Recipe({
      recipeName,
      description,
    })
    const created = await Recipe.create(newRecipe)
    return created
  } catch (error) {
    throw Error(error)
  }
}

const updateRecipe = async ({
  _id,
  recipeName,
  description,
}: UpdateQuery<IRecipeDocument>): Promise<IRecipeDocument | null> => {
  try {
    const updatedRecipe = new Recipe({
      _id,
      recipeName,
      description,
      updatedAt: new Date(),
    })

    return await Recipe.findByIdAndUpdate(_id, updatedRecipe, {
      new: true,
    })
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
