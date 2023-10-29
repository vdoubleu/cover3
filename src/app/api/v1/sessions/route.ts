import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
 
export async function GET() {
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
  
  return NextResponse.json(sessionData)
}
