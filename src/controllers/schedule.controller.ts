import { endOfWeek, startOfWeek } from "date-fns";
import { IMealDocument, Meal } from "../models";

const getSchedule = async (): Promise<IMealDocument[]> => {
  const date = new Date();
  const startOfWeekDate = startOfWeek(date);
  const endOfWeekDate = endOfWeek(date);

  return await Meal.find({
    date: { $gte: startOfWeekDate, $lte: endOfWeekDate },
  });
};

export { getSchedule };
