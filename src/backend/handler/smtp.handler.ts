import nodemailer from "nodemailer";
import { config } from "../config/config";
import Mail, { Attachment } from "nodemailer/lib/mailer";
// Create a transporter using Gmail SMTP settings
const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: config.smtp.port,
  secure: config.smtp.secure,
  auth: {
    user: config.smtp.auth.user,
    pass: config.smtp.auth.pass,
  },
});

// Async function to send the email
export async function smtp(mail: Mail.Options) {
  const info = await transporter.sendMail({
    from: `"${config.appName}" <${config.smtp.auth.user}>`,
    ...mail,
  });
  return info;
}
