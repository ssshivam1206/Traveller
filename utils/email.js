const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1) create a transpoter
  const transpoter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  // 2) define the email options
  const mailOptions = {
    from: 'Shivam Singh sshivam1206@gmail.com',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // 3) send email
  await transpoter.sendMail(mailOptions);
};

module.exports = sendEmail;
