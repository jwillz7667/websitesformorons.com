import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend client
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Rate limiting store
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 3;
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

function getRateLimitInfo(ip: string) {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: RATE_LIMIT - 1 };
  }

  if (entry.count >= RATE_LIMIT) {
    return { allowed: false, remaining: 0 };
  }

  entry.count++;
  return { allowed: true, remaining: RATE_LIMIT - entry.count };
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

interface SubscribeFormData {
  email: string;
  source?: string; // 'cta' | 'newsletter' | etc.
  honeypot?: string;
}

// Email template for lead notification
function getLeadNotificationHtml(email: string, source: string, submittedAt: string) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #0a0a0a;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto; background: linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(249, 115, 22, 0.1) 100%); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px;">
          <tr>
            <td style="padding: 32px;">
              <h1 style="margin: 0 0 16px; font-size: 24px; font-weight: 700; color: #ffffff;">
                New Lead: Free Audit Request
              </h1>
              <p style="margin: 0 0 8px; font-size: 14px; color: rgba(255,255,255,0.5);">
                ${submittedAt}
              </p>
              <div style="margin-top: 24px; padding: 16px; background: rgba(255,255,255,0.05); border-radius: 8px;">
                <p style="margin: 0 0 4px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #06b6d4;">Email</p>
                <p style="margin: 0; font-size: 16px;">
                  <a href="mailto:${email}" style="color: #ffffff; text-decoration: none;">${email}</a>
                </p>
              </div>
              <div style="margin-top: 16px; padding: 16px; background: rgba(255,255,255,0.05); border-radius: 8px;">
                <p style="margin: 0 0 4px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #06b6d4;">Source</p>
                <p style="margin: 0; font-size: 16px; color: #ffffff;">${source}</p>
              </div>
              <a href="mailto:${email}?subject=Your Free Website Audit from WebsitesForMorons" style="display: inline-block; margin-top: 24px; padding: 12px 24px; background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: #000000; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 8px;">
                Send Audit to ${email}
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

// Auto-reply for free audit request
function getAuditAutoReplyHtml() {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #0a0a0a;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto; background: linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(249, 115, 22, 0.1) 100%); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px;">
          <tr>
            <td style="padding: 32px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1);">
              <h1 style="margin: 0; font-size: 28px; font-weight: 700;">
                <span style="background: linear-gradient(135deg, #06b6d4 0%, #f97316 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                  WebsitesForMorons
                </span>
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px;">
              <h2 style="margin: 0 0 16px; font-size: 24px; color: #ffffff;">
                Your Free Website Audit is On the Way!
              </h2>
              <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6; color: rgba(255,255,255,0.7);">
                Thanks for requesting a free website audit! Our team will analyze your site and send you a personalized report within the next 24 hours.
              </p>
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: rgba(255,255,255,0.7);">
                Your audit will include:
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="padding: 12px 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="width: 32px; vertical-align: top;">
                          <span style="color: #06b6d4; font-size: 18px;">&#10003;</span>
                        </td>
                        <td style="color: rgba(255,255,255,0.7); font-size: 15px;">
                          Performance analysis and loading speed insights
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="width: 32px; vertical-align: top;">
                          <span style="color: #06b6d4; font-size: 18px;">&#10003;</span>
                        </td>
                        <td style="color: rgba(255,255,255,0.7); font-size: 15px;">
                          SEO opportunities and keyword recommendations
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="width: 32px; vertical-align: top;">
                          <span style="color: #06b6d4; font-size: 18px;">&#10003;</span>
                        </td>
                        <td style="color: rgba(255,255,255,0.7); font-size: 15px;">
                          Mobile responsiveness check
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="width: 32px; vertical-align: top;">
                          <span style="color: #06b6d4; font-size: 18px;">&#10003;</span>
                        </td>
                        <td style="color: rgba(255,255,255,0.7); font-size: 15px;">
                          User experience and conversion suggestions
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <p style="margin: 24px 0 0; font-size: 14px; color: rgba(255,255,255,0.5);">
                In the meantime, feel free to reply to this email if you have any questions!
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 32px; border-top: 1px solid rgba(255,255,255,0.1); text-align: center;">
              <p style="margin: 0; font-size: 14px; color: rgba(255,255,255,0.4);">
                &copy; ${new Date().getFullYear()} WebsitesForMorons. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
               request.headers.get('x-real-ip') ||
               'unknown';

    const rateLimitInfo = getRateLimitInfo(ip);
    if (!rateLimitInfo.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body: SubscribeFormData = await request.json();

    // Honeypot check
    if (body.honeypot) {
      return NextResponse.json({ success: true, message: 'Subscribed!' });
    }

    if (!body.email) {
      return NextResponse.json(
        { error: 'Please enter your email address.' },
        { status: 400 }
      );
    }

    if (!isValidEmail(body.email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const email = body.email.toLowerCase().trim();
    const source = body.source || 'website';
    const submittedAt = new Date().toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    });

    if (resend) {
      const contactEmail = process.env.CONTACT_EMAIL || 'hello@websitesformorons.com';
      const fromEmail = process.env.FROM_EMAIL || 'contact@websitesformorons.com';

      // Notify business
      await resend.emails.send({
        from: `WebsitesForMorons <${fromEmail}>`,
        to: contactEmail,
        replyTo: email,
        subject: `New Lead: ${email} requested free audit`,
        html: getLeadNotificationHtml(email, source, submittedAt),
      });

      // Auto-reply to user
      await resend.emails.send({
        from: `WebsitesForMorons <${fromEmail}>`,
        to: email,
        replyTo: contactEmail,
        subject: 'Your Free Website Audit is Coming!',
        html: getAuditAutoReplyHtml(),
      });
    } else {
      console.log('Subscribe form submission (Resend not configured):', { email, source, submittedAt });
    }

    return NextResponse.json({
      success: true,
      message: "You're in! Check your inbox for your free audit.",
    });
  } catch (error) {
    console.error('Subscribe form error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
