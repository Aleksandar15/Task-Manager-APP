// Section 15 Video 2:
const sgMail = require('@sendgrid/mail')

// Section 15 Video 4 Minute 11: [ we are deleting this for PRODUCTUIONs]:
// const sendgridAPIKey = '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'

// Section 15 Video 4 Minute 11: [edits out this]:
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
// sgMail.setApiKey(sendgridAPIKey)

// sgMail.send({  
//   to: 'aleksandarangelov15@hotmail.com',
//   // to: 'acej555@hotmail.com',
//   from: 'aleksandangelov15@hotmail.com',
//   subject: 'It wont work on same email This is my test with sendgrid',
//   // subject: 'It wont work on same email This is my test with sendgrid',
//   // It doesnt work at least for HOTMAIL, maybe on GMAIL - although its showing on SENDGRID as SENT [ONLY same by SAME EMAIL!-so i cant test gmail unless i make a new SENDGRID account!]
//   text: 'I hope it works'
// })

// Section 15 Video 3 Minute 1:
const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'aleksandarangelov15@hotmail.com',
    subject: "It won't be received on hotmail",
    // subject: "Thanks for joining in!",
    text: `Its broken like this for over a year, ${name}, since the last time I tried.`
    // text: `Welcome to the app, {name}. Let me know how you get along with the app.`
  })
}

// Section 15 Video 3 Minute 11 challenge time send After-Cancelation-mails emails:
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