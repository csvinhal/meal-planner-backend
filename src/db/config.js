import monk from "monk";

let db;

const connect = () => {
  const base = monk(`${process.env.MONGODB_URL}/${process.env.MONGODB_NAME}`);
  base.addMiddleware(require("monk-middleware-wrap-non-dollar-update"));
  db = base;
};

export { connect, db };
