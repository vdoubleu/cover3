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

  const sessionData = await prisma.sweep.findFirst({
    where: {
      id: numId
    },
    include: {
      session: true,
      sweepers: true,
    }
  });

  prisma.$disconnect();
  return NextResponse.json(sessionData)
}

export async function POST(req: NextRequest) {
  const prisma = new PrismaClient()

  const body: { 
    startTimestamp: string; 
    endTimestamp: string; 
    sessionId: string; 
    data: any;
    sweepers: string[];
  } = await req.json();

  const startTime = new Date(body.startTimestamp);
  const endTime = body.endTimestamp ? new Date(body.endTimestamp) : undefined;

  if (!body.sessionId) {
    return NextResponse.next();
  }

  const numSessionId = parseInt(body.sessionId);

  const sweepData = await prisma.$transaction(async (tx) => {
    const sweepData = await tx.sweep.create({
      data: {
        session: {
          connect: {
            id: numSessionId
          }
        },
        startTimestamp: startTime,
        endTimestamp: endTime,
        data: body.data,
      },
    });

    const sessionData = await tx.sweepers.createMany({
      data: body.sweepers.map((sweeper: string) => ({
        sweep_id: sweepData.id,
        user: sweeper,
      }))
    });

    return sweepData;
  });

  prisma.$disconnect();
  return NextResponse.json(sweepData)
}

export async function PUT(req: NextRequest) {
  const primsa = new PrismaClient();

  const body: {
    reportId: number;
    startTimestamp?: string;
    endTimestamp?: string;
    sweepData?: any;
  } = await req.json();

  // update whichever fields are present
  const sessionData = await primsa.sweep.update({
    where: {
      id: body.reportId,
    },
    data: {
      startTimestamp: body.startTimestamp ? new Date(body.startTimestamp) : undefined,
      endTimestamp: body.endTimestamp ? new Date(body.endTimestamp) : undefined,
      data: body.sweepData,
    }
  });

  primsa.$disconnect();
  return NextResponse.json(sessionData)
}

export async function DELETE(req: NextRequest) {
  const prisma = new PrismaClient()

  const params = req.nextUrl.searchParams;
  const id = params.get('id');

  if (!id) {
    return NextResponse.next();
  }

  const numId = parseInt(id);

  const sweepData = await prisma.sweep.delete({
    where: {
      id: numId
    }
  });

  prisma.$disconnect();
  return NextResponse.json(sweepData)
}
