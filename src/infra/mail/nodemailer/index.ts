import nodemailer from 'nodemailer';
import { env } from '../../../utils/env';
import { SendMailProps } from '../../../types/email';
import { isEnvironmentProduction } from '../../../utils/helper';
import path from 'path';

export const transport = nodemailer.createTransport({
  host: 'smtp.kinghost.net',
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: 'no-reply@meuleilaoonline.com',
    pass: 'J@rvi2025',
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendMail = ({ to, subject, html, text }: SendMailProps) => {
  const sendTo = isEnvironmentProduction ? to : env({ key: 'MAIL_FROM_DEVS' });
  transport
    .sendMail({
      from: env({ key: 'MAIL_FROM' }),
      to: sendTo,
      subject,
      html,
      text,
      attachments: [
        {
          filename: 'logo.png',
          path: path.resolve(`${__dirname}/views/logo.png`),
          contentDisposition: 'inline',
          cid: 'logo.png',
          contentType: 'image/png',
        },
      ],
    })
    .then(response => {
      console.log('Email enviado com sucesso!', response);
    })
    .catch(error => console.log('Erro ao enviar o email', error));
};
