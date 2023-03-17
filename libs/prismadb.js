import { PrismaClient } from ".prisma/client";
import { NextApiRequest, NextApiResponse } from "next"

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default prisma;