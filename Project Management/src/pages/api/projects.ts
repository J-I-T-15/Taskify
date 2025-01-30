import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { name, description, userId } = req.body;
      console.log("Received payload:", { name, description, userId });

      if (!name || !userId) {
        return res
          .status(400)
          .json({ message: "Both 'name' and 'userId' are required." });
      }

      const newProject = await prisma.project.create({
        data: {
          name,
          description: description || null,
          createdBy: userId,
          userId,
        },
      });

      return res.status(201).json(newProject);
    } catch (error) {
      console.error("Error creating project:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  } else if (req.method === "GET") {
    try {
      const projects = await prisma.project.findMany();
      return res.status(200).json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).json({ message: `Method ${req.method} not allowed.` });
  }
}
