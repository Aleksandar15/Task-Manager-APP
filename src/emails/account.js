const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'aleksandarangelov15@hotmail.com',
    subject: "It won't be received on hotmail",
    text: `Its broken like this for over a year, ${name}, since the last time I tried.`
  })
}

const sendCancelationEmail  = (email, name) => {
  sgMail.send({
    to: email,
    from: 'aleksandarangelov15@hotmail.com',
    subject: 'Sorry to see you go!',
    text: `Goodbye, ${name}. I hope to see you back sometime soon.`
  })
}

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail
}