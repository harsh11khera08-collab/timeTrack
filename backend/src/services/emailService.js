import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.office365.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail(to, subject, body) {
  if (!process.env.SMTP_USER) {
    console.warn('[Email] SMTP not configured, skipping email to', to);
    return false;
  }
  try {
    await transporter.sendMail({
      from: `TimeTrack <${process.env.SMTP_USER}>`,
      to,
      subject,
      html: `<div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:24px">
        <h2 style="color:#0F172A">⏱️ TimeTrack</h2>
        <div style="background:#F8FAFC;border-radius:8px;padding:16px;margin:16px 0">
          ${body.replace(/\n/g, '<br>')}
        </div>
        <a href="${process.env.FRONTEND_URL}" style="background:#3B82F6;color:white;padding:10px 20px;border-radius:6px;text-decoration:none;display:inline-block;margin-top:8px">
          Open TimeTrack →
        </a>
        <p style="color:#94A3B8;font-size:12px;margin-top:24px">
          You're receiving this because you're part of the TimeTrack system. <a href="#">Manage preferences</a>
        </p>
      </div>`,
    });
    return true;
  } catch (err) {
    console.error('[Email] Send failed:', err.message);
    return false;
  }
}
