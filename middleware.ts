import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. Ambil token dan role dari cookies
  const token = request.cookies.get('token')?.value;
  const role = request.cookies.get('role')?.value;

  const { pathname } = request.nextUrl;

  // 2. Proteksi Rute Admin
  // Hanya role 'admin' atau 'super_admin' yang boleh masuk
  if (pathname.startsWith('/admin')) {
    if (!token || (role !== 'admin' && role !== 'super_admin')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // 3. Proteksi Rute User
  // Semua user yang sudah login boleh masuk ke /user
  if (pathname.startsWith('/user')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // 4. Redirect jika sudah login tapi mencoba akses Login/Signup
  if (token && (pathname === '/login' || pathname === '/signup')) {
    if (role === 'admin' || role === 'super_admin') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
    return NextResponse.redirect(new URL('/user/home', request.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: [
    '/admin/:path*', 
    '/user/:path*', 
    '/login', 
    '/signup'
  ],
};