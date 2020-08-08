import { connect, set } from "mongoose";

set("useCreateIndex", true);
connect(`${process.env.MONGODB_URL}/${process.env.MONGODB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}).then(() => {
  console.log("Connected to db");
});
