import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false, // Use TLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const info = await transporter.sendMail({
      from: `"Taskify App" <${process.env.SMTP_USER}>`, // Sender email
      to,
      subject,
      html,
    });
    console.log("Email sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
