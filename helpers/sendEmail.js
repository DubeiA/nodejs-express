const sgMail = require("@sendgrid/mail");

const { SENDGRID_EMAIL_KEY } = process.env;

sgMail.setApiKey(SENDGRID_EMAIL_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "dubeianatolii@gmail.com" };
  await sgMail.send(email);
  return true;
};

module.exports = sendEmail;
