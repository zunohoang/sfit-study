import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const maintenanceMode = true // Bật/tắt chế độ bảo trì

  if (maintenanceMode) {
    // Sử dụng rewrite để chuyển hướng đến trang bảo trì
    return NextResponse.rewrite(new URL("/maintenance", req.url))
  }

  return NextResponse.next()
}

// Loại trừ các tài nguyên tĩnh và trang bảo trì khỏi middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - maintenance (trang bảo trì)
     */
    "/((?!_next/static|_next/image|favicon.ico|maintenance).*)",
  ],
}

