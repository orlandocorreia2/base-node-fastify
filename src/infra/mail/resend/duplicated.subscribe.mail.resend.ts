import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import { DuplicatedSubscribeMailProps } from '../../../types/email';
import { MailInterface } from '../../../shared/email/mail.interface';
import { sendMail } from '.';
import { isEnvironmentProduction } from '../../../utils/helper';
import { env } from '../../../utils/env';

export class DuplicatedSubscribeMailResend implements MailInterface {
  async send({ name, email, link }: DuplicatedSubscribeMailProps) {
    if (env({ key: 'MAIL_FROM_DEVS' })) return;
    const fileTemplatePath = path.resolve(
      `${__dirname}/views/duplicated.subscribe.hbs`,
    );
    const templateFileContent = await fs.promises.readFile(fileTemplatePath, {
      encoding: 'utf-8',
    });
    const parseTemplate = handlebars.compile(templateFileContent);
    const html = parseTemplate({ name, email, link });

    const to = isEnvironmentProduction
      ? env({ key: 'MAIL_FROM_OWNER' })
      : env({ key: 'MAIL_FROM_DEVS' });
    console.log('Sending duplicated subscribe mail to:', {
      to,
      owner: env({ key: 'MAIL_FROM_OWNER' }),
      devs: env({ key: 'MAIL_FROM_DEVS' }),
    });
    sendMail({
      to,
      subject: 'COMPRA DUPLICADA na Kiwify',
      html,
      text: `Foi identificada uma COMPRA DUPLICADA para o usuário: ${name} e email: ${email} na kiwify!`,
    });
  }
}
