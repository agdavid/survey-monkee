const mongoose = require("mongoose");
// check if user is logged in
const requireLogin = require("../middlewares/requireLogin");
// check if user has credits
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const Survey = mongoose.model("surveys");

module.exports = (app) => {
  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
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

    // Great place to send an email
    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();
      // Save survey
      await survey.save();
      // Deduct credit and save user
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
