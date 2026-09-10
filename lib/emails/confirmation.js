export function buildConfirmationEmail({ nombre, teamsLink }) {
  const link = teamsLink || '#';
  const firstName = nombre.split(' ')[0];

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#0B1210;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0B1210;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#101916;border:1px solid #4BAEB2;border-radius:12px;overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="background-color:#000000;padding:24px 32px;border-bottom:2px solid #4BAEB2;">
              <span style="font-size:22px;font-weight:bold;color:#FFFFFF;letter-spacing:2px;">SIKKER</span>
              <span style="font-size:11px;color:#4BAEB2;letter-spacing:1px;margin-left:10px;">CYBERSECURITY COMPANY</span>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:40px 32px;">
              <h1 style="color:#FFFFFF;font-size:24px;margin:0 0 8px 0;">¡Registro Confirmado!</h1>
              <p style="color:#9FB3AA;font-size:15px;margin:0 0 24px 0;">Hola ${firstName}, tu lugar está asegurado.</p>

              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0B1210;border:1px solid rgba(75,174,178,0.3);border-radius:8px;margin-bottom:24px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="color:#4BAEB2;font-size:12px;letter-spacing:3px;margin:0 0 12px 0;font-weight:600;">DETALLES DEL WEBINAR</p>
                    <p style="color:#FFFFFF;font-size:18px;font-weight:bold;margin:0 0 4px 0;">Del Dato al Dinero</p>
                    <p style="color:#9FB3AA;font-size:14px;margin:0 0 16px 0;">La economía clandestina detrás del fraude financiero</p>
                    <p style="color:#EAF2ED;font-size:14px;margin:0;">📅 Martes 22 de Septiembre, 2026</p>
                    <p style="color:#EAF2ED;font-size:14px;margin:4px 0 0 0;">🕐 10H00 (hora Ecuador)</p>
                    <p style="color:#EAF2ED;font-size:14px;margin:4px 0 0 0;">💻 Virtual - Microsoft Teams</p>
                  </td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding:8px 0 24px 0;">
                    <a href="${link}" style="display:inline-block;background-color:#4BAEB2;color:#000000;font-size:16px;font-weight:bold;text-decoration:none;padding:14px 32px;border-radius:8px;letter-spacing:0.5px;">
                      UNIRME AL WEBINAR →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="color:#64796F;font-size:13px;margin:0;line-height:1.5;">
                Guarda este email. Te enviaremos un recordatorio antes del evento.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color:#000000;padding:20px 32px;border-top:1px solid rgba(75,174,178,0.3);text-align:center;">
              <p style="color:#4BAEB2;font-size:12px;margin:0;letter-spacing:1px;">Juntos hacemos un mundo más seguro</p>
              <p style="color:#64796F;font-size:11px;margin:8px 0 0 0;">© 2026 Sikker Cybersecurity Company</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
