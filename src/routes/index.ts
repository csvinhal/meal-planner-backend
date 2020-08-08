import express, { NextFunction, Request, Response } from "express";
import meals from "./meal.routes";
import recipes from "./recipe.routes";

const router = express.Router();

router.use("/recipes", recipes);
router.use("/meals", meals);

router.use(function (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.name === "ValidationError") {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function (errors: any, key: any) {
        errors[key] = err.errors[key].message;

        return errors;
      }, {}),
    });
  }

  return next(err);
});

export default router;
