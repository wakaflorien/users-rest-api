import nodemailer from "nodemailer";

export const sendEmail = (to: string, subject: string, text: string) => {
  console.log(
    "OPTIONS",
    process.env.SEND_EMAIL,
    process.env.SEND_EMAIL_PASSWORD
  );
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: `${process.env.SEND_EMAIL}`,
      pass: `${process.env.SEND_EMAIL_PASSWORD}`,
    },
  });

  const mailOptions = {
    from: `${process.env.SEND_EMAIL}`,
    to: to,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
