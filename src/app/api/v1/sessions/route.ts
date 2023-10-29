import { NextResponse, NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'
 
export async function GET(req: NextRequest) {
  const prisma = new PrismaClient()

  const sessionData = await prisma.sessions.findMany({
    include: {
      sweeps: {
        include: {
          sweepers: true
        }
      },
    },
  });

  prisma.$disconnect();

  return NextResponse.json(sessionData);
}

export async function POST(req: NextRequest) {
  return NextResponse.json({});
}
