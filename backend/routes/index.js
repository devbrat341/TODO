const userRoute  = require("./user.route.js");
const taskRoute  = require("./task.route.js");

const setupRoute = (app) => {
  app.get("/api/test", (_, res) => {
    res.send("All good!");
  });

  app.use("/api/user", userRoute);
  app.use("/api/task", taskRoute);
};

module.exports = setupRoute