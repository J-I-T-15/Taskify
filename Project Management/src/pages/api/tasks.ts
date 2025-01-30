import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // GET method - Fetch tasks based on projectId
    if (req.method === "GET") {
      const { projectId } = req.query;
      if (!projectId) {
        return res.status(400).json({ error: "Project ID is required" });
      }

      const tasks = await prisma.task.findMany({
        where: { projectId: String(projectId) },
      });
      return res.status(200).json(tasks);
    }

    // POST method - Create a new task
    else if (req.method === "POST") {
      const { title, description, deadline, priority, assignedTo, status, projectId } = req.body;

      if (!title || !description || !deadline || !priority || !assignedTo || !status || !projectId) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const task = await prisma.task.create({
        data: {
          title,
          description,
          deadline: new Date(deadline),
          priority,
          assignedTo,
          status,
          projectId,
        },
      });

      return res.status(201).json(task);
    }

    // PUT method - Update an existing task
    else if (req.method === "PUT") {
      const { id, title, description, deadline, priority, assignedTo, status, projectId } = req.body;

      // Ensure all required fields are present
      if (!id || !title || !description || !deadline || !priority || !assignedTo || !status || !projectId) {
        return res.status(400).json({ error: "All fields are required for update" });
      }

      // Find and update the task in the database
      const task = await prisma.task.update({
        where: { id: String(id) },
        data: {
          title,
          description,
          deadline: new Date(deadline),
          priority,
          assignedTo,
          status,
          projectId,
        },
      });

      return res.status(200).json(task);
    }

    // Method Not Allowed for any other HTTP methods
    else {
      res.setHeader("Allow", ["GET", "POST", "PUT"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("Error processing tasks:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
