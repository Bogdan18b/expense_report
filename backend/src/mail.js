const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  }
})

const sendEmail = text => `
  <div>
    <p>${text}</p>
  </div>
`;

module.exports = {transport, sendEmail};