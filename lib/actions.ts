'use server';

import { createShortLink } from "@/lib/links";
import { headers } from "next/headers";
import { checkRateLimit } from "@/lib/rate-limit";

export async function shortenUrl(formData: FormData) {
    const originalUrl = formData.get("url") as string;
    const expiry = formData.get("expiry") as string;
    const length = formData.get("length") as string;

    // Rate Limiting
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || "127.0.0.1";

    if (!checkRateLimit(ip)) {
        return { error: "You can only shorten 3 URLs per minute. Try again later." };
    }

    const result = await createShortLink(originalUrl, expiry, length);

    if (result.error) {
        return { error: result.error };
    }

    return { shortCode: result.shortCode };
}
