import { CreateQuery } from "mongoose";
import { IMealDocument, Meal } from "../models";

const listMeals = async (): Promise<IMealDocument[]> => {
  return await Meal.find({});
};

const createMeal = async ({
  date,
  mealType,
  recipes,
}: CreateQuery<IMealDocument>): Promise<IMealDocument> => {
  try {
    const newRecipe = new Meal({
      date,
      mealType,
      recipes,
    });
    const created = await Meal.create(newRecipe);
    return created;
  } catch (error) {
    throw Error(error);
  }
};

export { createMeal, listMeals };
