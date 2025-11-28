import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend client
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Rate limiting store (in production, use Redis or Vercel KV)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5;
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

// Simple email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Sanitize input to prevent XSS
function sanitize(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  website?: string;
  service?: string;
  budget?: string;
  message: string;
  honeypot?: string;
}

// Email template for contact form
function getContactEmailHtml(data: {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  website?: string;
  service?: string;
  budget?: string;
  message: string;
  submittedAt: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #0a0a0a;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto; background: linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(249, 115, 22, 0.1) 100%); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px;">
          <!-- Header -->
          <tr>
            <td style="padding: 32px 32px 24px; border-bottom: 1px solid rgba(255,255,255,0.1);">
              <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #ffffff;">
                New Contact Form Submission
              </h1>
              <p style="margin: 8px 0 0; font-size: 14px; color: rgba(255,255,255,0.5);">
                ${data.submittedAt}
              </p>
            </td>
          </tr>

          <!-- Contact Details -->
          <tr>
            <td style="padding: 24px 32px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <p style="margin: 0 0 4px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #06b6d4;">Name</p>
                    <p style="margin: 0; font-size: 16px; color: #ffffff;">${data.name}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <p style="margin: 0 0 4px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #06b6d4;">Email</p>
                    <p style="margin: 0; font-size: 16px;">
                      <a href="mailto:${data.email}" style="color: #ffffff; text-decoration: none;">${data.email}</a>
                    </p>
                  </td>
                </tr>
                ${data.company ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <p style="margin: 0 0 4px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #06b6d4;">Company</p>
                    <p style="margin: 0; font-size: 16px; color: #ffffff;">${data.company}</p>
                  </td>
                </tr>
                ` : ''}
                ${data.phone ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <p style="margin: 0 0 4px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #06b6d4;">Phone</p>
                    <p style="margin: 0; font-size: 16px;">
                      <a href="tel:${data.phone}" style="color: #ffffff; text-decoration: none;">${data.phone}</a>
                    </p>
                  </td>
                </tr>
                ` : ''}
                ${data.website ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <p style="margin: 0 0 4px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #06b6d4;">Current Website</p>
                    <p style="margin: 0; font-size: 16px;">
                      <a href="${data.website}" style="color: #06b6d4; text-decoration: none;">${data.website}</a>
                    </p>
                  </td>
                </tr>
                ` : ''}
                ${data.service ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <p style="margin: 0 0 4px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #06b6d4;">Service Interested In</p>
                    <p style="margin: 0; font-size: 16px; color: #ffffff;">${data.service}</p>
                  </td>
                </tr>
                ` : ''}
                ${data.budget ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <p style="margin: 0 0 4px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #06b6d4;">Budget Range</p>
                    <p style="margin: 0; font-size: 16px; color: #ffffff;">${data.budget}</p>
                  </td>
                </tr>
                ` : ''}
              </table>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding: 0 32px 32px;">
              <p style="margin: 0 0 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #06b6d4;">Message</p>
              <div style="padding: 16px; background: rgba(255,255,255,0.05); border-radius: 8px;">
                <p style="margin: 0; font-size: 15px; line-height: 1.6; color: rgba(255,255,255,0.9); white-space: pre-wrap;">${data.message}</p>
              </div>
            </td>
          </tr>

          <!-- Reply Button -->
          <tr>
            <td style="padding: 0 32px 32px;">
              <a href="mailto:${data.email}?subject=Re: Your inquiry to WebsitesForMorons" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: #000000; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 8px;">
                Reply to ${data.name}
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

// Email template for auto-reply to user
function getAutoReplyHtml(name: string) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thanks for reaching out!</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #0a0a0a;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto; background: linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(249, 115, 22, 0.1) 100%); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px;">
          <!-- Header -->
          <tr>
            <td style="padding: 32px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1);">
              <h1 style="margin: 0; font-size: 28px; font-weight: 700;">
                <span style="background: linear-gradient(135deg, #06b6d4 0%, #f97316 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                  WebsitesForMorons
                </span>
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 32px;">
              <h2 style="margin: 0 0 16px; font-size: 24px; color: #ffffff;">
                Thanks for reaching out, ${name}!
              </h2>
              <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6; color: rgba(255,255,255,0.7);">
                We've received your message and we're excited to learn more about your project. Our team will review your inquiry and get back to you within 24 hours (usually much sooner!).
              </p>
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: rgba(255,255,255,0.7);">
                In the meantime, here's what you can expect:
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
                          A personalized response from our team
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
                          Free consultation to discuss your needs
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
                          No-obligation quote tailored to your project
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; border-top: 1px solid rgba(255,255,255,0.1); text-align: center;">
              <p style="margin: 0 0 8px; font-size: 14px; color: rgba(255,255,255,0.5);">
                Have an urgent question? Reply directly to this email.
              </p>
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
    // Get IP for rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
               request.headers.get('x-real-ip') ||
               'unknown';

    // Check rate limit
    const rateLimitInfo = getRateLimitInfo(ip);
    if (!rateLimitInfo.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': String(RATE_LIMIT),
            'X-RateLimit-Remaining': '0',
            'Retry-After': '60',
          }
        }
      );
    }

    // Parse body
    const body: ContactFormData = await request.json();

    // Honeypot check (spam prevention)
    if (body.honeypot) {
      // Silently accept but don't process (bot detected)
      return NextResponse.json({ success: true, message: 'Message sent successfully!' });
    }

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Please fill in all required fields.' },
        { status: 400 }
      );
    }

    // Validate email
    if (!isValidEmail(body.email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // Validate message length
    if (body.message.length < 10) {
      return NextResponse.json(
        { error: 'Message is too short. Please provide more details.' },
        { status: 400 }
      );
    }

    if (body.message.length > 5000) {
      return NextResponse.json(
        { error: 'Message is too long. Please keep it under 5000 characters.' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitize(body.name),
      email: body.email.toLowerCase().trim(),
      company: body.company ? sanitize(body.company) : undefined,
      phone: body.phone ? sanitize(body.phone) : undefined,
      website: body.website ? sanitize(body.website) : undefined,
      service: body.service ? sanitize(body.service) : undefined,
      budget: body.budget ? sanitize(body.budget) : undefined,
      message: sanitize(body.message),
      submittedAt: new Date().toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short',
      }),
    };

    // Send email if Resend is configured
    if (resend) {
      const contactEmail = process.env.CONTACT_EMAIL || 'hello@websitesformorons.com';
      const fromEmail = process.env.FROM_EMAIL || 'contact@websitesformorons.com';

      // Send notification email to business
      await resend.emails.send({
        from: `WebsitesForMorons <${fromEmail}>`,
        to: contactEmail,
        replyTo: sanitizedData.email,
        subject: `New Contact: ${sanitizedData.name}${sanitizedData.company ? ` from ${sanitizedData.company}` : ''}`,
        html: getContactEmailHtml(sanitizedData),
      });

      // Send auto-reply to user
      await resend.emails.send({
        from: `WebsitesForMorons <${fromEmail}>`,
        to: sanitizedData.email,
        replyTo: contactEmail,
        subject: "Thanks for reaching out! We'll be in touch soon.",
        html: getAutoReplyHtml(sanitizedData.name),
      });
    } else {
      // Log submission when Resend is not configured (development)
      console.log('Contact form submission (Resend not configured):', sanitizedData);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your message! We'll get back to you within 24 hours."
      },
      {
        headers: {
          'X-RateLimit-Limit': String(RATE_LIMIT),
          'X-RateLimit-Remaining': String(rateLimitInfo.remaining),
        }
      }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}

// Handle preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
