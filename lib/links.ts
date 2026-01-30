
import { db } from "@/lib/db";
import { links } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

export type CreateLinkResult = {
    shortCode?: string;
    originalUrl?: string;
    expiresAt?: Date | null;
    error?: string;
};

export async function createShortLink(
    url: string,
    expiry: string = "6 months",
    length: string = "short"
): Promise<CreateLinkResult> {
    if (!url) {
        return { error: "URL is required" };
    }

    try {
        new URL(url);
    } catch (e) {
        return { error: "Invalid URL" };
    }

    // Check if the link already exists and is valid
    try {
        const existingLinks = await db
            .select()
            .from(links)
            .where(eq(links.originalUrl, url));

        const now = new Date();
        const validLink = existingLinks.find(link =>
            !link.expiresAt || link.expiresAt > now
        );

        if (validLink) {
            return {
                shortCode: validLink.shortCode,
                originalUrl: validLink.originalUrl,
                expiresAt: validLink.expiresAt,
            };
        }
    } catch (e) {
        console.error("Failed to check existing links", e);
    }

    const effectiveExpiry = expiry || "6 months";
    const effectiveLength = length || "short";

    const size = effectiveLength === "safest" ? 7 : 5;
    const shortCode = nanoid(size);

    let expiresAt: Date | null = null;
    const now = new Date();

    switch (effectiveExpiry) {
        case "1 day":
            expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000);
            break;
        case "1 week":
            expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
            break;
        case "2 months": {
            const d = new Date(now);
            d.setMonth(d.getMonth() + 2);
            expiresAt = d;
            break;
        }
        case "6 months": {
            const d = new Date(now);
            d.setMonth(d.getMonth() + 6);
            expiresAt = d;
            break;
        }
        case "1 year": {
            const d = new Date(now);
            d.setFullYear(d.getFullYear() + 1);
            expiresAt = d;
            break;
        }
        case "never":
            expiresAt = null;
            break;
        default: {
            // Default to 6 months if unknown
            const d = new Date(now);
            d.setMonth(d.getMonth() + 6);
            expiresAt = d;
            break;
        }
    }

    try {
        const [result] = await db.insert(links).values({
            originalUrl: url,
            shortCode,
            expiresAt,
        }).returning();

        return {
            shortCode: result.shortCode,
            originalUrl: result.originalUrl,
            expiresAt: result.expiresAt,
        };
    } catch (error) {
        console.error("Failed to insert link:", error);
        return { error: "Failed to create short link. Please try again." };
    }
}
