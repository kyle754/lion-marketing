import document from "./document";

export const dynamic = "force-static";

export function GET() {
  return new Response(document, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    },
  });
}
