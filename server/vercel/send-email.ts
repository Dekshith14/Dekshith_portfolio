/**
 * Vercel Serverless Function: send-email
 * Path: server/vercel/send-email.ts
 *
 * Environment variables (set in Vercel dashboard):
 *   RESEND_API_KEY  — Resend.com API key
 *   CONTACT_EMAIL   — destination email address
 *   ALLOWED_ORIGIN  — (optional) your deployed domain, e.g. https://yoursite.vercel.app
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";

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

function applySecurityHeaders(res: VercelResponse, origin: string) {
    const allowed = process.env.ALLOWED_ORIGIN ?? origin;
    res.setHeader("Access-Control-Allow-Origin", allowed || "same-origin");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
}

// ─── Handler ───────────────────────────────────────────────────────────────────
export default async function handler(req: VercelRequest, res: VercelResponse) {
    const origin = (req.headers["origin"] ?? req.headers["referer"] ?? "") as string;
    applySecurityHeaders(res, origin);

    // Handle CORS preflight
    if (req.method === "OPTIONS") {
        return res.status(204).end();
    }

    // Only allow POST
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    // ── Sanitize inputs ──
    const body = req.body ?? {};
    const name = sanitize(body.name);
    const email = sanitize(body.email);
    const message = sanitize(body.message);

    // ── Validate presence ──
    if (!name || !email || !message) {
        return res.status(400).json({ error: "name, email, and message are required" });
    }

    // ── Validate lengths ──
    if (name.length > MAX_NAME_LEN)
        return res.status(400).json({ error: `Name must be under ${MAX_NAME_LEN} characters` });
    if (email.length > MAX_EMAIL_LEN)
        return res.status(400).json({ error: "Email address is too long" });
    if (message.length > MAX_MESSAGE_LEN)
        return res.status(400).json({ error: `Message must be under ${MAX_MESSAGE_LEN} characters` });

    // ── Validate email format ──
    if (!EMAIL_REGEX.test(email)) {
        return res.status(400).json({ error: "Invalid email address" });
    }

    // ── Environment checks ──
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? "dekshith.m1404@gmail.com";

    if (!RESEND_API_KEY) {
        console.error("[send-email] RESEND_API_KEY is not set");
        return res.status(500).json({ error: "Server configuration error" });
    }

    // ── Send email via Resend ──
    try {
        const response = await fetch("https://api.resend.com/emails", {
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

        const data = await response.json();

        if (!response.ok) {
            console.error("[send-email] Resend error:", response.status, data);
            return res.status(502).json({ error: "Failed to send email. Please try again later." });
        }

        return res.status(200).json({ success: true });
    } catch (err) {
        console.error("[send-email] Unexpected error:", err);
        return res.status(500).json({ error: "An unexpected error occurred. Please try again later." });
    }
}
