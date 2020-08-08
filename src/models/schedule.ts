import { Document, Model, model, Schema } from "mongoose";
import { IRecipe } from "./recipe";

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
    recipe: {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
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
  createAt: Date;
  updatedAt: Date;
}

export interface ISchedule extends IScheduleSchema {
  recipe: IRecipe["_id"];
}

export interface ISchedule_populated extends ISchedule {
  recipe: IRecipe;
}

export interface IScheduleModel extends Model<ISchedule> {
  getSchedule(id: string): Promise<ISchedule_populated>;
}

export default model<IScheduleSchema, IScheduleModel>(
  "Schedule",
  ScheduleSchema
);
