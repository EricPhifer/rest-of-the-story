import { Client } from 'postmark'

const client = new Client(process.env.POSTMARK_API_TOKEN)

const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX = 5

const rateLimitMap = new Map() // In-memory for demo; use Redis for production

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const ip = event.headers['x-forwarded-for'] || 'unknown'

  // Rate limiting
  const now = Date.now()
  const userRequests = rateLimitMap.get(ip) || []
  const recentRequests = userRequests.filter(ts => now - ts < RATE_LIMIT_WINDOW)

  if (recentRequests.length >= RATE_LIMIT_MAX) {
    return {
      statusCode: 429,
      body: 'Too many submissions. Please try again later.',
    }
  }
  recentRequests.push(now)
  rateLimitMap.set(ip, recentRequests)

  try {
    const data = JSON.parse(event.body)

    // Honeypot field check
    if (data.website) {
      return { statusCode: 403, body: 'Bot detected.' }
    }

    delete data.website // Remove honeypot field

    // Build email body
    const messageHtml = Object.entries(data)
      .map(([key, val]) => `<p><strong>${key}:</strong> ${val}</p>`)
      .join('\n')

    await client.sendEmail({
      From: 'info@therestofthestory.store',
      // To: 'eric@ericphiferllc.com', // For testing
      To: 'info@therestofthestory.store',
      Subject: 'New Form Submission',
      HtmlBody: messageHtml,
      TextBody: Object.entries(data)
        .map(([key, val]) => `${key}: ${val}`)
        .join('\n'),
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    }
  }
}
