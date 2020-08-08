import express, { NextFunction, Request, Response } from "express";
import { createSchedule, listSchedules } from "../controllers";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('passou aqui');
    const schedules = await listSchedules();
    console.log('retornou')
    res.status(200).json(schedules);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { date, scheduleType, recipes } = req.body;
    const schedule = await createSchedule({ date, scheduleType, recipes });
    res.status(200).json(schedule);
  } catch (error) {
    next(error);
  }
});

export default router;
