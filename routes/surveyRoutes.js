const mongoose = require("mongoose");
// check if user is logged in
const requireLogin = require("../middlewares/requireLogin");
// check if user has credits
const requireCredits = require("../middlewares/requireCredits");

const Survey = mongoose.model("surveys");

module.exports = (app) => {
  app.post("/api/surveys", requireLogin, requireCredits, (req, res) => {
    // check properties
    const { title, subject, body, recipients } = req.body;

    // create new instance of Survey
    const survey = new Survey({
      title,
      subject,
      body,
      // create array of email recipients
      recipients: recipients.split(",").map((email) => {
        return { email: email.trim() };
      }),
      _user: req.user.id,
      dateSent: Date.now(),
    });
  });
};
