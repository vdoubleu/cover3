import { NextResponse, NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'
 
export async function GET(req: NextRequest) {
  const prisma = new PrismaClient()

  // delete sweeps and all related data that are older than 3 days
  const res = await prisma.sessions.deleteMany({
    where: {
      sweeps: {
        every: {
          endTimestamp: {
            lt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3)
          }
        }
      }
    }
  });


  prisma.$disconnect();

  return NextResponse.json(res);
}

