import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { connect } from "./db/config";
import routes from "./routes";

connect();

const app = express();
app.use(helmet());
app.use(morgan("common"));
app.use(cors());
app.use(express.json());

app.use(routes);

app.use((error, req, res, next) => {
  if (error.status) {
    res.status(error.status);
  } else {
    res.status(500);
  }
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : error.stack,
  });
});

export default app;
