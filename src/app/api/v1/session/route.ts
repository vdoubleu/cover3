import { NextResponse, NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'
 
export async function GET(req: NextRequest) {
  const prisma = new PrismaClient()

  const params = req.nextUrl.searchParams;
  const id = params.get('id');

  if (!id) {
    return NextResponse.next();
  }

  const numId = parseInt(id);

  const sessionData = await prisma.sessions.findFirst({
    where: {
      id: numId
    },
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

export async function POST(req: NextRequest) {
  const prisma = new PrismaClient()

  const body = await req.json();

  const currTime = new Date();

  const sessionData = await prisma.sessions.create({
    data: {
      building: body.building,
      startTimestamp: currTime,
      lead: body.lead
    },
  });

  prisma.$disconnect();
  return NextResponse.json(sessionData)
}

export async function DELETE(req: NextRequest) {
  const prisma = new PrismaClient();

  const params = req.nextUrl.searchParams;

  const id = params.get('id');

  if (!id) {
    return NextResponse.next();
  }

  const numId = parseInt(id);

  const sessionData = await prisma.sessions.delete({
    where: {
      id: numId
    },
  });

  prisma.$disconnect();
  return NextResponse.json(sessionData)
}
