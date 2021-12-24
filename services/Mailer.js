const sendgrid = require("sendgrid");
const helper = sendgrid.mail;
const keys = require("../config/keys");

class Mailer extends helper.Mail {
  // this.from_email = new helper.Email('antonio.g.david@gmail.com')
}

module.exports = Mailer;
