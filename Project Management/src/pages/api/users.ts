// pages/api/users.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a Prisma client instance
const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const users = await prisma.user.findMany(); // Fetch all users from the database
    res.status(200).json(users); // Send the response back as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching users' });
  }
};

export default getUsers;
