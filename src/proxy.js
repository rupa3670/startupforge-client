import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server'

// const privatePaths = ["/dashboard","/pet"];
 
// This function can be marked `async` if using `await` inside
export async function proxy(request) {
  // const {pathname} = request.nextUrl;
  // console.log("Proxy is running:", pathname);
  // const isPrivate = privatePaths.some((path)=>pathname.startsWith(path));
  // console.log("isPrivate:",isPrivate);
  // if(!isPrivate){
  //   return NextResponse.next();
  // }
  const session = await auth.api.getSession({
    headers: await headers() // headers containing the user's session token
});
 
if(!session || !session?.user){
  //  const loginUrl = new URL ("/login", request.url);
  // loginUrl.searchParams.set("redirectTo",pathname)
  return NextResponse.redirect(new URL('/login',request.url));
}
  // return NextResponse.next();
}
 
// Alternatively, you can use a default export:
// export default function proxy(request) { ... }
 
export const config = {
  // runtime:"nodejs",
  matcher: ['/dashboard/:path*'],
}