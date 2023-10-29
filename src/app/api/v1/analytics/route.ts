import { NextResponse, NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'

export async function POST(req: NextRequest) {
  const prisma = new PrismaClient();

  const body = await req.json();

  const analytics = await prisma.sweepAnalytics.create({
    data: {
      building: body.building,
      email: body.email,
      startTimestamp: new Date(),
    },
  });

  prisma.$disconnect();
  return NextResponse.json({ id: analytics.id });
}
