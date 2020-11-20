import express, { NextFunction, Request, Response } from 'express'
import multer from 'multer'
import config from '../../config'
import {
  createRecipe,
  deleteRecipe,
  getRecipe,
  listRecipes,
  updateRecipe,
} from '../../controllers'

const router = express.Router()
const upload = multer({ dest: config.uploadDest })

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

router.post('/', upload.single('recipeImage'), async (req, res, next) => {
  try {
    const recipeInput = req.body
    const recipeImage = req.file
    const recipe = await createRecipe(recipeInput, recipeImage)
    res.status(201).json(recipe)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', upload.single('recipeImage'), async (req, res, next) => {
  try {
    const { id } = req.params
    const recipeInput = req.body
    const recipeImage = req.file
    const recipe = await updateRecipe(id, recipeInput, recipeImage)
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
