import { db } from "../db/config";
import { recipeSchema } from "../models";

const listRecipes = async () => {
  const recipes = db.get("recipes");
  return await recipes.find({});
};

const getRecipe = async (id) => {
  const recipes = db.get("recipes");
  return await recipes.findOne({ _id: id });
};

const saveRecipe = async (recipeName, recipeDescription) => {
  try {
    const recipes = db.get("recipes");

    const newRecipe = await recipeSchema.validate({
      recipeName,
      recipeDescription,
    });
    const created = await recipes.insert(newRecipe);
    return created;
  } catch (error) {
    throw Error(error);
  }
};

const updateRecipe = async (id, recipeName, recipeDescription) => {
  const recipes = db.get("recipes", { wrapNon$UpdateField: true });
  try {
    const updatedRecipe = await recipeSchema.validate({
      _id: id,
      recipeName,
      recipeDescription,
    });

    const updated = await recipes.findOneAndUpdate({ _id: id }, updatedRecipe);
    return updated;
  } catch (error) {
    throw Error(error);
  }
};

const deleteRecipe = async (id) => {
  const recipes = db.get("recipes");
  try {
    return await recipes.remove({ _id: id });
  } catch (error) {
    throw Error(error);
  }
};

export { listRecipes, getRecipe, saveRecipe, updateRecipe, deleteRecipe };
