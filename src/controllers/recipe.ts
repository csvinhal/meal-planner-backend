import Recipe from "../models/recipe";

const listRecipes = async () => {
  return await Recipe.find({});
};

const getRecipe = async (id: string) => {
  return await Recipe.findById(id);
};

const saveRecipe = async (recipeName: string, description: string) => {
  try {
    const newRecipe = new Recipe({
      recipeName,
      description,
    });
    const created = await Recipe.create(newRecipe);
    return created;
  } catch (error) {
    throw Error(error);
  }
};

const updateRecipe = async (
  id: string,
  recipeName: string,
  description: string
) => {
  try {
    const updatedRecipe = new Recipe({
      _id: id,
      recipeName,
      description,
      updatedAt: new Date(),
    });

    const updated = await Recipe.findByIdAndUpdate(id, updatedRecipe, {
      new: true,
    });
    return updated;
  } catch (error) {
    throw Error(error);
  }
};

const deleteRecipe = async (id: string) => {
  try {
    return await Recipe.deleteOne({ _id: id });
  } catch (error) {
    throw Error(error);
  }
};

export { listRecipes, getRecipe, saveRecipe, updateRecipe, deleteRecipe };
