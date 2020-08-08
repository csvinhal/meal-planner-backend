import { Document, model, Model, Schema } from "mongoose";

const RecipeSchema = new Schema(
  {
    recipeName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdAt: {
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

interface IRecipeSchema extends Document {
  recipeName: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IRecipe extends IRecipeSchema {}

export interface IRecipeModel extends Model<IRecipe> {}

export default model<IRecipe, IRecipeModel>("Recipe", RecipeSchema);
