import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";

const REDIRECT = ['/token', '/hackathon-winner'];

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Temporal redirect while the page is built.
    if (REDIRECT.includes(path)) return NextResponse.redirect(new URL('/', request.url));

    const acceptHeader = request.headers.get("accept");
    if (acceptHeader && acceptHeader.includes('text/x-component')) {
        return NextResponse.next()
    }
    // Add a new header x-current-path which passes the path to downstream components
    const headers = new Headers(request.headers);
    headers.set("x-current-path", request.nextUrl.pathname);
    return NextResponse.next({headers});
}

export const config = {
    matcher: [
        // match all routes except static files and APIs
        "/((?!api|_next/static|_next/image|favicon.ico).*)"
    ],
};