var nodemailer = require("nodemailer");

const myEmail = "roammate.travel@gmail.com";
const myPassword = "jegt vgtk omja pzqu";

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: myEmail,
    pass: myPassword,
  },
  tls: {
    rejectUnauthorized: false, // Disable certificate validation (use with caution in production)
  },
});

const sendEmail = (email, subject, text) => {
  const mailOptions = {
    from: myEmail,
    to: email,
    subject: subject,
    text: text,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
    //   console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendEmail;