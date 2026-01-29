
import { NextResponse } from "next/server";
import { createShortLink } from "@/lib/links";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { url, expiry, length } = body;

        const result = await createShortLink(url, expiry, length);

        if (result.error) {
            return NextResponse.json({ error: result.error }, { status: 400 });
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to shorten URL" }, { status: 500 });
    }
}
