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
  
  const resp = NextResponse.json(sessionData);
  
  // set headers for cache control
  resp.headers.set('Cache-Control', 's-maxage=1, stale-while-revalidate');
  resp.headers.set('Vercel-Cache-Control', 's-maxage=1, stale-while-revalidate');
  resp.headers.set('CDN-Cache-Control', 's-maxage=1, stale-while-revalidate');

  return resp;
}
