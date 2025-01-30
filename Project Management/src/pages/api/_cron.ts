import { NextApiRequest, NextApiResponse } from "next";
import cron from "node-cron";
import { sendEmail } from "../../utils/mail";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Schedule the cron job to run every 12 hours
  cron.schedule("0 */12 * * *", async () => {
    console.log("Running 12-hourly task email notification...");

    try {
      // Get the current date and time
      const now = new Date();

      // Fetch tasks with deadlines within the next 48 hours and status not "Closed"
      const tasks = await prisma.task.findMany({
        where: {
          deadline: {
            lte: new Date(now.getTime() + 48 * 60 * 60 * 1000), // Deadline within the next 48 hours
            gte: now, // Deadline in the future, not in the past
          },
          status: {
            not: "Closed", // Only fetch tasks with status not equal to "Closed"
          },
        },
        include: {
          user: true, // Include the related `User` to get their email
        },
      });

      // Send email reminders for each task
      for (const task of tasks) {
        if (task.user && task.user.email) {
          await sendEmail(
            task.user.email, // Fetch the email from the related `User`
            `Reminder: Task "${task.title}" is approaching its due date!`,
            `<p>Hi ${task.user.name || "there"},</p>
            <p>The task <strong>${task.title}</strong> is due on <strong>${new Date(
              task.deadline
            ).toLocaleDateString()}</strong>. Please ensure it is completed on time.</p>`
          );
        }
      }
    } catch (error) {
      console.error("Error in cron job:", error);
    }
  });

  return res.status(200).json({ message: "Cron job initialized for 12-hour checks" });
}
