import { CreateQuery } from "mongoose";
import { IMealDocument, Meal } from "../models";
import { endOfWeek, startOfWeek } from "date-fns";

const listMeals = async (): Promise<IMealDocument[]> => {
  const date = new Date();
  const startOfWeekDate = startOfWeek(date);
  const endOfWeekDate = endOfWeek(date);

  return await Meal.find({
    date: { $gte: startOfWeekDate, $lte: endOfWeekDate },
  });
};

const createMeal = async ({
  date,
  mealType,
  recipes,
}: CreateQuery<IMealDocument>): Promise<IMealDocument> => {
  try {
    const newMeal = new Meal({
      date,
      mealType,
      recipes,
    });
    const created = await Meal.create(newMeal);
    return created;
  } catch (error) {
    throw Error(error);
  }
};

export { createMeal, listMeals };
