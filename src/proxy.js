import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server'

export async function proxy(request) {
 
  const session = await auth.api.getSession({
    headers: await headers() 
});
 
if(!session || !session?.user){
  
  return NextResponse.redirect(new URL('/login',request.url));
}
  
}
 

 
export const config = {
  matcher: ['/profile','/dashboard/founder'],
}