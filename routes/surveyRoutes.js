// check if user is logged in
const requireLogin = require("../middlewares/requireLogin");
// check if user has credits
const requireCredits = require("../middlewares/requireCredits");

module.exports = (app) => {
  app.post("/api/surveys", requireLogin, requireCredits, (req, res) => {});
};
