import nodemailer from 'nodemailer';
import { env } from '../../../utils/env';
import { SendMailProps } from '../../../types/email';
import { isEnvironmentProduction } from '../../../utils/helper';
import path from 'path';

const isKinghost = env({ key: 'MAIL_HOST' }) === 'smtp.kinghost.net';

export const transport = isKinghost
  ? nodemailer.createTransport({
      host: 'smtp.kinghost.net',
      port: 465,
      secure: true, // true for port 465, false for other ports
      auth: {
        user: 'no-reply@meuleilaoonline.com',
        pass: 'J@rvi2025',
      },
      tls: {
        rejectUnauthorized: false,
      },
    })
  : nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'meuleilaoonlineoficial@gmail.com',
        pass: 'clof symp sinu hbjd',
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
      console.warn(
        `Email enviado com sucesso com o provedor: ${isKinghost ? 'Kinghost' : 'Google'}`,
        response,
      );
    })
    .catch(error => console.error('Erro ao enviar o email', error));
};
