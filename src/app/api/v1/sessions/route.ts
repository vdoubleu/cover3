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
  
  // const resp = NextResponse.json(sessionData);
  
  // // set headers for cache control
  // resp.headers.set('Cache-Control', 's-maxage=1, stale-while-revalidate');
  // resp.headers.set('Vercel-Cache-Control', 's-maxage=1, stale-while-revalidate');
  // resp.headers.set('CDN-Cache-Control', 's-maxage=1, stale-while-revalidate');

  // return resp;
}

export async function POST(req: NextRequest) {
  return NextResponse.json({});
}
