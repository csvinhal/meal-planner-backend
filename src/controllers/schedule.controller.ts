import { CreateQuery } from "mongoose";
import { IScheduleDocument, Schedule } from "../models";

const listSchedules = async (): Promise<IScheduleDocument[]> => {
  return await Schedule.find({});
};

const createSchedule = async ({
  date,
  scheduleType,
  recipes,
}: CreateQuery<IScheduleDocument>): Promise<IScheduleDocument> => {
  try {
    const newRecipe = new Schedule({
      date,
      scheduleType,
      recipes,
    });
    const created = await Schedule.create(newRecipe);
    return created;
  } catch (error) {
    throw Error(error);
  }
};

export { createSchedule, listSchedules };
