/**
 * Netlify Function: send-email
 * Path: server/netlify/send-email.ts
 *
 * Environment variables (set in Netlify dashboard):
 *   RESEND_API_KEY  — Resend.com API key
 *   CONTACT_EMAIL   — destination email address
 *   ALLOWED_ORIGIN  — (optional) your deployed domain, e.g. https://yoursite.netlify.app
 */

import type { Handler } from "@netlify/functions";

// ─── Constants ─────────────────────────────────────────────────────────────────
const MAX_NAME_LEN = 100;
const MAX_EMAIL_LEN = 254;   // RFC 5321 max email length
const MAX_MESSAGE_LEN = 5000;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ─── Helpers ───────────────────────────────────────────────────────────────────

/** Strip all HTML tags and trim whitespace to prevent HTML injection in emails */
function sanitize(str: unknown): string {
    if (typeof str !== "string") return "";
    return str.replace(/<[^>]*>/g, "").trim();
}

/** Return only a generic error message to the client — never leak internals */
function safeError(statusCode: number, message: string) {
    return {
        statusCode,
        headers: securityHeaders(""),
        body: JSON.stringify({ error: message }),
    };
}

function securityHeaders(origin: string) {
    const allowed = process.env.ALLOWED_ORIGIN ?? origin;
    return {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": allowed || "same-origin",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "X-Content-Type-Options": "nosniff",
        "Referrer-Policy": "strict-origin-when-cross-origin",
    };
}

// ─── Handler ───────────────────────────────────────────────────────────────────
const handler: Handler = async (event) => {
    const origin = event.headers["origin"] ?? event.headers["referer"] ?? "";

    // Handle CORS preflight
    if (event.httpMethod === "OPTIONS") {
        return { statusCode: 204, headers: securityHeaders(origin), body: "" };
    }

    // Only allow POST
    if (event.httpMethod !== "POST") {
        return safeError(405, "Method not allowed");
    }

    // ── Parse body safely ──
    let raw: Record<string, unknown>;
    try {
        raw = JSON.parse(event.body ?? "{}");
    } catch {
        return safeError(400, "Invalid JSON body");
    }

    // ── Sanitize inputs ──
    const name = sanitize(raw.name);
    const email = sanitize(raw.email);
    const message = sanitize(raw.message);

    // ── Validate presence ──
    if (!name || !email || !message) {
        return safeError(400, "name, email, and message are required");
    }

    // ── Validate lengths ──
    if (name.length > MAX_NAME_LEN) return safeError(400, `Name must be under ${MAX_NAME_LEN} characters`);
    if (email.length > MAX_EMAIL_LEN) return safeError(400, `Email address is too long`);
    if (message.length > MAX_MESSAGE_LEN) return safeError(400, `Message must be under ${MAX_MESSAGE_LEN} characters`);

    // ── Validate email format ──
    if (!EMAIL_REGEX.test(email)) {
        return safeError(400, "Invalid email address");
    }

    // ── Environment checks ──
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? "dekshith.m1404@gmail.com";

    if (!RESEND_API_KEY) {
        console.error("[send-email] RESEND_API_KEY is not set");
        return safeError(500, "Server configuration error");
    }

    // ── Send email via Resend ──
    try {
        const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
                from: "Portfolio Contact <onboarding@resend.dev>",
                to: [CONTACT_EMAIL],
                subject: `Portfolio Contact: ${name}`,
                html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br/>")}</p>
        `,
                reply_to: email,
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            console.error("[send-email] Resend error:", res.status, data);
            return safeError(502, "Failed to send email. Please try again later.");
        }

        return {
            statusCode: 200,
            headers: securityHeaders(origin),
            body: JSON.stringify({ success: true }),
        };
    } catch (err) {
        console.error("[send-email] Unexpected error:", err);
        return safeError(500, "An unexpected error occurred. Please try again later.");
    }
};

export { handler };
