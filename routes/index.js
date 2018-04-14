

const constructorMethod = app => {

    app.use("*", (req, res) => {
        res.render("main/index", null);
  });
};

module.exports = constructorMethod;