const cron = require("node-cron");
const { sendReportMail } = require("../services/mailer");

// Schedule defined by env; default: every 2 minutes
const schedule = process.env.CRON_SCHEDULE_EVERY_2_MIN || "*/2 * * * *";
const timezone = process.env.CRON_TIMEZONE || "UTC";
const mailTo = process.env.MAIL_TO || process.env.SMTP_USER || null;

function startCron() {
  if (!mailTo) {
    console.warn("MAIL_TO not set — cron job will not send emails but will still run.");
  }

  // Create a job that runs every 2 minutes (or as per CRON_SCHEDULE_EVERY_2_MIN)
  cron.schedule(
    schedule,
    async () => {
      const now = new Date();
      const text = `Automated report:\nCurrent server time: ${now.toString()}\n\nThis is a scheduled report sent every 2 minutes.`;
      console.log(`[cron] Running scheduled task at ${now.toISOString()}`);

      try {
        if (mailTo) {
          await sendReportMail(mailTo, `Automated report - ${now.toISOString()}`, text);
          console.log(`[cron] Email sent to ${mailTo}`);
        } else {
          console.log(`[cron] No MAIL_TO configured - skipping email send. Current time: ${now.toISOString()}`);
        }
      } catch (err) {
        console.error("[cron] Error sending scheduled email:", err);
      }
    },
    {
      scheduled: true,
      timezone
    }
  );

  console.log(`[cron] Scheduled job started: schedule=${schedule} timezone=${timezone}`);
}

module.exports = { startCron };
