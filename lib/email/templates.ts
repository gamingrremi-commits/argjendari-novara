import type { BookingType } from '@/lib/validations/contact';
import { BOOKING_TYPE_LABELS } from '@/lib/validations/contact';

interface EmailDataProps {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  type: BookingType;
  message?: string;
  preferred_date?: string;
  product_slug?: string;
}

/**
 * Email për administratorin (kur dikush mbush formën)
 */
export function adminNotificationHtml(data: EmailDataProps): string {
  const typeLabel = BOOKING_TYPE_LABELS.sq[data.type];
  const productInfo = data.product_slug
    ? `<tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #EDE7D9; color: #9B7F3F; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;">Produkti</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #EDE7D9; color: #0A0A0A; font-family: 'Cormorant Garamond', serif; font-size: 16px; text-align: right;">${data.product_slug}</td>
      </tr>`
    : '';
  const dateInfo = data.preferred_date
    ? `<tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #EDE7D9; color: #9B7F3F; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;">Data e preferuar</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #EDE7D9; color: #0A0A0A; font-family: 'Cormorant Garamond', serif; font-size: 16px; text-align: right;">${data.preferred_date}</td>
      </tr>`
    : '';
  const messageInfo = data.message
    ? `<tr>
        <td colspan="2" style="padding: 24px 0 0; color: #9B7F3F; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;">Mesazhi</td>
      </tr>
      <tr>
        <td colspan="2" style="padding: 8px 0 0; color: #2A2520; font-family: 'Cormorant Garamond', serif; font-size: 16px; font-style: italic; line-height: 1.6;">${data.message.replace(/\n/g, '<br>')}</td>
      </tr>`
    : '';

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
body { margin: 0; padding: 0; background: #F8F6F0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
</style>
</head>
<body style="background: #F8F6F0; padding: 40px 20px;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background: #FFFFFF;">
    <tr>
      <td style="background: #0A0A0A; padding: 48px 40px; text-align: center;">
        <div style="font-family: Georgia, serif; font-size: 28px; letter-spacing: 0.4em; color: #F8F6F0;">NOVARA</div>
        <div style="height: 1px; width: 60px; background: #C9A961; margin: 16px auto;"></div>
        <div style="color: #C9A961; font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase;">Mesazh i ri nga website</div>
      </td>
    </tr>
    <tr>
      <td style="padding: 40px;">
        <h1 style="font-family: Georgia, serif; font-size: 28px; color: #0A0A0A; margin: 0 0 8px; font-weight: normal;">${data.first_name} ${data.last_name}</h1>
        <p style="color: #9B7F3F; font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; margin: 0 0 32px;">${typeLabel}</p>

        <table cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #EDE7D9; color: #9B7F3F; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;">Email</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #EDE7D9; color: #0A0A0A; font-family: 'Cormorant Garamond', serif; font-size: 16px; text-align: right;">
              <a href="mailto:${data.email}" style="color: #0A0A0A; text-decoration: none;">${data.email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #EDE7D9; color: #9B7F3F; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;">Telefon</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #EDE7D9; color: #0A0A0A; font-family: 'Cormorant Garamond', serif; font-size: 16px; text-align: right;">
              <a href="tel:${data.phone.replace(/\s/g, '')}" style="color: #0A0A0A; text-decoration: none;">${data.phone}</a>
            </td>
          </tr>
          ${productInfo}
          ${dateInfo}
          ${messageInfo}
        </table>

        <div style="margin-top: 40px; padding: 24px; background: #F8F6F0; border-left: 3px solid #C9A961;">
          <p style="margin: 0; color: #2A2520; font-family: Georgia, serif; font-style: italic; font-size: 15px; line-height: 1.6;">
            Përgjigjuni brenda 24 orëve. Klienti pret kontakt nga ju.
          </p>
        </div>

        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top: 32px;">
          <tr>
            <td style="text-align: center;">
              <a href="https://wa.me/${data.phone.replace(/[^\d]/g, '')}" style="display: inline-block; background: #25D366; color: white; padding: 14px 28px; text-decoration: none; font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase;">Përgjigjju në WhatsApp</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="background: #0A0A0A; padding: 24px; text-align: center; color: #EDE7D9; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;">
        Argjendari Novara · Sheshi Demokracia, Durrës
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Email i konfirmimit për klientin (auto-reply)
 */
export function clientConfirmationHtml(data: { first_name: string; type: BookingType }): string {
  const typeLabel = BOOKING_TYPE_LABELS.sq[data.type];

  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="background: #F8F6F0; padding: 40px 20px; margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background: #FFFFFF;">
    <tr>
      <td style="background: #0A0A0A; padding: 56px 40px; text-align: center;">
        <div style="font-family: Georgia, serif; font-size: 32px; letter-spacing: 0.4em; color: #F8F6F0;">NOVARA</div>
        <div style="height: 1px; width: 60px; background: #C9A961; margin: 20px auto;"></div>
        <div style="color: #C9A961; font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase;">Argjendari & Bizhuteri · Durrës</div>
      </td>
    </tr>
    <tr>
      <td style="padding: 56px 40px;">
        <h1 style="font-family: Georgia, serif; font-size: 32px; color: #0A0A0A; margin: 0 0 24px; font-weight: normal; line-height: 1.2;">
          E mora mesazhin tuaj, <em style="color: #9B7F3F;">${data.first_name}</em>.
        </h1>

        <p style="color: #2A2520; font-family: Georgia, serif; font-size: 18px; font-style: italic; line-height: 1.6; margin: 0 0 24px;">
          Faleminderit që na kontaktuat për <strong style="font-style: normal; color: #0A0A0A;">${typeLabel.toLowerCase()}</strong>. Mesazhi juaj erdhi në duart tona të mira.
        </p>

        <p style="color: #2A2520; font-family: Georgia, serif; font-size: 18px; line-height: 1.6; margin: 0 0 32px;">
          Do t'ju kontaktoj personalisht brenda 24 orëve — zakonisht më shpejt. Nëse keni nevojë urgjente, mund të më shkruani direkt në WhatsApp.
        </p>

        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 32px 0;">
          <tr>
            <td style="text-align: center;">
              <a href="https://wa.me/355677193759" style="display: inline-block; background: #0A0A0A; color: #F8F6F0; padding: 16px 32px; text-decoration: none; font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase;">Më gjeni në WhatsApp</a>
            </td>
          </tr>
        </table>

        <div style="margin-top: 48px; padding-top: 32px; border-top: 1px solid #EDE7D9;">
          <p style="color: #9B7F3F; font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; margin: 0 0 16px;">Vizitoni dyqanin</p>
          <p style="color: #2A2520; font-family: Georgia, serif; font-size: 16px; line-height: 1.7; margin: 0;">
            Sheshi Demokracia, përballë Lulishtes 1 Maji<br>
            Durrës, Shqipëri<br>
            <span style="color: #9B7F3F;">E hënë – E shtunë: 09:00 – 20:00 · E diel: 10:00 – 18:00</span>
          </p>
        </div>
      </td>
    </tr>
    <tr>
      <td style="background: #0A0A0A; padding: 32px; text-align: center;">
        <p style="color: #EDE7D9; font-family: Georgia, serif; font-style: italic; font-size: 14px; margin: 0 0 8px;">
          Bizhuteri me dorë, me histori. Që nga 2014.
        </p>
        <p style="color: #C9A961; font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; margin: 0;">
          Argjendari Novara
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
