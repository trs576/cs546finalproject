const profileRoutes = require("./profile");
const apiRoutes = require("./api");

const constructorMethod = app => {
    app.use("/", profileRoutes);

    app.use("/", apiRoutes);

    app.use("*", (req, res) => {
        res.render("main/index", null);
  });
};

module.exports = constructorMethod;