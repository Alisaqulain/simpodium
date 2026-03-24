import nodemailer from "nodemailer";

type SendEmailArgs = {
  to: string;
  subject: string;
  text: string;
  html?: string;
};

let cachedTransporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (cachedTransporter) return cachedTransporter;

  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  if (!user || !pass) {
    throw new Error("EMAIL_USER and EMAIL_PASS must be set");
  }

  cachedTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
  return cachedTransporter;
}

export async function sendEmail({ to, subject, text, html }: SendEmailArgs) {
  const user = process.env.EMAIL_USER;
  if (!user) {
    throw new Error("EMAIL_USER must be set");
  }

  const transporter = getTransporter();
  await transporter.sendMail({
    from: `"SIM PODIUM Bookings" <${user}>`,
    to,
    subject,
    text,
    html,
  });
}

