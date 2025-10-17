import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, lastname, email, message } = data;

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn('SMTP no configurado, imprimiendo en logs (modo desarrollo)');
      console.log({ name, lastname, email, message });
      return NextResponse.json({ ok: true, warning: 'SMTP no configurado, mensaje solo en logs' });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: email,
      to: process.env.SMTP_USER,
      subject: `Contacto desde portafolio: ${name} ${lastname}`,
      text: `Mensaje desde formulario:\n\n${message}\n\nContacto: ${email}`
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'error enviando' }, { status: 500 });
  }
}
