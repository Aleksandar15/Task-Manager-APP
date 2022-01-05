// jshint esversion: 6

const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'aleksandarangelov15@hotmail.com',
    subject: 'Thanks for joining in.',
    text: `Welcome to the app, ${name}.`
  });
};

const sendGoodbyeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'aleksandarangelov15@hotmail.com',
    subject: "Goodbye.",
    text: `We're sorry to see you go, ${name}. Let me know how we can improve.`
  });
};

module.exports = {
  sendWelcomeEmail,
  sendGoodbyeEmail
};
