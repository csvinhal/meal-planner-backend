import { connect } from "mongoose";

connect(`${process.env.MONGODB_URL}/${process.env.MONGODB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}).then(() => {
  console.log("Connected to db");
});
