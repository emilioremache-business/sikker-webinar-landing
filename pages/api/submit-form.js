import { Resend } from 'resend';
import { buildConfirmationEmail } from '../../lib/emails/confirmation';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { nombre, email, empresa, cargo, sector, mfa } = req.body;

    if (!nombre || !email || !empresa || !cargo || !sector || !mfa) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Email inválido' });
    }

    const NOTION_TOKEN = process.env.NOTION_TOKEN;
    const DATABASE_ID = process.env.NOTION_DATABASE_ID;
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const WEBINAR_TEAMS_LINK = process.env.WEBINAR_TEAMS_LINK;

    if (!NOTION_TOKEN || !DATABASE_ID) {
      console.error('Variables de entorno faltantes:', {
        hasNotionToken: !!NOTION_TOKEN,
        hasDatabaseId: !!DATABASE_ID,
      });
      return res.status(500).json({ error: 'Error de configuración del servidor' });
    }

    const notionResponse = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_TOKEN}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify({
        parent: { database_id: DATABASE_ID },
        properties: {
          'Nombre Completo': {
            title: [{ text: { content: nombre } }],
          },
          'Email': { email: email },
          'Empresa': {
            rich_text: [{ text: { content: empresa } }],
          },
          'Cargo': {
            rich_text: [{ text: { content: cargo } }],
          },
          'Sector': { select: { name: sector } },
          '¿Usa MFA?': { select: { name: mfa } },
          'Fecha de Registro': {
            date: { start: new Date().toISOString().split('T')[0] },
          },
          'Estado': { select: { name: 'Registered' } },
        },
      }),
    });

    if (!notionResponse.ok) {
      const errorData = await notionResponse.json();
      console.error('Error de Notion:', errorData);
      return res.status(500).json({ error: 'Error al guardar en la base de datos' });
    }

    if (RESEND_API_KEY) {
      try {
        const resend = new Resend(RESEND_API_KEY);
        await resend.emails.send({
          from: 'Sikker Cybersecurity <webinar@sikker.com>',
          to: email,
          subject: 'Confirmación de Registro - Webinar "Del Dato al Dinero"',
          html: buildConfirmationEmail({ nombre, teamsLink: WEBINAR_TEAMS_LINK }),
        });
      } catch (emailError) {
        console.error('Error enviando email de confirmación:', emailError);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Registro exitoso',
    });
  } catch (error) {
    console.error('Error en submit-form:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
