const sendgrid = require("sendgrid");
const helper = sendgrid.mail;
const keys = require("../config/keys");

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();

    this.sgApi = sendgrid(keys.sendGridKey);
    this.from_email = new helper.Email(keys.sendGridFromEmail);
    this.subject = subject;
    this.body = new helper.Content("text/html", content);
    this.recipients = this.formatAddresses(recipients);

    this.addContent(this.body); // function from sendgrid Mail class
    this.addClickTracking();
    this.addRecipients();
  }

  formatAddresses(recipients) {
    return recipients.map((recipient) => {
      return new helper.Email(recipient.email);
    });
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings(); // functions from sendgrid Mail class
    const clickTracking = new helper.ClickTracking(true, true); // functions from sendgrid Mail class

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();
    this.recipients.forEach((recipient) => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize); // functions from sendgrid Mail class
  }

  async send() {
    const request = this.sgApi.emptyRequest({
      method: "POST",
      path: "/v3/mail/send",
      body: this.toJSON(),
    });

    const response = this.sgApi.API(request);
    return response;
  }
}

module.exports = Mailer;
