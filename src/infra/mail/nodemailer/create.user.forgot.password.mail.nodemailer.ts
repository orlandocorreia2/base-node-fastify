import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import { CreateUserForgotPasswordMailProps } from '../../../types/email';
import { MailInterface } from '../../../shared/email/mail.interface';
import { sendMail } from '.';

export class CreateUserForgotPasswordMailNodemailer implements MailInterface {
  async send({ name, email, link }: CreateUserForgotPasswordMailProps) {
    const fileTemplatePath = path.resolve(
      `${__dirname}/views/create.user.forgot.password.hbs`,
    );
    const templateFileContent = await fs.promises.readFile(fileTemplatePath, {
      encoding: 'utf-8',
    });
    const parseTemplate = handlebars.compile(templateFileContent);
    const html = parseTemplate({ name, link });
    sendMail({
      to: email,
      subject: 'Redefinir senha na plataforma Meu Leilão Online',
      html,
      text: `Você solicitou a redefinição de sua senha para acessar a
                  plataforma. Se você não solicitou a redefinição de senha, desconsidere
                  este email. Sua conta permanece segura. Acesse o link para criar uma nova senha: ${link}`,
    });
  }
}
