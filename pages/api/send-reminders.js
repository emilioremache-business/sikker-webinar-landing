import { Resend } from 'resend';
import { buildReminderEmail } from '../../lib/emails/reminder';

const WEBINAR_DATE = '2026-09-22';

function getTimeLabel(daysUntil) {
  if (daysUntil <= 0) return 'hoy';
  if (daysUntil === 1) return 'mañana';
  return `en ${daysUntil} días`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const NOTION_TOKEN = process.env.NOTION_TOKEN;
  const DATABASE_ID = process.env.NOTION_DATABASE_ID;
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const WEBINAR_TEAMS_LINK = process.env.WEBINAR_TEAMS_LINK;

  if (!NOTION_TOKEN || !DATABASE_ID || !RESEND_API_KEY) {
    return res.status(500).json({ error: 'Missing environment variables' });
  }

  try {
    const today = new Date().toISOString().split('T')[0];
    const daysUntil = Math.ceil(
      (new Date(WEBINAR_DATE) - new Date(today)) / (1000 * 60 * 60 * 24)
    );

    if (daysUntil < 0) {
      return res.status(200).json({ message: 'Webinar already passed', sent: 0 });
    }

    const shouldSend = daysUntil === 7 || daysUntil === 1 || daysUntil === 0;
    if (!shouldSend) {
      return res.status(200).json({ message: `${daysUntil} days until webinar, no reminder today`, sent: 0 });
    }

    const notionResponse = await fetch(
      `https://api.notion.com/v1/databases/${DATABASE_ID}/query`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${NOTION_TOKEN}`,
          'Content-Type': 'application/json',
          'Notion-Version': '2022-06-28',
        },
        body: JSON.stringify({
          filter: {
            property: 'Select',
            select: { equals: 'Registered' },
          },
        }),
      }
    );

    if (!notionResponse.ok) {
      const err = await notionResponse.json();
      console.error('Notion query error:', err);
      return res.status(500).json({ error: 'Failed to query registrants' });
    }

    const { results } = await notionResponse.json();
    const resend = new Resend(RESEND_API_KEY);
    const timeLabel = getTimeLabel(daysUntil);
    let sent = 0;

    for (const page of results) {
      const props = page.properties;
      const email = props['Email']?.email;
      const nombre = props['Nombre Completo']?.title?.[0]?.text?.content;

      if (!email || !nombre) continue;

      try {
        await resend.emails.send({
          from: 'Sikker Cybersecurity <webinar@sikker.com>',
          to: email,
          subject: `Recordatorio: Webinar "${timeLabel}" - Del Dato al Dinero`,
          html: buildReminderEmail({ nombre, teamsLink: WEBINAR_TEAMS_LINK, timeLabel }),
        });
        sent++;
      } catch (emailErr) {
        console.error(`Failed to send reminder to ${email}:`, emailErr);
      }
    }

    return res.status(200).json({ message: `Reminders sent`, sent, total: results.length });
  } catch (error) {
    console.error('Error in send-reminders:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
