// pages/api/user.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }, // or use session.user.email
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user); // Return user details
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
