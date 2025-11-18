// backend/src/jobs/cronJob.js
const cron = require("node-cron");
const nodemailer = require("nodemailer");

function startCron() {
  if (
    !process.env.SMTP_HOST ||
    !process.env.SMTP_USER ||
    !process.env.SMTP_PASS ||
    !process.env.MAIL_TO
  ) {
    console.log("SMTP not configured. Mailing disabled.");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false, // true for 465, false for 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Schedule cron job every 2 minutes
  cron.schedule(
    process.env.CRON_SCHEDULE_EVERY_2_MIN || "*/2 * * * *",
    async () => {
      try {
        const info = await transporter.sendMail({
          from: `"Report Bot" <${process.env.SMTP_USER}>`,
          to: process.env.MAIL_TO,
          subject: "Scheduled Report",
          text: `Current server time: ${new Date().toISOString()}`,
        });
        console.log("Cron email sent:", info.messageId);
      } catch (err) {
        console.error("Cron email error:", err);
      }
    },
    {
      timezone: process.env.CRON_TIMEZONE || "UTC",
    }
  );

  console.log("Cron job started: sending email every 2 minutes");
}

module.exports = { startCron };
