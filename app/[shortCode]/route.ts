
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { links } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ shortCode: string }> }
) {
    const { shortCode } = await params;

    const result = await db.select().from(links).where(eq(links.shortCode, shortCode));

    if (result.length === 0) {
        return new NextResponse("Not Found", { status: 404 });
    }

    const link = result[0];

    // Check expiry
    if (link.expiresAt && new Date() > link.expiresAt) {
        db.delete(links)
    .where(eq(links.id, link.id))
    .catch((err) => console.error("Failed to delete expired link:", err));

        return new NextResponse("Link Expired", { status: 410 }); // 410 Gone
    }

    // Track click
    try {
        await db.update(links).set({ clicks: link.clicks + 1 }).where(eq(links.id, link.id));
    } catch (e) {
        console.error("Failed to update clicks", e);
    }

    return NextResponse.redirect(link.originalUrl);
}
