import { Document, Model, model, Schema, Types } from "mongoose";
import { IRecipeDocument, RecipeSchema } from "./recipe.model";

enum ScheduleType {
  "BREAKFAST" = "BREAKFAST",
  "SNACK" = "SNACK",
  "LUNCH" = "LUNCH",
  "AFTERNOON_SNACK" = "AFTERNOON_SNACK",
  "DINNER" = "DINNER",
  "SUPPER" = "SUPPER",
}

const ScheduleSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
      index: true,
    },
    scheduleType: {
      type: String,
      enum: [
        ScheduleType.BREAKFAST,
        ScheduleType.SNACK,
        ScheduleType.LUNCH,
        ScheduleType.AFTERNOON_SNACK,
        ScheduleType.DINNER,
        ScheduleType.SUPPER,
      ],
      required: true,
    },
    recipes: {
      type: [RecipeSchema],
      required: true,
    },
    createAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { timestamps: true }
);

interface IScheduleSchema extends Document {
  date: Date;
  scheduleType: ScheduleType;
  createAt?: Date;
  updatedAt?: Date;
}

export interface ISchedule extends IScheduleSchema {
  recipes: Types.DocumentArray<IRecipeDocument>;
}

export interface IScheduleDocument extends ISchedule {}

export interface ISchedule_populated extends ISchedule {
  recipes: Types.DocumentArray<IRecipeDocument>;
}

export interface IScheduleModel extends Model<ISchedule> {
  getSchedule(id: string): Promise<ISchedule_populated>;
}

export const Schedule = model<IScheduleDocument, IScheduleModel>(
  "Schedule",
  ScheduleSchema
);
