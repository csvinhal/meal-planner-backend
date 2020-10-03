import express, { NextFunction, Request, Response } from 'express'
import {
  createRecipe,
  deleteRecipe,
  getRecipe,
  listRecipes,
  updateRecipe,
} from '../../controllers'

const router = express.Router()

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const recipes = await listRecipes()
    res.status(200).json(recipes)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const recipe = await getRecipe(id)
    res.status(200).json(recipe)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { recipeName, description } = req.body
    const recipe = await createRecipe({ recipeName, description })
    res.status(200).json(recipe)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const { id: _id } = req.params
    const { recipeName, recipeDescription } = req.body
    const recipe = await updateRecipe({
      _id,
      recipeName,
      recipeDescription,
    })
    res.status(200).json(recipe)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    await deleteRecipe(id)
    res.status(204).json(null)
  } catch (error) {
    next(error)
  }
})

export default router
