import { Resend } from 'resend';
import { env } from '../../../utils/env';
import { SendMailProps } from '../../../types/email';
import { isEnvironmentProduction } from '../../../utils/helper';

export const sendMail = async ({ to, subject, html }: SendMailProps) => {
  const resend = new Resend(env({ key: 'MAIL_KEY' }));
  const sendTo = isEnvironmentProduction
    ? [to]
    : env({ key: 'MAIL_FROM_DEVS' }).split(',');
  resend.emails
    .send({
      from: env({ key: 'MAIL_FROM' }),
      to: sendTo,
      subject,
      html,
    })
    .then(response => {
      console.warn(
        'Email enviado com sucesso com o provedor: Resend',
        response,
      );
    })
    .catch(error => console.error('Erro ao enviar o email', error));
};
