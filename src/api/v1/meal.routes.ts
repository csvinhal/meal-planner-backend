import { createMeal, listMeals } from "../../controllers";
import express, { NextFunction, Request, Response } from "express";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schedules = await listMeals();
    res.status(200).json(schedules);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { date, mealType, recipes } = req.body;
    const schedule = await createMeal({ date, mealType, recipes });
    res.status(200).json(schedule);
  } catch (error) {
    next(error);
  }
});

export default router;
