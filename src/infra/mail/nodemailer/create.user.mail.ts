import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import { CreateUserMailProps } from '../../../types/email';
import { MailInterface } from '../../../shared/email/mail.interface';
import { sendMail } from '.';

export class CreateUserMail implements MailInterface {
  async send({ name, email, link }: CreateUserMailProps) {
    const fileTemplatePath = path.resolve(`${__dirname}/views/create.user.hbs`);
    const templateFileContent = await fs.promises.readFile(fileTemplatePath, {
      encoding: 'utf-8',
    });
    const parseTemplate = handlebars.compile(templateFileContent);
    const html = parseTemplate({ name, link });
    sendMail({
      to: email,
      subject: 'Usuário criado na plataforma Meu Leilão Online',
      html,
      text: `Parabéns ${name}, seu cadastro foi criado com sucesso utilizando o email: ${email}. Acesse o link para criar uma nova senha: ${link}`,
    });
  }
}
